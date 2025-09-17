import React from 'react';
import type { Language } from '../App';
import { translations } from '../translations';


const ProfileItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row py-3 border-b border-slate-200 dark:border-slate-700">
    <dt className="w-full sm:w-2/5 md:w-1/3 text-sm font-medium text-slate-600 dark:text-slate-400 shrink-0">{label}</dt>
    <dd className="w-full sm:w-3/5 md:w-2/3 text-sm text-slate-900 dark:text-slate-200 flex items-center mt-1 sm:mt-0">{children}</dd>
  </div>
);

const assessors = [
    { no: 1, name: 'DWI RACHMANIWATI', reg: 'MET. 000.001415 2018', address: 'Kota Surabaya, Jawa Timur' },
    { no: 2, name: 'RAHAYU RISMINARNI', reg: 'MET. 000.003476 2019', address: 'Sidoarjo, Jawa Timur' },
    { no: 3, name: 'SUMILAH', reg: 'MET. 000.003483 2019', address: 'Kota Surabaya, Jawa Timur' },
    { no: 4, name: 'ASHARI CAHYONO', reg: 'MET. 000.003492 2019', address: 'Jember, Jawa Timur' },
    { no: 5, name: 'AMIN SRI ROHMAWATI', reg: 'MET. 000.003453 2019', address: 'Pacitan, Jawa Timur' },
    { no: 6, name: 'DWI APRILJASTUTI', reg: 'MET.000.003418 2019', address: 'Kota Surabaya, Jawa Timur' },
    { no: 7, name: 'Miftahun Naim', reg: 'RIT.913.00208 2018', address: 'Kota Surabaya, Jawa Timur' },
    { no: 8, name: 'Danial Miqdad', reg: 'MET.000.000538.2021', address: 'Sidoarjo, Jawa Timur' },
    { no: 9, name: 'PRIYANKA ANODYA SHAZA ANDOKO', reg: 'MET. 000.002909 2022', address: 'Blitar, Jawa Timur' },
    { no: 10, name: 'MOCHAMAD YUSUF BASHORI', reg: 'MET. 000.002911 2022', address: 'Kota Surabaya, Jawa Timur' },
    { no: 11, name: 'WIJI ASTUTI', reg: 'MET. 000.002910 2022', address: 'Kota Surabaya, Jawa Timur' },
    { no: 12, name: 'Akhmad Ma\'sum', reg: 'MET. 000.002904 2022', address: 'Kota Surabaya, Jawa Timur' },
    { no: 13, name: 'EFFENDY PANDJI PURNOMO', reg: '000.009897 2015', address: 'Kota Surabaya, Jawa Timur' },
    { no: 14, name: 'Fitri Nur Idayah', reg: 'MET.000.003475 2024', address: 'Kota Surabaya, Jawa Timur' },
    { no: 15, name: 'Ari Wijaya', reg: 'MET.000.003476 2024', address: 'Sidoarjo, Jawa Timur' },
    { no: 16, name: 'Asslamet', reg: 'No. Reg. MET000.003482 2019', address: 'Kota Surabaya, Jawa Timur' },
    { no: 17, name: 'Muhammad Najmul Falakh', reg: '000.001413 2018', address: 'Sidoarjo, Jawa Timur' },
].sort((a, b) => a.no - b.no);

const AboutPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = translations.about;

  const profileData = {
    "No. SK Lisensi": "KEP.0933/BNSP/IV/2025",
    "No Lisensi": "BNSP-LSP-1279-ID",
    "Jenis": "LSP Pihak Kesatu",
    "No Telp": "031 - 5914480",
    "No Hp": "081331048586",
    "No Fax": "031 - 5935031",
    "Email": <a href="mailto:lspsmkdr.soetomosby@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline break-all">lspsmkdr.soetomosby@gmail.com</a>,
    "Website": <a href="http://www.smekdors.sch.id/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">http://www.smekdors.sch.id/</a>,
    "Masa Berlaku Sertifikat": "2026-09-27",
    "Status Lisensi": <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Aktif</span>,
  };

  const overviewData = {
    [t.tuk[language]]: 1,
    "SKEMA": 12,
    "ASSESOR": 17,
  };

  const tukData = {
    "Kode": "TUK.LSP-SMK DR.SOETOMO SBY",
    "Jenis": "2",
    "Nama": "TUK LSP SMK DR SOETOMO SURABAYA",
    "Alamat": "JL. KARANG MENJANGAN - JOJORAN IV/2-D",
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                SMK Dr. Soetomo Surabaya
              </h2>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-6 mb-6">
                {t.pageTitle[language]}
              </p>
              
              <dl>
                {Object.entries(profileData).map(([key, value]) => (
                  <ProfileItem key={key} label={key}>{value}</ProfileItem>
                ))}
              </dl>
              
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t.address[language]}</h3>
                <p className="mt-2 text-slate-700 dark:text-slate-300">
                  Jl. Karang Menjangan - Jojoran IV/ 2D Surabaya
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">{t.assessors[language]}</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                        <thead className="bg-slate-50 dark:bg-slate-700/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">No</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Nama Asesor</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">No Registrasi</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Alamat</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700 text-sm">
                            {assessors.map((asesor) => (
                                <tr key={asesor.no}>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">{asesor.no}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900 dark:text-slate-200">{asesor.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">{asesor.reg}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400">{asesor.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
               <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t.dataOverview[language]}
              </h3>
              <div className="space-y-3">
                {Object.entries(overviewData).map(([key, value]) => (
                   <div key={key} className="flex justify-between items-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{key}</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
                   </div>
                ))}
              </div>
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
               <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t.tuk[language]}
              </h3>
              <dl>
                 {Object.entries(tukData).map(([key, value]) => (
                  <ProfileItem key={key} label={key}>{value}</ProfileItem>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;