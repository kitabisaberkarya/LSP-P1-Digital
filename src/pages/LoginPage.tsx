
import React, { useState } from 'react';
import type { Page, Role } from '../App';

interface LoginPageProps {
  navigate: (page: Page) => void;
  onLogin: (role: Role) => void;
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
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ navigate, onLogin }) => {
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
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8" style={{backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'}}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-4xl font-bold text-gray-700">Admin<span className="text-blue-600">LSP</span></h1>
        <h2 className="mt-2 text-center text-md text-gray-600">
          Silahkan masuk untuk akses laman
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
              <RoleButton currentRole="asesi" activeRole={activeRole} onClick={setActiveRole}>Asesi</RoleButton>
              <RoleButton currentRole="asesor" activeRole={activeRole} onClick={setActiveRole}>Asesor</RoleButton>
              <RoleButton currentRole="admin" activeRole={activeRole} onClick={setActiveRole}>Admin</RoleButton>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Ingat Saya
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Lupa password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;