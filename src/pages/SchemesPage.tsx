import React from 'react';
import type { Page } from '../App';
import SchemeCard from '../components/SchemeCard';
import { schemesData } from '../constants';
import type { CertificationScheme } from '../types';

interface SchemesPageProps {
  navigate: (page: Page) => void;
}

const SchemesPage: React.FC<SchemesPageProps> = ({ navigate }) => {
  const schemes: CertificationScheme[] = schemesData;

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Skema Sertifikasi Profesi</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            Pilih skema sertifikasi yang paling sesuai dengan minat dan bakat Anda untuk mempersiapkan karir di dunia industri.
          </p>
        </div>
        <div className="mt-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {schemes.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} navigate={navigate} />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SchemesPage;