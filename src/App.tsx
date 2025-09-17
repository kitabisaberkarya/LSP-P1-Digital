
import React, { useState, useCallback, useEffect } from 'react';
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
export type Theme = 'light' | 'dark';
export type Language = 'id' | 'en';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme || 'light');
  const [language, setLanguage] = useState<Language>('id');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);

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
        return <HomePage navigate={navigate} language={language} />;
      case 'schemes':
        return <SchemesPage navigate={navigate} language={language} />;
      case 'registration':
        return <RegistrationPage language={language} />;
      case 'about':
        return <AboutPage language={language} />;
      case 'flow':
        return <FlowPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} navigate={navigate} language={language} />;
      case 'dashboard':
        if (!userRole) {
          // Redirect to login if trying to access dashboard without a role
          return <LoginPage onLogin={handleLogin} navigate={navigate} language={language} />;
        }
        return <DashboardPage role={userRole} onLogout={handleLogout} />;
      default:
        return <HomePage navigate={navigate} language={language} />;
    }
  };

  const isSpecialLayoutPage = activePage === 'login' || (activePage === 'dashboard' && userRole);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-200">
      {!isSpecialLayoutPage && <Header activePage={activePage} navigate={navigate} theme={theme} toggleTheme={toggleTheme} language={language} setLanguage={setLanguage} />}
      <main className={`flex-grow ${!isSpecialLayoutPage ? 'pb-16 md:pb-0' : ''}`}>
        {renderPage()}
      </main>
      {!isSpecialLayoutPage && <Footer language={language} />}
    </div>
  );
};

export default App;