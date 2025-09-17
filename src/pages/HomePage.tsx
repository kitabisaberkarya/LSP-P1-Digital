import React from 'react';
import type { Page, Language } from '../App';
import type { CertificationScheme } from '../types';
import SchemeCard from '../components/SchemeCard';
import { schemesData } from '../constants';
import { translations } from '../translations';

interface HomePageProps {
  navigate: (page: Page) => void;
  language: Language;
}

const HeroSection: React.FC<{ navigate: (page: Page) => void; language: Language }> = ({ navigate, language }) => {
  const t = translations.home;
  return (
    <div className="relative bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-slate-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-slate-900 transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">{t.heroTitle1[language]}</span>{' '}
                <span className="block text-blue-600 dark:text-blue-500 xl:inline">{t.heroTitle2[language]}</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 dark:text-slate-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {t.heroSubtitle[language]}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('registration'); }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                    {t.registerNow[language]}
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('schemes'); }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/50 dark:hover:bg-blue-900/80 md:py-4 md:text-lg md:px-10">
                    {t.viewSchemes[language]}
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" alt="Students learning" />
      </div>
    </div>
  );
}

const ProfileSnippet: React.FC<{ language: Language }> = ({ language }) => {
    const t = translations.home;
    return (
        <div className="py-16 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            LSP P1 SMK Dr. Soetomo Surabaya
                        </h2>
                        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
                            {t.aboutTitle[language]}
                        </p>
                        <dl className="mt-6 space-y-3 text-sm">
                            <div className="flex"><dt className="w-40 font-medium text-slate-500 dark:text-slate-400 shrink-0">No. SK Lisensi</dt><dd className="text-slate-900 dark:text-slate-200">: KEP.0933/BNSP/IV/2025</dd></div>
                            <div className="flex"><dt className="w-40 font-medium text-slate-500 dark:text-slate-400 shrink-0">No Lisensi</dt><dd className="text-slate-900 dark:text-slate-200">: BNSP-LSP-1279-ID</dd></div>
                            <div className="flex"><dt className="w-40 font-medium text-slate-500 dark:text-slate-400 shrink-0">Status Lisensi</dt><dd className="text-slate-900 dark:text-slate-200">: <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Aktif</span></dd></div>
                            <div className="flex"><dt className="w-40 font-medium text-slate-500 dark:text-slate-400 shrink-0">Alamat</dt><dd className="text-slate-900 dark:text-slate-200">: JL. Karang Menjangan - Jojoran IV/ 2D Surabaya</dd></div>
                        </dl>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Overview</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Tempat Uji Kompetensi (TUK)</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">1</p>
                            </div>
                            <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Skema Sertifikasi</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">12</p>
                            </div>
                            <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">Asesor Kompetensi</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">17</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const BenefitsSection: React.FC<{ language: Language }> = ({ language }) => {
    const t = translations.home;
    const benefits = [
        { name: t.benefit1Title[language], description: t.benefit1Desc[language], icon: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>) },
        { name: t.benefit2Title[language], description: t.benefit2Desc[language], icon: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>) },
        { name: t.benefit3Title[language], description: t.benefit3Desc[language], icon: (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 011.022-.547z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8a4 4 0 100-8 4 4 0 000 8z" /></svg>) }
    ]

    return (
        <div className="py-12 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-blue-600 dark:text-blue-500 font-semibold tracking-wide uppercase">{t.whyCertify[language]}</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                        {t.whySubtitle[language]}
                    </p>
                </div>
                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                        {benefits.map((benefit) => (
                            <div key={benefit.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <benefit.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-slate-900 dark:text-white">{benefit.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-500 dark:text-slate-400">{benefit.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

const FeaturedSchemes: React.FC<{ navigate: (page: Page) => void; language: Language }> = ({ navigate, language }) => {
    const t = translations.home;
    const schemes: CertificationScheme[] = schemesData.slice(0, 3);

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t.featuredSchemes[language]}</h2>
                    <p className="mt-4 text-xl text-slate-500 dark:text-slate-400">
                        {t.featuredSchemesDesc[language]}
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {schemes.map(scheme => (
                        <SchemeCard key={scheme.id} scheme={scheme} navigate={navigate} language={language} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('schemes'); }} className="text-lg font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">
                        {t.viewAllSchemes[language]} &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};

const HomePage: React.FC<HomePageProps> = ({ navigate, language }) => {
  return (
    <div>
      <HeroSection navigate={navigate} language={language} />
      <ProfileSnippet language={language} />
      <BenefitsSection language={language} />
      <FeaturedSchemes navigate={navigate} language={language} />
    </div>
  );
};

export default HomePage;