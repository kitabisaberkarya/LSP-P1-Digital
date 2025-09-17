import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SchemesPage from './pages/SchemesPage';
import RegistrationPage from './pages/RegistrationPage';
import AboutPage from './pages/AboutPage';
import FlowPage from './pages/FlowPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export type Page = 'home' | 'schemes' | 'registration' | 'about' | 'flow' | 'login' | 'dashboard';
export type Role = 'asesi' | 'asesor' | 'admin' | 'superadmin';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<Role | null>(null);

  const navigate = useCallback((page: Page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = useCallback((role: Role) => {
    setUserRole(role);
    setActivePage('dashboard');
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = useCallback(() => {
    setUserRole(null);
    setActivePage('home');
    window.scrollTo(0, 0);
  }, []);


  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'schemes':
        return <SchemesPage navigate={navigate} />;
      case 'registration':
        return <RegistrationPage />;
      case 'about':
        return <AboutPage />;
      case 'flow':
        return <FlowPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} navigate={navigate} />;
      case 'dashboard':
        if (!userRole) {
          // Redirect to login if trying to access dashboard without a role
          return <LoginPage onLogin={handleLogin} navigate={navigate} />;
        }
        return <DashboardPage role={userRole} onLogout={handleLogout} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  const isSpecialLayoutPage = activePage === 'login' || (activePage === 'dashboard' && userRole);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isSpecialLayoutPage && <Header activePage={activePage} navigate={navigate} />}
      <main className={`flex-grow ${!isSpecialLayoutPage ? 'pb-16 md:pb-0' : ''}`}>
        {renderPage()}
      </main>
      {!isSpecialLayoutPage && <Footer />}
    </div>
  );
};

export default App;