
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { CertificationScheme } from '../types';

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    scheme: '',
  });
  const [schemes, setSchemes] = useState<CertificationScheme[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchemes = async () => {
      const { data, error } = await supabase.from('schemes').select('id, title');
      if (error) {
        console.error('Error fetching schemes for form', error);
      } else {
        setSchemes(data || []);
      }
    };
    fetchSchemes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.studentId || !formData.email || !formData.scheme) {
      setError('Mohon lengkapi semua field yang wajib diisi.');
      return;
    }
    setError('');
    setLoading(true);

    const { error: insertError } = await supabase
      .from('registrations')
      .insert([
        { 
          fullname: formData.fullName, 
          studentid: formData.studentId, 
          email: formData.email, 
          phone: formData.phone,
          schemeid: formData.scheme
        }
      ]);

    setLoading(false);

    if (insertError) {
      setError(`Gagal mengirim pendaftaran: ${insertError.message}`);
    } else {
      setIsSubmitted(true);
    }
  };

  const selectedSchemeTitle = schemes.find(s => s.id === formData.scheme)?.title || '';

  if (isSubmitted) {
    return (
      <div className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-md mx-auto bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg">
             <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h1 className="text-2xl font-bold text-gray-900">Pendaftaran Berhasil!</h1>
            <p className="mt-4 text-gray-600">
              Terima kasih, {formData.fullName}. Data pendaftaran Anda untuk skema <strong>{selectedSchemeTitle}</strong> telah kami simpan.
            </p>
             <p className="mt-2 text-gray-600">
              Informasi selanjutnya akan kami kirimkan ke email {formData.email}.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ fullName: '', studentId: '', email: '', phone: '', scheme: '' });
              }}
              className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Daftar Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Formulir Pendaftaran</h1>
            <p className="mt-4 text-xl text-gray-500">
              Lengkapi data di bawah ini untuk mendaftar uji sertifikasi kompetensi.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-12 bg-white p-8 shadow-lg rounded-xl">
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <div className="mt-1">
                  <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">NIS / NISN</label>
                <div className="mt-1">
                  <input type="text" name="studentId" id="studentId" value={formData.studentId} onChange={handleChange} required className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" required className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                <div className="mt-1">
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="scheme" className="block text-sm font-medium text-gray-700">Pilih Skema Sertifikasi</label>
                <div className="mt-1">
                  <select id="scheme" name="scheme" value={formData.scheme} onChange={handleChange} required className="py-3 px-4 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md">
                    <option value="" disabled>-- Pilih Skema --</option>
                    {schemes.map(scheme => (
                      <option key={scheme.id} value={scheme.id}>{scheme.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
                {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;