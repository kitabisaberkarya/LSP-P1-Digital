import React from 'react';

// Placeholder data for the asesi
const asesiData = {
  name: 'Budi Santoso',
  scheme: {
    title: 'Junior Web Developer',
    id: 'SKM-001-WEBDEV',
  },
  status: {
    title: 'Jadwal Asesmen Telah Terbit',
    description: 'Asesmen akan dilaksanakan pada 28 Agustus 2024. Harap persiapkan diri Anda.',
    color: 'bg-green-100 text-green-800',
    icon: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
  },
};

const StatusCard: React.FC<{ status: typeof asesiData.status }> = ({ status }) => (
  <div className={`p-6 rounded-xl shadow-md flex items-start space-x-4 ${status.color}`}>
    <div className="flex-shrink-0">{status.icon}</div>
    <div>
      <h3 className="text-lg font-bold">{status.title}</h3>
      <p className="mt-1">{status.description}</p>
    </div>
  </div>
);

const SchemeDetailsCard: React.FC<{ scheme: typeof asesiData.scheme }> = ({ scheme }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Detail Skema Sertifikasi</h3>
        <div>
            <p className="text-sm text-gray-500">Nama Skema</p>
            <p className="font-semibold text-gray-900">{scheme.title}</p>
        </div>
        <div className="mt-4">
            <p className="text-sm text-gray-500">Nomor Registrasi Skema</p>
            <p className="font-semibold text-gray-900">{scheme.id}</p>
        </div>
    </div>
);

const QuickActionsCard: React.FC = () => (
     <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Aksi Cepat</h3>
        <div className="space-y-3">
             <a href="#" className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <span>Unduh Kartu Peserta</span>
            </a>
             <a href="#" className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-md transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <span>Lihat Portofolio</span>
            </a>
        </div>
    </div>
);

const DashboardAsesi: React.FC = () => {
  return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 space-y-8">
                <StatusCard status={asesiData.status} />
            </div>
             <div className="lg:col-span-2 space-y-8">
                <SchemeDetailsCard scheme={asesiData.scheme} />
            </div>
            <div className="space-y-8">
                <QuickActionsCard />
            </div>
        </div>
      </div>
  );
};

export default DashboardAsesi;