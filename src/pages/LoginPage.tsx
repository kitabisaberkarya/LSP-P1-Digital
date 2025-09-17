import React, { useState } from 'react';
import type { Page, Role, Language } from '../App';
import { translations } from '../translations';

interface LoginPageProps {
  navigate: (page: Page) => void;
  onLogin: (role: Role) => void;
  language: Language;
}

type LoginRole = 'asesi' | 'asesor' | 'admin';

const RoleButton: React.FC<{
  currentRole: LoginRole;
  activeRole: LoginRole;
  onClick: (role: LoginRole) => void;
  children: React.ReactNode;
}> = ({ currentRole, activeRole, onClick, children }) => {
  const isActive = currentRole === activeRole;
  return (
    <button
      type="button"
      onClick={() => onClick(currentRole)}
      className={`w-full py-2.5 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        isActive
          ? 'bg-blue-600 text-white shadow-sm'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
      }`}
    >
      {children}
    </button>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ navigate, onLogin, language }) => {
  const t = translations.login;
  const [activeRole, setActiveRole] = useState<LoginRole>('asesi');
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Super Admin Check
    if (formData.username === 'super.admin' && formData.password === 'superadmin123') {
        onLogin('superadmin');
        return;
    }

    console.log(`Logging in as ${activeRole} with data:`, formData);
    onLogin(activeRole);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-slate-700 dark:text-slate-200">Admin<span className="text-blue-600 dark:text-blue-500">LSP</span></h1>
        <h2 className="mt-2 text-center text-md text-slate-600 dark:text-slate-400">
          {t.title[language]}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-800 py-8 px-4 shadow-2xl rounded-lg sm:px-10 border border-slate-200 dark:border-slate-700">
          <div className="mb-6">
            <div className="flex space-x-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg">
              <RoleButton currentRole="asesi" activeRole={activeRole} onClick={setActiveRole}>Asesi</RoleButton>
              <RoleButton currentRole="asesor" activeRole={activeRole} onClick={setActiveRole}>Asesor</RoleButton>
              <RoleButton currentRole="admin" activeRole={activeRole} onClick={setActiveRole}>Admin</RoleButton>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <div className="mt-1">
                <input
                  id="username" name="username" type="text" autoComplete="username" required
                  value={formData.username} onChange={handleInputChange} placeholder="Username"
                  className="appearance-none block w-full px-3 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="mt-1">
                <input
                  id="password" name="password" type="password" autoComplete="current-password" required
                  placeholder="Password" value={formData.password} onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-3 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded dark:bg-slate-600 dark:border-slate-500" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900 dark:text-slate-300">
                  {t.remember[language]}
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  {t.forgot[language]}
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t.loginBtn[language]}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
        <a 
            href="#"
            onClick={(e) => { e.preventDefault(); navigate('registration'); }}
            className="w-full flex items-center justify-center px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            aria-label="Mendaftar akun baru"
        >
            <span>{t.noAccount[language]} <span className="font-semibold text-blue-600 dark:text-blue-500">{t.registerHere[language]}</span></span>
        </a>
        <a 
            href="#"
            onClick={(e) => { e.preventDefault(); navigate('home'); }}
            className="w-full flex items-center justify-center px-4 py-3 text-slate-600 dark:text-slate-400 font-medium rounded-lg hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-colors"
            aria-label="Kembali ke beranda"
        >
            {t.backToHome[language]}
        </a>
      </div>
    </div>
  );
};

export default LoginPage;