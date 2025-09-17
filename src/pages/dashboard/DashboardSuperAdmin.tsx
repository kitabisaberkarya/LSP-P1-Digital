import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type User = { id: string; name: string; email: string; role: 'Admin' | 'Asesor' };

// --- NOTIFICATION COMPONENT ---
const SuccessNotification: React.FC<{ message: string; show: boolean }> = ({ message, show }) => (
    <div className={`fixed top-20 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 z-50 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        {message}
    </div>
);

// --- MODAL COMPONENT ---
const UserModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  user: User | null;
}> = ({ isOpen, onClose, onSave, user }) => {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [role, setRole] = useState<'Admin' | 'Asesor'>(user?.role || 'Admin');

    React.useEffect(() => {
        setName(user?.name || '');
        setEmail(user?.email || '');
        setRole(user?.role || 'Admin');
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSave({ id: user?.id || Date.now().toString(), name, email, role });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">{user ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value as 'Admin' | 'Asesor')} className="mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-500">
                            <option value="Admin">Admin</option>
                            <option value="Asesor">Asesor</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Batal</button>
                    <button onClick={handleSubmit} className="px-5 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700">Simpan</button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
const DashboardSuperAdmin: React.FC = () => {
    type Tab = 'general' | 'appearance' | 'access';
    const [activeTab, setActiveTab] = useState<Tab>('general');
    
    // --- STATE MANAGEMENT ---
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // UI State
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // File objects state
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [faviconFile, setFaviconFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    // --- DATA FETCHING ---
    const fetchSettings = async () => {
        const { data, error } = await supabase.from('settings').select('*');
        if (error) console.error('Error fetching settings:', error);
        else {
            const newSettings = data.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
            setSettings(newSettings);
        }
    };

    const fetchUsers = async () => {
        const { data, error } = await supabase.from('users').select('id, name, email, role');
        if (error) console.error('Error fetching users:', error);
        else setUsers((data as User[]) || []);
    };

    React.useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchSettings(), fetchUsers()]);
            setLoading(false);
        };
        loadData();
    }, []);

    // --- HANDLERS ---
    const handleSettingChange = (key: string, value: string | boolean) => {
        setSettings(prev => ({ ...prev, [key]: String(value) }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileStateSetter: React.Dispatch<React.SetStateAction<File | null>>, settingKey: string) => {
        const file = e.target.files?.[0];
        if (file) {
            fileStateSetter(file);
            handleSettingChange(settingKey, URL.createObjectURL(file));
        }
    };
    
    const uploadFile = async (file: File, path: string): Promise<string | null> => {
        const { data, error } = await supabase.storage
            .from('public_assets')
            .upload(path, file, { upsert: true });

        if (error) {
            console.error(`Error uploading ${path}:`, error);
            return null;
        }
        
        const { data: { publicUrl } } = supabase.storage.from('public_assets').getPublicUrl(data.path);
        return publicUrl;
    };

    const handleSaveSettings = async (keysToSave: string[], successMsg: string) => {
        setSaving(true);
        const updates: { key: string; value: string }[] = [];

        for (const key of keysToSave) {
            let value = settings[key];

            // Handle file uploads
            if (key === 'logo_url' && logoFile) {
                const url = await uploadFile(logoFile, `logo-${Date.now()}`);
                if (url) value = url;
            } else if (key === 'favicon_url' && faviconFile) {
                const url = await uploadFile(faviconFile, `favicon-${Date.now()}`);
                if (url) value = url;
            } else if (key === 'banner_url' && bannerFile) {
                const url = await uploadFile(bannerFile, `banner-${Date.now()}`);
                if (url) value = url;
            }
            
            updates.push({ key, value });
        }

        const { error } = await supabase.from('settings').upsert(updates, { onConflict: 'key' });
        
        setSaving(false);
        if (error) {
            console.error('Error saving settings:', error);
        } else {
            setSuccessMessage(successMsg);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            setLogoFile(null);
            setFaviconFile(null);
            setBannerFile(null);
        }
    };

    const handleSaveUser = async (user: User) => {
        const { id, ...upsertData } = user;
        const { error } = await supabase.from('users').upsert({ id: user.id.startsWith('new-') ? undefined : user.id, ...upsertData });

        if (error) console.error('Error saving user:', error);
        else await fetchUsers(); // Refresh user list
        
        setIsModalOpen(false);
        setEditingUser(null);
    };

    // --- RENDER LOGIC ---
    if (loading) return <div className="p-8 text-center">Memuat pengaturan...</div>;

    const renderGeneral = () => (
        <div className="space-y-8">
            <ControlCard 
                title="Identitas Situs"
                actionSection={<button onClick={() => handleSaveSettings(['logo_url', 'favicon_url'], "Identitas situs disimpan!")} disabled={saving} className="...">{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>}
            >
                <FileUpload label="Logo Aplikasi" previewUrl={settings.logo_url || 'https://sisfo.bnsp.go.id/images/PtuE0H7UaNrgdBGsxMAh1FQLCK9IWVDc.png'} onFileChange={(e) => handleFileChange(e, setLogoFile, 'logo_url')} />
                <FileUpload label="Favicon" previewUrl={settings.favicon_url || '/vite.svg'} onFileChange={(e) => handleFileChange(e, setFaviconFile, 'favicon_url')} />
            </ControlCard>
            <ControlCard 
                title="Pengaturan Aplikasi"
                 actionSection={<button onClick={() => handleSaveSettings(['registration_enabled'], "Pengaturan aplikasi disimpan!")} disabled={saving} className="...">{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>}
            >
                <ToggleSwitch label="Aktifkan Pendaftaran" enabled={settings.registration_enabled === 'true'} onToggle={(val) => handleSettingChange('registration_enabled', val)} />
            </ControlCard>
        </div>
    );
    
    const renderAppearance = () => (
         <ControlCard 
            title="Kustomisasi Halaman Utama"
            actionSection={<button onClick={() => handleSaveSettings(['banner_url', 'about_content'], "Tampilan disimpan!")} disabled={saving} className="...">{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</button>}
        >
            <FileUpload label="Gambar Banner / Hero" previewUrl={settings.banner_url || 'https://picsum.photos/1000/800?random=1'} onFileChange={(e) => handleFileChange(e, setBannerFile, 'banner_url')} />
            <div>
                <label className="block text-sm font-medium text-gray-700">Konten "Tentang Kami"</label>
                <textarea
                    rows={5}
                    value={settings.about_content || 'LSP P1 SMK DR. SOETOMO SURABAYA adalah lembaga sertifikasi profesi pihak pertama yang berlisensi BNSP untuk memastikan siswa memiliki kompetensi yang diakui secara nasional.'}
                    onChange={(e) => handleSettingChange('about_content', e.target.value)}
                    className="mt-2 block w-full ..."
                />
            </div>
        </ControlCard>
    );

    const renderAccess = () => (
        <ControlCard 
            title="Manajemen Akses Pengguna"
            actionSection={<button onClick={() => { setEditingUser(null); setIsModalOpen(true); }} className="...">{saving ? 'Menyimpan...' : 'Tambah Pengguna'}</button>}
        >
            <div className="overflow-x-auto">
                <table className="min-w-full ...">
                    {/* Table Head */}
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                {/* Table Cells */}
                                <td className="..."><button onClick={() => { setEditingUser(user); setIsModalOpen(true); }} className="text-slate-600 hover:text-slate-900">Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ControlCard>
    );

    // Main component return
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-full">
         <SuccessNotification message={successMessage} show={showSuccess} />
         <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveUser} user={editingUser} />
         {/* ... Tabs and content rendering ... */}
         <div className="border-b border-slate-200 mb-8">
            <nav className="-mb-px flex space-x-6">
                <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')}>General</TabButton>
                <TabButton active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')}>Tampilan</TabButton>
                <TabButton active={activeTab === 'access'} onClick={() => setActiveTab('access')}>Manajemen Akses</TabButton>
            </nav>
        </div>

        <div>
            {activeTab === 'general' && renderGeneral()}
            {activeTab === 'appearance' && renderAppearance()}
            {activeTab === 'access' && renderAccess()}
        </div>
      </div>
    );
};

// Simplified TabButton for brevity
const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${active ? 'border-b-2 border-slate-700 text-slate-800 font-semibold' : 'text-gray-500 hover:text-slate-700'}`}>
        {children}
    </button>
);
// Simplified ControlCard, FileUpload, ToggleSwitch for brevity
const ControlCard: React.FC<{ title: string; children: React.ReactNode; actionSection?: React.ReactNode }> = ({ title, children, actionSection }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className="border-t my-4"></div>
        <div className="space-y-6">{children}</div>
        {actionSection && <div className="border-t mt-6 pt-4 flex justify-end">{actionSection}</div>}
    </div>
);
const FileUpload: React.FC<{ label: string; previewUrl: string; onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, previewUrl, onFileChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center space-x-4"><img src={previewUrl} alt="preview" className="h-16 w-16 object-contain bg-slate-100 p-1 rounded-md border" />
        <input type="file" onChange={onFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-100 hover:file:bg-slate-200"/></div>
    </div>
);
const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onToggle: (enabled: boolean) => void }> = ({ label, enabled, onToggle }) => (
    <div className="flex items-center justify-between"><span className="font-medium">{label}</span><button type="button" className={`${enabled ? 'bg-slate-800' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`} onClick={() => onToggle(!enabled)}><span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/></button></div>
);

export default DashboardSuperAdmin;