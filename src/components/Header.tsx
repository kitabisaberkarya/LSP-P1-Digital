
import React from 'react';
import type { Page } from '../App';

interface HeaderProps {
  activePage: Page;
  navigate: (page: Page) => void;
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
  const activeClasses = isButton ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700';
  const inactiveClasses = isButton 
    ? 'bg-blue-600 text-white hover:bg-blue-700' 
    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900';

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
  // FIX: Specify that the icon element accepts a className prop to resolve React.cloneElement overload error.
  icon: React.ReactElement<{ className?: string }>;
  label: string;
}> = ({ page, isActive, navigate, icon, label }) => {
  const activeColor = 'text-gray-800';
  const inactiveColor = 'text-gray-600';

  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); navigate(page); }}
      className="flex-1 flex flex-col items-center justify-center h-full transition-colors duration-300 z-10 focus:outline-none"
      aria-current={isActive ? 'page' : undefined}
    >
      {React.cloneElement(icon, {
        className: `h-6 w-6 mb-0.5 transition-colors duration-300 ${
          isActive ? activeColor : inactiveColor
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


const Header: React.FC<HeaderProps> = ({ activePage, navigate }) => {
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
    { page: 'home', label: 'Beranda', icon: icons.home! },
    { page: 'schemes', label: 'Skema', icon: icons.schemes! },
    { page: 'flow', label: 'Alur', icon: icons.flow! },
    { page: 'registration', label: 'Daftar', icon: icons.registration! },
    { page: 'about', label: 'Tentang', icon: icons.about! },
    { page: 'login', label: 'Akun', icon: icons.login! },
  ];

  const activeIndex = navLinks.findIndex(link => link.page === activePage);

  return (
    <>
      {/* --- Top Header for All Screens --- */}
      {/* This header is now sticky on all screen sizes to ensure it's always visible. */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 w-full z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="flex items-center space-x-2">
                <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xl font-bold text-gray-800">LSP P1 SMK Dr. Soetomo</span>
              </a>
            </div>
            {/* --- Desktop Navigation --- */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink page="home" activePage={activePage} navigate={navigate}>Beranda</NavLink>
                <NavLink page="schemes" activePage={activePage} navigate={navigate}>Skema</NavLink>
                <NavLink page="flow" activePage={activePage} navigate={navigate}>Alur</NavLink>
                <NavLink page="registration" activePage={activePage} navigate={navigate}>Pendaftaran</NavLink>
                <NavLink page="about" activePage={activePage} navigate={navigate}>Tentang</NavLink>
                <NavLink page="login" activePage={activePage} navigate={navigate} isButton={true}>Masuk</NavLink>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Bottom Animated Navigation --- */}
      {/* 'fixed' class ensures this navigation bar stays at the bottom of the screen on mobile and does not move on scroll. */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#A3B899] h-16 shadow-[0_-4px_10px_rgba(0,0,0,0.08)] z-50 border-t border-black/5">
          <div className="absolute top-1.5 left-0 h-1.5 w-1/6 flex justify-center items-center transition-transform duration-500 transition-bounce"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
          >
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
          </div>
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
