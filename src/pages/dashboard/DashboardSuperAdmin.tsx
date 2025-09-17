
import React, { useState } from 'react';

// Tab button component
const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 focus:outline-none ${
            active 
                ? 'border-b-2 border-slate-700 text-slate-800 font-semibold' 
                : 'text-gray-500 hover:text-slate-700'
        }`}
    >
        {children}
    </button>
);

// Control card component with elegant styling
const ControlCard: React.FC<{ title: string; children: React.ReactNode; actionSection?: React.ReactNode }> = ({ title, children, actionSection }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className="border-t border-slate-200 my-4"></div>
        <div className="space-y-6">{children}</div>
        {actionSection && (
            <>
                <div className="border-t border-slate-200 mt-6 pt-4"></div>
                <div className="flex justify-end">
                    {actionSection}
                </div>
            </>
        )}
    </div>
);

// Modern File Upload component
const FileUpload: React.FC<{ label: string; previewUrl: string; onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, previewUrl, onFileChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center space-x-4">
            <img src={previewUrl} alt={`${label} preview`} className="h-16 w-16 object-contain bg-slate-100 p-1 rounded-md border border-slate-200" />
            <div className="flex-1">
                 <input type="file" onChange={onFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition-colors cursor-pointer"/>
            </div>
        </div>
    </div>
);

// Elegant Toggle Switch component
const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onToggle: (enabled: boolean) => void }> = ({ label, enabled, onToggle }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <button
            type="button"
            className={`${enabled ? 'bg-slate-800' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500`}
            onClick={() => onToggle(!enabled)}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    </div>
);

// Success notification component
const SuccessNotification: React.FC<{ message: string; show: boolean }> = ({ message, show }) => (
    <div className={`fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 z-50 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        {message}
    </div>
);


const DashboardSuperAdmin: React.FC = () => {
    type Tab = 'general' | 'appearance' | 'access';
    const [activeTab, setActiveTab] = useState<Tab>('general');
    
    // State for General Settings
    const [registrationEnabled, setRegistrationEnabled] = useState(true);
    const [logoPreview, setLogoPreview] = useState('https://sisfo.bnsp.go.id/images/PtuE0H7UaNrgdBGsxMAh1FQLCK9IWVDc.png');
    const [faviconPreview, setFaviconPreview] = useState('/vite.svg');

    // State for Appearance Settings
    const [aboutContent, setAboutContent] = useState(
        'LSP P1 SMK DR. SOETOMO SURABAYA didirikan oleh sekolah untuk memastikan setiap siswa memiliki bukti kompetensi yang diakui secara nasional oleh BNSP, membuka gerbang menuju karir profesional.'
    );
    const [bannerPreview, setBannerPreview] = useState('https://picsum.photos/1000/800?random=1');

    // State for notifications
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const file = event.target.files?.[0];
        if (file) {
            setter(URL.createObjectURL(file));
        }
    };
    
    const handleSave = (message: string) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-8">
                        <ControlCard 
                            title="Identitas Situs"
                            actionSection={
                                <button onClick={() => handleSave("Identitas situs disimpan!")} className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
                                    Simpan Perubahan
                                </button>
                            }
                        >
                            <FileUpload label="Logo Aplikasi" previewUrl={logoPreview} onFileChange={(e) => handleFileChange(e, setLogoPreview)} />
                            <FileUpload label="Favicon (.ico, .svg, .png)" previewUrl={faviconPreview} onFileChange={(e) => handleFileChange(e, setFaviconPreview)} />
                        </ControlCard>
                        <ControlCard 
                            title="Pengaturan Aplikasi"
                             actionSection={
                                <button onClick={() => handleSave("Pengaturan aplikasi disimpan!")} className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
                                    Simpan Perubahan
                                </button>
                            }
                        >
                            <ToggleSwitch label="Aktifkan Pendaftaran" enabled={registrationEnabled} onToggle={setRegistrationEnabled} />
                            <p className="text-xs text-gray-500 -mt-4">
                                {registrationEnabled 
                                    ? "Pengguna dapat mengakses halaman pendaftaran." 
                                    : "Halaman pendaftaran akan disembunyikan dari pengguna."
                                }
                            </p>
                        </ControlCard>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="space-y-8">
                        <ControlCard 
                            title="Kustomisasi Halaman Utama"
                            actionSection={
                                <button onClick={() => handleSave("Tampilan disimpan!")} className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
                                    Simpan Perubahan
                                </button>
                            }
                        >
                            <FileUpload label="Gambar Banner / Hero" previewUrl={bannerPreview} onFileChange={(e) => handleFileChange(e, setBannerPreview)} />
                            <div>
                                <label htmlFor="aboutContent" className="block text-sm font-medium text-gray-700">Konten "Tentang Kami" di Beranda</label>
                                <textarea
                                    id="aboutContent"
                                    rows={5}
                                    value={aboutContent}
                                    onChange={(e) => setAboutContent(e.target.value)}
                                    className="mt-2 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                                />
                            </div>
                        </ControlCard>
                    </div>
                );
             case 'access':
                const users = [
                    { name: 'Dhega Febiharsa', email: 'febiharsa@gmail.com', role: 'Admin' },
                    { name: 'Siti Aminah, S.Kom', email: 's.aminah@email.com', role: 'Asesor' },
                    { name: 'Admin LSP', email: 'admin.lsp@email.com', role: 'Admin' },
                ];
                return (
                    <ControlCard 
                        title="Manajemen Akses Pengguna"
                        actionSection={
                            <button className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
                                Tambah Pengguna Baru
                            </button>
                        }
                    >
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {users.map((user) => (
                                        <tr key={user.email}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-slate-600 hover:text-slate-900">Edit</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ControlCard>
                );
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-full">
            <SuccessNotification message={successMessage} show={showSuccess} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Pengaturan Website</h1>
                <p className="mt-1 text-gray-600">Kelola identitas, tampilan, dan fungsionalitas aplikasi LSP dari sini.</p>
            </div>
            
            <div className="border-b border-slate-200 mb-8">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')}>General</TabButton>
                    <TabButton active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')}>Tampilan</TabButton>
                    <TabButton active={activeTab === 'access'} onClick={() => setActiveTab('access')}>Manajemen Akses</TabButton>
                </nav>
            </div>
            
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default DashboardSuperAdmin;