import React from 'react';
import type { Role } from '../App';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardAsesi from './dashboard/DashboardAsesi';
import DashboardAsesor from './dashboard/DashboardAsesor';
import DashboardAdmin from './dashboard/DashboardAdmin';
import DashboardSuperAdmin from './dashboard/DashboardSuperAdmin';

interface DashboardPageProps {
  role: Role;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ role, onLogout }) => {
  
  const userMap = {
    asesi: { name: 'Budi Santoso', email: 'budi.santoso@email.com' },
    asesor: { name: 'Siti Aminah, S.Kom', email: 's.aminah@email.com' },
    admin: { name: 'Dhega Febiharsa', email: 'febiharsa@gmail.com' },
    superadmin: { name: 'Super Admin', email: 'super.admin@lsp.smekdors' },
  };

  const renderDashboardContent = () => {
    switch (role) {
      case 'asesi':
        return <DashboardAsesi />;
      case 'asesor':
        return <DashboardAsesor />;
      case 'admin':
        return <DashboardAdmin />;
      case 'superadmin':
        return <DashboardSuperAdmin />;
      default:
        // This fallback should ideally not be reached if App state is managed correctly
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                  <h1 className="text-2xl font-bold text-red-600">Error: Invalid Role</h1>
                  <p className="text-gray-600">Could not display dashboard for an unknown user role.</p>
                  <button onClick={onLogout} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Go to Homepage
                  </button>
              </div>
          </div>
        );
    }
  };

  const currentUser = {
    ...userMap[role],
    role: role,
  };


  return (
    <DashboardLayout user={currentUser} onLogout={onLogout}>
      {renderDashboardContent()}
    </DashboardLayout>
  )
};

export default DashboardPage;
