import React from 'react';
import StatCard from '../../components/dashboard/StatCard';

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


const DashboardAdmin: React.FC = () => {
    // FIX: Updated the stats generation to be compatible with the new StatCard component, which requires a 'color' prop and a raw SVG icon.
    const cardColors = ["bg-cyan-500", "bg-blue-500", "bg-green-500", "bg-orange-400", "bg-indigo-500", "bg-pink-500"];
    const cardIcon = (path: string) => (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} /></svg>
    );

    const stats = [
        { title: "T.U.K.", value: 22, icon: cardIcon("M2.25 21h19.5m-18-18h18a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0119.5 18.75H4.5A2.25 2.25 0 012.25 16.5V4.5A2.25 2.25 0 014.5 2.25z"), color: cardColors[0] },
        { title: "Skema Sertifikasi", value: 20, icon: cardIcon("M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM10.5 16.5h3.75m-3.75-3h3.75"), color: cardColors[1] },
        { title: "Asesor", value: 41, icon: cardIcon("M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"), color: cardColors[2] },
        { title: "Asesi / Calon Asesi", value: 1247, icon: cardIcon("M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12A3.75 3.75 0 1012 4.5 3.75 3.75 0 0012 12z"), color: cardColors[3] },
        { title: "Uji Kompetensi", value: 31, icon: cardIcon("M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"), color: cardColors[4] },
        { title: "Jadwal Asesmen", value: 150, icon: cardIcon("M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18"), color: cardColors[5] },
    ];
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Sistem Informasi Lembaga Sertifikasi Profesi</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
                            <ProgressBar label="Data Asesi telah melengkapi berkas" percentage={8} value="8% (3/1247)" color="bg-blue-600" />
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
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
