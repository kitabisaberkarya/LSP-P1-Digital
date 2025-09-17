import React from 'react';
import type { Page, Language } from '../App';
import SchemeCard from '../components/SchemeCard';
import { schemesData } from '../constants';
import type { CertificationScheme } from '../types';
import { translations } from '../translations';

interface SchemesPageProps {
  navigate: (page: Page) => void;
  language: Language;
}

const SchemesPage: React.FC<SchemesPageProps> = ({ navigate, language }) => {
  const schemes: CertificationScheme[] = schemesData;
  const t = translations.schemes;

  return (
    <div className="bg-white dark:bg-slate-900 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">{t.pageTitle[language]}</h1>
          <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
            {t.pageSubtitle[language]}
          </p>
        </div>
        <div className="mt-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {schemes.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} navigate={navigate} language={language} />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SchemesPage;