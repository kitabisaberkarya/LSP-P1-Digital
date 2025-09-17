import React from 'react';
import StatCard from '../../components/dashboard/StatCard';

// Progress Bar Component
const ProgressBar: React.FC<{ label: string; percentage: number; value: string; color: string; }> = ({ label, percentage, value, color }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

// Icon component for Stat Cards
const CardIcon: React.FC<{ path: string, viewBox?: string }> = ({ path, viewBox = "0 0 24 24" }) => (
    <svg fill="currentColor" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
        <path d={path}></path>
    </svg>
);


const DashboardSuperAdmin: React.FC = () => {
    const stats = [
        { title: "T.U.K.", value: 1, color: "bg-cyan-500", icon: <CardIcon viewBox="0 0 20 20" path="M18 8a6 6 0 0 0-12 0c0 3.313 2.687 6 6 6s6-2.687 6-6zm-6 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM2 18a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z" /> },
        { title: "Skema Sertifikasi", value: 12, color: "bg-blue-500", icon: <CardIcon viewBox="0 0 20 20" path="M17 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h14zm0 2H3v12h14V4zM7 8a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1z" /> },
        { title: "Asesor", value: 17, color: "bg-green-500", icon: <CardIcon path="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /> },
        { title: "Asesi / Calon Asesi", value: 1247, color: "bg-orange-400", icon: <CardIcon path="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /> },
        { title: "Uji Kompetensi", value: 31, color: "bg-indigo-500", icon: <CardIcon path="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 14H7v-2h6v2zm-1-4H7v-2h5v2zm-2-4H7V6h2v2z" /> },
        { title: "Jadwal Asesmen", value: 150, color: "bg-pink-500", icon: <CardIcon path="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z" /> },
    ];
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-full">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500 mb-6">Sistem Informasi Lembaga Sertifikasi Profesi</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4">Pendaftar dan Kandidat Tahun 2024</h3>
                    {/* Chart placeholder */}
                    <div className="h-72 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">Line Chart Placeholder</p>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-800 mb-4">Kemajuan Proses Administratif</h3>
                        <div className="space-y-4">
                            <ProgressBar label="Data Asesi telah melengkapi berkas" percentage={0} value="0% (3/1247)" color="bg-blue-600" />
                            <ProgressBar label="Data asesmen diproses (terjadwal)" percentage={100} value="100% (1279/1281)" color="bg-blue-600" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 mb-4">Prosentase Hasil Asesmen</h3>
                        <div className="space-y-4">
                            <ProgressBar label="Data Asesmen dinyatakan Kompeten" percentage={75} value="75% (965/1281)" color="bg-green-500" />
                            <ProgressBar label="Data Asesmen dinyatakan Belum Kompeten" percentage={24} value="24% (313/1281)" color="bg-red-500" />
                        </div>
                    </div>
                     <p className="text-xs text-gray-400 mt-4">*) Data Asesi &lt; Data asesmen, karena dimungkinkan asesi ikut lebih dari 1 skema</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardSuperAdmin;