
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';

// --- TYPE DEFINITIONS ---
type Tab = 'general' | 'appearance' | 'access';

interface User {
  id?: string;
  name: string;
  email: string;
  role: 'Admin' | 'Asesor';
}

interface Settings {
  logoUrl: string;
  faviconUrl: string;
  registrationEnabled: boolean;
  bannerUrl: string;
  aboutContent: string;
}

// --- SUB-COMPONENTS ---
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

const SuccessNotification: React.FC<{ message: string; show: boolean }> = ({ message, show }) => (
    <div className={`fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 z-50 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        {message}
    </div>
);


// --- MAIN DASHBOARD COMPONENT ---
const DashboardSuperAdmin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('general');
    
    // Data State
    const [settings, setSettings] = useState<Settings>({
        logoUrl: 'https://sisfo.bnsp.go.id/images/PtuE0H7UaNrgdBGsxMAh1FQLCK9IWVDc.png',
        faviconUrl: '/vite.svg',
        registrationEnabled: true,
        bannerUrl: 'https://picsum.photos/1000/800?random=1',
        aboutContent: 'LSP P1 SMK DR. SOETOMO SURABAYA didirikan oleh sekolah untuk memastikan setiap siswa memiliki bukti kompetensi yang diakui secara nasional oleh BNSP, membuka gerbang menuju karir profesional.'
    });
    const [users, setUsers] = useState<User[]>([]);

    // UI State
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [userFormData, setUserFormData] = useState<User>({ name: '', email: '', role: 'Admin' });

    // --- DATA FETCHING ---
    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch settings
            const { data: settingsData, error: settingsError } = await supabase.from('settings').select('key, value');
            if (settingsError) throw settingsError;
            
            if (settingsData) {
                const newSettings = { ...settings };
                settingsData.forEach(({ key, value }) => {
                    switch (key) {
                        case 'logoUrl': newSettings.logoUrl = value; break;
                        case 'faviconUrl': newSettings.faviconUrl = value; break;
                        case 'registrationEnabled': newSettings.registrationEnabled = value === 'true'; break;
                        case 'bannerUrl': newSettings.bannerUrl = value; break;
                        case 'aboutContent': newSettings.aboutContent = value; break;
                    }
                });
                setSettings(newSettings);
            }

            // Fetch users
            const { data: usersData, error: usersError } = await supabase.from('users').select('id, name, email, role');
            if (usersError) throw usersError;
            if(usersData) setUsers(usersData as User[]);

        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // --- HELPERS ---
    const showNotification = (message: string) => {
        setSuccessMessage(message);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleFileUpload = async (file: File, folder: string): Promise<string> => {
        if (!file) throw new Error("No file provided.");
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
        const filePath = `${folder}/${fileName}`;

        const { error } = await supabase.storage.from('public_assets').upload(filePath, file);
        if (error) throw error;

        const { data } = supabase.storage.from('public_assets').getPublicUrl(filePath);
        return data.publicUrl;
    };
    
    // --- EVENT HANDLERS ---
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, settingKey: keyof Settings, folder: string) => {
        const file = event.target.files?.[0];
        if (file) {
            setSettings(prev => ({ ...prev, [settingKey]: URL.createObjectURL(file) })); // Optimistic preview
            try {
                const publicUrl = await handleFileUpload(file, folder);
                setSettings(prev => ({ ...prev, [settingKey]: publicUrl }));
            } catch (error) {
                console.error("File upload failed:", error);
                showNotification("Gagal mengunggah file.");
                // Optionally revert to old image url
            }
        }
    };
    
    const handleSave = async (settingsToSave: {key: string, value: string}[], successMsg: string) => {
        setSaving(true);
        const { error } = await supabase.from('settings').upsert(settingsToSave, { onConflict: 'key' });
        setSaving(false);
        if (error) {
            console.error("Error saving settings:", error);
            showNotification("Gagal menyimpan perubahan.");
        } else {
            showNotification(successMsg);
        }
    };

    const handleSaveUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingUser) { // Update existing user
                const { error } = await supabase.from('users').update({ ...userFormData }).eq('id', editingUser.id);
                if (error) throw error;
                showNotification("Pengguna berhasil diperbarui.");
            } else { // Create new user
                const { error } = await supabase.from('users').insert([{ ...userFormData }]);
                if (error) throw error;
                showNotification("Pengguna berhasil ditambahkan.");
            }
            fetchDashboardData(); // Refresh user list
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving user:", error);
            showNotification("Gagal menyimpan data pengguna.");
        } finally {
            setSaving(false);
        }
    };

    // --- MODAL CONTROLS ---
    const openAddModal = () => {
        setEditingUser(null);
        setUserFormData({ name: '', email: '', role: 'Admin' });
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setUserFormData(user);
        setIsModalOpen(true);
    };
    
    // --- RENDER LOGIC ---
    const renderContent = () => {
        if (loading) {
            return <div className="text-center p-10 text-gray-500">Memuat pengaturan...</div>
        }

        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-8">
                        <ControlCard 
                            title="Identitas Situs"
                            actionSection={
                                <button onClick={() => handleSave([
                                    { key: 'logoUrl', value: settings.logoUrl },
                                    { key: 'faviconUrl', value: settings.faviconUrl },
                                ], "Identitas situs disimpan!")} 
                                disabled={saving}
                                className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:bg-slate-400">
                                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            }
                        >
                            <FileUpload label="Logo Aplikasi" previewUrl={settings.logoUrl} onFileChange={(e) => handleFileChange(e, 'logoUrl', 'assets')} />
                            <FileUpload label="Favicon (.ico, .svg, .png)" previewUrl={settings.faviconUrl} onFileChange={(e) => handleFileChange(e, 'faviconUrl', 'assets')} />
                        </ControlCard>
                        <ControlCard 
                            title="Pengaturan Aplikasi"
                             actionSection={
                                <button onClick={() => handleSave([{ key: 'registrationEnabled', value: String(settings.registrationEnabled) }], "Pengaturan aplikasi disimpan!")} 
                                disabled={saving}
                                className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:bg-slate-400">
                                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            }
                        >
                            <ToggleSwitch label="Aktifkan Pendaftaran" enabled={settings.registrationEnabled} onToggle={(val) => setSettings(s => ({...s, registrationEnabled: val}))} />
                            <p className="text-xs text-gray-500 -mt-4">
                                {settings.registrationEnabled ? "Pengguna dapat mengakses halaman pendaftaran." : "Halaman pendaftaran akan disembunyikan dari pengguna."}
                            </p>
                        </ControlCard>
                    </div>
                );
            case 'appearance':
                return (
                     <ControlCard 
                        title="Kustomisasi Halaman Utama"
                        actionSection={
                            <button onClick={() => handleSave([
                                { key: 'bannerUrl', value: settings.bannerUrl },
                                { key: 'aboutContent', value: settings.aboutContent },
                            ], "Tampilan disimpan!")} 
                            disabled={saving}
                            className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:bg-slate-400">
                                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        }
                    >
                        <FileUpload label="Gambar Banner / Hero" previewUrl={settings.bannerUrl} onFileChange={(e) => handleFileChange(e, 'bannerUrl', 'assets')} />
                        <div>
                            <label htmlFor="aboutContent" className="block text-sm font-medium text-gray-700">Konten "Tentang Kami" di Beranda</label>
                            <textarea
                                id="aboutContent"
                                rows={5}
                                value={settings.aboutContent}
                                onChange={(e) => setSettings(s => ({...s, aboutContent: e.target.value}))}
                                className="mt-2 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                            />
                        </div>
                    </ControlCard>
                );
             case 'access':
                return (
                    <ControlCard 
                        title="Manajemen Akses Pengguna"
                        actionSection={
                            <button onClick={openAddModal} className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
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
                                                <button onClick={() => openEditModal(user)} className="text-slate-600 hover:text-slate-900">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ControlCard>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-full">
            <SuccessNotification message={successMessage} show={showSuccess} />
            
            {isModalOpen && (
                 <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4" aria-modal="true">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <form onSubmit={handleSaveUser}>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">{editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                    <input type="text" name="name" id="name" value={userFormData.name} onChange={(e) => setUserFormData(s => ({...s, name: e.target.value}))} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" name="email" id="email" value={userFormData.email} onChange={(e) => setUserFormData(s => ({...s, email: e.target.value}))} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"/>
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                    <select name="role" id="role" value={userFormData.role} onChange={(e) => setUserFormData(s => ({...s, role: e.target.value as User['role']}))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white">
                                        <option>Admin</option>
                                        <option>Asesor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Batal</button>
                                <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-md hover:bg-slate-700 disabled:bg-slate-400">{saving ? 'Menyimpan...' : 'Simpan'}</button>
                            </div>
                        </form>
                    </div>
                 </div>
            )}

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
