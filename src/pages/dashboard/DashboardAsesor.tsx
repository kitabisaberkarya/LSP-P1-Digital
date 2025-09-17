
import React from 'react';

const AsesorInfoCard: React.FC<{ metric: string, value: string | number, icon: JSX.Element }> = ({ metric, value, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{metric}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const UpcomingAssessments: React.FC = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Jadwal Asesmen Mendatang</h3>
        <ul className="space-y-4">
            <li className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md">
                <div>
                    <p className="font-semibold">Budi Santoso - Junior Web Developer</p>
                    <p className="text-sm text-gray-500">28 Agustus 2024 - 09:00 WIB</p>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">Lihat Detail</a>
            </li>
            <li className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-md">
                <div>
                    <p className="font-semibold">Ani Yudhoyono - Digital Marketing</p>
                    <p className="text-sm text-gray-500">29 Agustus 2024 - 13:00 WIB</p>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">Lihat Detail</a>
            </li>
        </ul>
    </div>
);


const DashboardAsesor: React.FC = () => {
    const iconClass = "w-6 h-6 text-blue-600";
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                <AsesorInfoCard metric="Total Asesi" value={24} icon={<svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} />
                <AsesorInfoCard metric="Asesmen Selesai" value={18} icon={<svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} />
                <AsesorInfoCard metric="Menunggu Jadwal" value={6} icon={<svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />
            </div>
            <UpcomingAssessments />
        </div>
    );
};

export default DashboardAsesor;