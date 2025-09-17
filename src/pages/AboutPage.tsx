
import React from 'react';

const ProfileItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex py-3 border-b border-gray-200">
    <dt className="w-2/5 md:w-1/3 text-sm font-medium text-gray-600">{label}</dt>
    <dd className="w-3/5 md:w-2/3 text-sm text-gray-900 flex items-center">{children}</dd>
  </div>
);

const AboutPage: React.FC = () => {
  const profileData = {
    "No. SK Lisensi": "KEP.0933/BNSP/IV/2025",
    "No Lisensi": "BNSP-LSP-1279-ID",
    "Jenis": "LSP Pihak Kesatu",
    "No Telp": "031 - 5914480",
    "No Hp": "081331048586",
    "No Fax": "031 - 5935031",
    "Email": <a href="mailto:lspsmkdr.soetosby@gmail.com" className="text-blue-600 hover:underline break-all">lspsmkdr.soetosby@gmail.com</a>,
    "Website": <a href="http://www.smekdors.sch.id/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">http://www.smekdors.sch.id/</a>,
    "Masa Berlaku Sertifikat": "2026-09-27",
    "Status Lisensi": <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>,
  };

  const overviewData = {
    "TUK": 1,
    "SKEMA": 12,
    "ASSESOR": 17,
  };

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Profile & Address */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                SMK Dr. Soetomo Surabaya
              </h2>
              <p className="mt-2 text-lg text-gray-600 border-b pb-6 mb-6">
                Profile Lembaga Sertifikasi Profesi (LSP)
              </p>
              
              <dl>
                {Object.entries(profileData).map(([key, value]) => (
                  <ProfileItem key={key} label={key}>{value}</ProfileItem>
                ))}
              </dl>
              
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Alamat</h3>
                <p className="mt-2 text-gray-700">
                  JL. Karang Menjangan - Jojoran IV/ 2D Surabaya
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Data Overview */}
          <div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg sticky top-24">
               <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Data Overview
              </h3>
              <div className="space-y-3">
                {Object.entries(overviewData).map(([key, value]) => (
                   <div key={key} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                      <p className="font-semibold text-gray-700">{key}</p>
                      <p className="text-2xl font-bold text-gray-900">{value}</p>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
