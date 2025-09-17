import React, { useState } from 'react';
import type { CertificationScheme } from '../types';
import type { Page, Language } from '../App';
import { translations } from '../translations';

interface SchemeCardProps {
  scheme: CertificationScheme;
  navigate: (page: Page) => void;
  language: Language;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, navigate, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = translations.schemes;

  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-700 p-6 text-blue-500 flex items-center justify-center">
        <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{scheme.title}</h3>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">{scheme.description}</p>
        </div>
        
        <div className="mt-4">
            {scheme.units && scheme.units.length > 0 && (
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex justify-between items-center py-2"
                aria-expanded={isExpanded}
            >
                <span>{isExpanded ? t.hideUnits[language] : t.showUnits[language]}</span>
                <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            )}
        </div>

        {isExpanded && scheme.units && (
            <div className="mt-2 border-t border-slate-200 dark:border-slate-700 pt-4">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{t.competencyUnits[language]}</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 max-h-48 overflow-y-auto pr-2">
                    {scheme.units.map(unit => (
                    <li key={unit.code}>
                        <span className="font-bold">{unit.code}</span> - {unit.name}
                    </li>
                    ))}
                </ul>
            </div>
        )}

        <div className="mt-6 flex-grow flex items-end">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('registration');
            }}
            className="w-full inline-block text-center bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/80 transition-colors"
          >
            {t.registerThisScheme[language]}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;