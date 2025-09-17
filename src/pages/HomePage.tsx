
import React, { useState, useEffect } from 'react';
import type { Page } from '../App';
import type { CertificationScheme } from '../types';
import { supabase } from '../lib/supabaseClient';
import SchemeCard from '../components/SchemeCard';

interface HomePageProps {
  navigate: (page: Page) => void;
}

const HeroSection: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => (
  <div className="relative bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Sertifikasi Profesi</span>{' '}
              <span className="block text-blue-600 xl:inline">Era Digital</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Tunjukkan kompetensi dan keahlianmu di dunia kerja dengan sertifikasi resmi dari BNSP melalui LSP P1 Digital sekolahmu.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('registration'); }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Daftar Sekarang
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('schemes'); }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                  Lihat Skema
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://picsum.photos/1000/800?random=1" alt="Students learning" />
    </div>
  </div>
);

const AboutSnippet: React.FC = () => (
    <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Tentang Kami</h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    Lembaga Sertifikasi Profesi Pihak Pertama
                </p>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    LSP P1 SMK DR. SOETOMO SURABAYA didirikan oleh sekolah untuk memastikan setiap siswa memiliki bukti kompetensi yang diakui secara nasional oleh BNSP, membuka gerbang menuju karir profesional.
                </p>
            </div>
        </div>
    </div>
);

const BenefitsSection: React.FC = () => {
    const benefits = [
        {
            name: 'Pengakuan Nasional',
            description: 'Sertifikat yang diterbitkan diakui di seluruh Indonesia sebagai bukti kompetensi yang sah.',
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            )
        },
        {
            name: 'Keunggulan Kompetitif',
            description: 'Meningkatkan daya saing lulusan di pasar kerja dengan bukti keahlian yang terstandarisasi.',
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            )
        },
        {
            name: 'Standar Industri',
            description: 'Materi uji kompetensi disusun berdasarkan kebutuhan dan standar industri terkini.',
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l.477-2.387a2 2 0 011.022-.547z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8a4 4 0 100-8 4 4 0 000 8z" /></svg>
            )
        }
    ]

    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Mengapa Sertifikasi Penting?</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Investasi untuk Masa Depan Profesional Anda
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
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{benefit.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">{benefit.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

const FeaturedSchemes: React.FC<{ navigate: (page: Page) => void }> = ({ navigate }) => {
    const [schemes, setSchemes] = useState<CertificationScheme[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchemes = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('schemes')
                .select('id, title, description')
                .limit(3);

            if (error) {
                console.error('Error fetching schemes:', error);
            } else {
                setSchemes(data || []);
            }
            setLoading(false);
        };

        fetchSchemes();
    }, []);

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Skema Sertifikasi Unggulan</h2>
                    <p className="mt-4 text-xl text-gray-500">
                        Beberapa skema populer yang paling diminati oleh industri saat ini.
                    </p>
                </div>
                {loading ? (
                    <div className="text-center text-gray-500">Memuat skema...</div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {schemes.map(scheme => (
                            <SchemeCard key={scheme.id} scheme={scheme} navigate={navigate} />
                        ))}
                    </div>
                )}
                <div className="mt-12 text-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('schemes'); }} className="text-lg font-semibold text-blue-600 hover:text-blue-800">
                        Lihat Semua Skema &rarr;
                    </a>
                </div>
            </div>
        </div>
    );
};


const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div>
      <HeroSection navigate={navigate} />
      <AboutSnippet />
      <BenefitsSection />
      <FeaturedSchemes navigate={navigate} />
    </div>
  );
};

export default HomePage;
