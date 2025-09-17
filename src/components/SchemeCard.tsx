import React, { useState } from 'react';
import type { CertificationScheme } from '../types';
import type { Page } from '../App';

interface SchemeCardProps {
  scheme: CertificationScheme;
  navigate: (page: Page) => void;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, navigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="flex-shrink-0 bg-blue-500 p-6 text-white flex items-center justify-center">
        {/* Generic Icon as placeholder */}
        <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{scheme.title}</h3>
          <p className="mt-3 text-base text-gray-500">{scheme.description}</p>
        </div>
        
        <div className="mt-4">
            {scheme.units && scheme.units.length > 0 && (
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left text-sm font-semibold text-blue-600 hover:text-blue-800 flex justify-between items-center py-2"
                aria-expanded={isExpanded}
            >
                <span>{isExpanded ? 'Sembunyikan' : 'Tampilkan'} Unit Kompetensi</span>
                <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            )}
        </div>

        {isExpanded && scheme.units && (
            <div className="mt-2 border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Unit Kompetensi:</h4>
                <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5 max-h-48 overflow-y-auto pr-2">
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
            className="w-full inline-block text-center bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Daftar Skema Ini
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
