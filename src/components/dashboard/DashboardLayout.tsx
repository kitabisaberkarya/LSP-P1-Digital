import React, { useState } from 'react';
import type { Role } from '../../App';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  user: { name: string; email: string; role: Role };
  onLogout: () => void;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} isSidebarOpen={isSidebarOpen} />

      <div className="sm:ml-64">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left side: Toggle + Breadcrumb */}
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Breadcrumb */}
                <nav className="hidden sm:flex ml-4" aria-label="Breadcrumb">
                  <ol role="list" className="flex items-center space-x-2 text-sm">
                    <li>
                      <div>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                           <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 10.707V17.5a1.5 1.5 0 01-1.5 1.5h-3.5a1 1 0 01-1-1v-3.5a1 1 0 00-1-1h-2a1 1 0 00-1 1V17a1 1 0 01-1 1H4.5a1.5 1.5 0 01-1.5-1.5V10.707a1 1 0 01.293-.707l7-7z" clipRule="evenodd" />
                          </svg>
                          <span className="sr-only">Home</span>
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 flex-shrink-0 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                        <a href="#" className="ml-2 font-medium text-gray-500 hover:text-gray-700">Dashboard</a>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>

              {/* Right side: User info + Logout */}
              <div className="flex items-center space-x-4">
                 <div className="flex items-center space-x-2">
                    <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user.name.replace(/\s/g, '+')}&background=random&color=fff`} alt="User avatar" />
                    <p className="hidden md:block text-sm font-medium text-gray-700">
                      {user.name}
                    </p>
                  </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-sm font-medium text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  title="Keluar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    <span className="sr-only">Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main>
            {children}
        </main>
      </div>
       {isSidebarOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;