import React from 'react';
import type { Page, Theme, Language } from '../App';
import { translations } from '../translations';


interface HeaderProps {
  activePage: Page;
  navigate: (page: Page) => void;
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

// --- DESKTOP NAVIGATION LINK ---
const NavLink: React.FC<{
  page: Page;
  activePage: Page;
  navigate: (page: Page) => void;
  children: React.ReactNode;
  isButton?: boolean;
}> = ({ page, activePage, navigate, children, isButton = false }) => {
  const isActive = activePage === page;
  
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = isButton ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300';
  const inactiveClasses = isButton 
    ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600' 
    : 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-700/50';

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        navigate(page);
      }}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </a>
  );
};

// --- MOBILE NAVIGATION LINK ---
const MobileNavLink: React.FC<{
  page: Page;
  isActive: boolean;
  navigate: (page: Page) => void;
  icon: React.ReactElement<{ className?: string }>;
  label: string;
}> = ({ page, isActive, navigate, icon, label }) => {
  const activeColor = 'text-blue-600 font-bold';
  const inactiveColor = 'text-gray-600 dark:text-slate-400';

  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); navigate(page); }}
      className="flex-1 flex flex-col items-center justify-center h-full transition-colors duration-300 z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md"
      aria-current={isActive ? 'page' : undefined}
    >
      {React.cloneElement(icon, {
        className: `h-6 w-6 mb-0.5 transition-colors duration-300 ${
          isActive ? 'text-blue-600' : inactiveColor
        }`
      })}
      <span className={`text-xs font-medium transition-colors duration-300 ${
        isActive ? activeColor : inactiveColor
      }`}>
        {label}
      </span>
    </a>
  );
};

const Header: React.FC<HeaderProps> = ({ activePage, navigate, theme, toggleTheme, language, setLanguage }) => {
  const t = translations.header.nav;

  const iconClass = "h-6 w-6";
  const icons: { [key in Page]?: JSX.Element } = {
    home: <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3v-6a1 1 0 011-1h2a1 1 0 011 1v6h3a1 1 0 001-1V10l-7-7-7 7z" /></svg>,
    schemes: <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    flow: <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>,
    registration: <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    about: <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    login: <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  };

  const navLinks: { page: Page; label: string; icon: JSX.Element }[] = [
    { page: 'home', label: t.home[language], icon: icons.home! },
    { page: 'schemes', label: t.schemes[language], icon: icons.schemes! },
    { page: 'flow', label: t.flow[language], icon: icons.flow! },
    { page: 'registration', label: t.registration[language], icon: icons.registration! },
    { page: 'about', label: t.about[language], icon: icons.about! },
    { page: 'login', label: t.account[language], icon: icons.login! },
  ];

  const activeIndex = navLinks.findIndex(link => link.page === activePage);

  return (
    <>
      {/* --- Top Header for All Screens --- */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 w-full z-40 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex items-center space-x-3">
                <img src="https://sisfo.bnsp.go.id/images/PtuE0H7UaNrgdBGsxMAh1FQLCK9IWVDc.png" alt="LSP Logo" className="h-10 w-auto" />
                <span className="hidden sm:block text-lg font-bold text-slate-800 dark:text-slate-200">LSP P1 SMK Dr. Soetomo</span>
              </a>
            </div>
            {/* --- Desktop Navigation --- */}
            <div className="hidden md:flex items-center">
              <nav className="flex items-baseline space-x-4">
                <NavLink page="home" activePage={activePage} navigate={navigate}>{t.home[language]}</NavLink>
                <NavLink page="schemes" activePage={activePage} navigate={navigate}>{t.schemes[language]}</NavLink>
                <NavLink page="flow" activePage={activePage} navigate={navigate}>{t.flow[language]}</NavLink>
                <NavLink page="registration" activePage={activePage} navigate={navigate}>{t.registration[language]}</NavLink>
                <NavLink page="about" activePage={activePage} navigate={navigate}>{t.about[language]}</NavLink>
                <NavLink page="login" activePage={activePage} navigate={navigate} isButton={true}>{t.login[language]}</NavLink>
              </nav>
              <div className="border-l border-slate-200 dark:border-slate-700 ml-6 pl-6 flex items-center space-x-2">
                <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle theme">
                  {theme === 'light' ? 
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> : 
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> 
                  }
                </button>
                <button onClick={() => setLanguage('id')} className={`p-1.5 rounded-full ${language === 'id' ? 'ring-2 ring-blue-500' : ''}`} aria-label="Switch to Indonesian">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-8 rounded-sm" viewBox="0 0 9 6"><rect fill="#fff" width="9" height="6"/><rect fill="#ce1126" width="9" height="3"/></svg>
                </button>
                <button onClick={() => setLanguage('en')} className={`p-1.5 rounded-full ${language === 'en' ? 'ring-2 ring-blue-500' : ''}`} aria-label="Switch to English">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-8 rounded-sm" viewBox="0 0 60 30"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>
                </button>
              </div>
            </div>
             {/* Mobile actions */}
            <div className="md:hidden flex items-center">
                 <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle theme">
                  {theme === 'light' ? 
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> : 
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> 
                  }
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Bottom Animated Navigation --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-800 h-16 shadow-[0_-4px_10px_rgba(0,0,0,0.08)] z-50 border-t dark:border-slate-700">
          <div className="absolute top-0 left-0 h-1 w-1/6 bg-blue-600 transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />
          <div className="relative flex h-full items-center">
              {navLinks.map(({ page, label, icon }) => (
                  <MobileNavLink
                      key={page}
                      page={page}
                      isActive={activePage === page}
                      navigate={navigate}
                      icon={icon}
                      label={label}
                  />
              ))}
          </div>
      </nav>
    </>
  );
};

export default Header;