import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { schemesData } from '../constants';
import type { Language } from '../App';
import { translations } from '../translations';

// ... (addressData and AccordionItem components remain the same) ...
const addressData = {
  "JAWA TIMUR": { "KOTA SURABAYA": { "Wonokromo": ["Darmo", "Jagir", "Ngagel", "Sawunggaling", "Wonokromo"], "Gubeng": ["Airlangga", "Gubeng", "Kertajaya", "Mojo", "Pucangsewu"], "Tandes": ["Balongsari", "Banjar Sugihan", "Karang Poh", "Manukan Kulon", "Manukan Wetan", "Tandes"] }, "KAB. BLITAR": { "Wlingi": ["Beru", "Klemunan", "Tangkil", "Tembalang", "Wlingi"], "Talun": ["Bajang", "Jeblog", "Kamulan", "Sragi", "Talun", "Tumpang"], "Garum": ["Bence", "Garum", "Karangrejo", "Slorok", "Tingal"] }, "KAB. SIDOARJO": { "Sidoarjo": ["Bulu Sidokare", "Cemeng Kalang", "Celep", "Pekauman", "Sekardangan"], "Waru": ["Bungurasih", "Kureksari", "Medaeng", "Tambak Sawah", "Waru"] } }, "JAWA TENGAH": { "KOTA SEMARANG": { "Banyumanik": ["Banyumanik", "Gedawang", "Jabungan", "Pudakpayung", "Srondol Kulon"], "Candisari": ["Candi", "Jatingaleh", "Jomblang", "Kaliwiru", "Tegalsari"], "Gajahmungkur": ["Bendanduwur", "Bendanngisor", "Gajahmungkur", "Karangrejo"] }, "KAB. KUDUS": { "Jati": ["Jati Kulon", "Jati Wetan", "Loram Kulon", "Pasuruan Lor", "Tanjungkarang"], "Kota Kudus": ["Purwosari", "Panjunan", "Langgardalem", "Kauman", "Kerjasan"], } }, "DKI JAKARTA": { "JAKARTA PUSAT": { "Gambir": ["Cideng", "Duri Pulo", "Gambir", "Kebon Kelapa", "Petojo Selatan"], "Senen": ["Bungur", "Kenari", "Kramat", "Kwitang", "Paseban", "Senen"] }, "JAKARTA SELATAN": { "Kebayoran Baru": ["Cipete Utara", "Gandaria Utara", "Gunung", "Kramat Pela", "Melawai"], "Tebet": ["Bukit Duri", "Kebon Baru", "Manggarai", "Menteng Dalam", "Tebet Barat"] } }
};
const provinces = Object.keys(addressData);
const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <h2>
        <button type="button" className="flex items-center justify-between w-full py-4 font-medium text-left text-slate-700 dark:text-slate-300" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
          <span className="flex items-center text-sm md:text-base">{title}</span>
          <svg className={`w-6 h-6 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </button>
      </h2>
      {isOpen && ( <div className="pb-4 pt-2 text-slate-500 dark:text-slate-400 text-sm">{children}</div> )}
    </div>
  );
};


const RegistrationPage: React.FC<{ language: Language }> = ({ language }) => {
    const t = translations.registration;
    // ... (state and handlers remain the same) ...
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', nik: '', address: '', province: '', city: '', district: '', village: '', testRegion: '', scheme: '', securityCode: '', });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState<string[]>([]);
    const [districts, setDistricts] = useState<string[]>([]);
    const [villages, setVillages] = useState<string[]>([]);
    const schemes = schemesData;
    const regions = ['LSP P1 SMK DR. SOETOMO SURABAYA', 'TUK Sewan', 'TUK Mandiri'];
    const securityCodeValue = "3219";

    useEffect(() => { if (formData.province) { const provinceData = addressData[formData.province as keyof typeof addressData]; const cityKeys = provinceData ? Object.keys(provinceData) : []; setCities(cityKeys); setFormData(prev => ({ ...prev, city: '', district: '', village: '' })); setDistricts([]); setVillages([]); } else { setCities([]); setDistricts([]); setVillages([]); } }, [formData.province]);
    useEffect(() => { if (formData.province && formData.city) { const provinceData = addressData[formData.province as keyof typeof addressData]; const cityData = provinceData?.[formData.city as keyof typeof provinceData]; const districtKeys = cityData ? Object.keys(cityData) : []; setDistricts(districtKeys); setFormData(prev => ({ ...prev, district: '', village: '' })); setVillages([]); } else { setDistricts([]); setVillages([]); } }, [formData.city, formData.province]);
    useEffect(() => { if (formData.province && formData.city && formData.district) { const provinceData = addressData[formData.province as keyof typeof addressData]; const cityData = provinceData?.[formData.city as keyof typeof provinceData]; const districtData = cityData?.[formData.district as keyof typeof cityData]; setVillages(districtData || []); setFormData(prev => ({ ...prev, village: '' })); } else { setVillages([]); } }, [formData.district, formData.city, formData.province]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const requiredFields: (keyof typeof formData)[] = ['fullName', 'email', 'phone', 'nik', 'address', 'testRegion', 'scheme', 'securityCode'];
        for (const field of requiredFields) { if (!formData[field]) { setError(t.errorRequired[language]); return; } }
        if (formData.securityCode !== securityCodeValue) { setError(t.errorSecurityCode[language]); return; }
        setError('');
        setLoading(true);
        const { error: insertError } = await supabase.from('registrations').insert([{ fullname: formData.fullName, email: formData.email, phone: formData.phone, nik: formData.nik, address: formData.address, province: formData.province, city: formData.city, district: formData.district, village: formData.village, test_region: formData.testRegion, schemeid: formData.scheme, }]);
        setLoading(false);
        if (insertError) { setError(`Gagal mengirim pendaftaran: ${insertError.message}`); } else { setIsSubmitted(true); }
    };
    
    if (isSubmitted) {
        return (
            <div className="bg-white dark:bg-slate-900 py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-md mx-auto bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-8 rounded-lg">
                        <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.successTitle[language]}</h1>
                        <p className="mt-4 text-slate-600 dark:text-slate-300">
                            {t.successBody1[language].replace('{name}', formData.fullName)}
                        </p>
                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                            {t.successBody2[language].replace('{email}', formData.email)}
                        </p>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormData({ fullName: '', email: '', phone: '', nik: '', address: '', province: '', city: '', district: '', village: '', testRegion: '', scheme: '', securityCode: '' });
                            }}
                            className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {t.registerAnother[language]}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    
    const inputClasses = "py-2 px-3 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border border-slate-300 rounded-md bg-white dark:bg-slate-800 dark:border-slate-600 dark:placeholder-slate-400";
    const FormInput: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean; placeholder?: string }> = ({ label, name, value, onChange, type = 'text', required = true, placeholder }) => (
      <div>
          <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
          <input type={type} name={name} id={name} value={value} onChange={onChange} required={required} placeholder={placeholder || label} className={inputClasses} />
      </div>
    );
    const FormSelect: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: (string | {id: string, title: string})[]; required?: boolean; placeholder: string; disabled?: boolean; }> = ({ label, name, value, onChange, options, required = true, placeholder, disabled = false }) => (
       <div>
          <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
          <select id={name} name={name} value={value} onChange={onChange} required={required} disabled={disabled} className={`${inputClasses} disabled:bg-slate-100 disabled:dark:bg-slate-700 disabled:cursor-not-allowed`}>
              <option value="" disabled>{placeholder}</option>
              {options.map(option => {
                  const val = typeof option === 'string' ? option : option.id;
                  const text = typeof option === 'string' ? option : option.title;
                  return <option key={val} value={val}>{text}</option>;
              })}
          </select>
       </div>
    );

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">{t.pageTitle[language]}</h1>
                    <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">{t.pageSubtitle[language]}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 shadow-lg rounded-xl space-y-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">{t.formTitle[language]}</h2>
                            
                            {error && <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">{error}</div>}

                            <FormInput label={t.fullName[language]} name="fullName" value={formData.fullName} onChange={handleChange} placeholder={t.fullName[language]}/>
                            <FormInput label={t.email[language]} name="email" value={formData.email} onChange={handleChange} type="email" placeholder={t.email[language]}/>
                            <FormInput label={t.phone[language]} name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder={t.phone[language]}/>
                            <FormInput label={t.nik[language]} name="nik" value={formData.nik} onChange={handleChange} placeholder={t.nik[language]}/>

                            <div>
                               <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.address[language]}<span className="text-red-500">*</span></label>
                               <textarea name="address" id="address" value={formData.address} onChange={handleChange} required rows={3} placeholder={t.address[language]} className={inputClasses} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                               <FormSelect label={t.province[language]} name="province" value={formData.province} onChange={handleChange} options={provinces} required={false} placeholder={`Pilih ${t.province[language]}`} />
                               <FormSelect label={t.city[language]} name="city" value={formData.city} onChange={handleChange} options={cities} required={false} placeholder={`Pilih ${t.city[language]}`} disabled={!formData.province || cities.length === 0} />
                               <FormSelect label={t.district[language]} name="district" value={formData.district} onChange={handleChange} options={districts} required={false} placeholder={`Pilih ${t.district[language]}`} disabled={!formData.city || districts.length === 0} />
                               <FormSelect label={t.village[language]} name="village" value={formData.village} onChange={handleChange} options={villages} required={false} placeholder={`Pilih ${t.village[language]}`} disabled={!formData.district || villages.length === 0} />
                            </div>

                            <FormSelect label={t.testRegion[language]} name="testRegion" value={formData.testRegion} onChange={handleChange} options={regions} placeholder="Pilih Wilayah" />
                            <FormSelect label={t.scheme[language]} name="scheme" value={formData.scheme} onChange={handleChange} options={schemes} placeholder="Pilih Grup/ Program Studi" />
                            
                            <div>
                                <label htmlFor="securityCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.securityCode[language]}<span className="text-red-500">*</span></label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                     <div className="bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-6 py-2 text-2xl font-bold tracking-[.5em] select-none w-full sm:w-auto text-center" style={{ fontFamily: 'monospace', textDecoration: 'line-through', fontStyle: 'italic', color: '#555' }}>
                                        <span>3 2 1 9</span>
                                     </div>
                                     <FormInput label="" name="securityCode" value={formData.securityCode} onChange={handleChange} placeholder={t.securityCode[language]} required={true}/>
                                </div>
                            </div>
                            
                            <div className="pt-4">
                                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-slate-800 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 disabled:bg-slate-400">
                                    {loading ? t.registering[language] : t.register[language]}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg shadow">
                            <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">{t.faqTitle[language]}</h3>
                            <div className="text-blue-700 dark:text-blue-300/80 space-y-3 text-sm">
                                <p>Peserta uji kompetensi dapat secara mandiri melakukan pendaftaran melalui laman ini. Setelah melakukan pendaftaran, periksa inbox (kotak masuk) email anda, bila tidak terdapat pada inbox email anda silahkan periksa di SPAM email anda.</p>
                                <p className="font-semibold">Akun peserta hanya satu untuk satu Nomor KTP/NIK. Akun dapat digunakan untuk mendaftar pada satu atau lebih skema uji kompetensi.</p>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 sm:p-4 rounded-lg shadow-lg">
                            <AccordionItem title="Bagaimanakah cara mendaftar?"><p>Peserta hanya dapat mendaftar secara mandiri pada menu Pendaftaran Baru.</p></AccordionItem>
                            <AccordionItem title="Kenapa tidak bisa mendaftar skema?"><p>Pastikan Asesi telah melengkapi dokumen persyaratan dasar seperti KTP, KK, Ijazah Terakhir dan Surat Keterangan Bekerja (Magang) di laman profil Asesi.</p></AccordionItem>
                            <AccordionItem title="Mengapa daftar unit kompetensi tidak muncul?"><p>Pada saat mendaftar ke skema, asesi tidak memberikan tanda check (centang) pada pilihan unit kompetensi di lama pendaftaran ke skema uji.</p></AccordionItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;