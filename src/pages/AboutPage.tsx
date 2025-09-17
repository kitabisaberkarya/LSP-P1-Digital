

import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Tentang Kami</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Mengenal LSP P1 Digital
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Kami adalah lembaga yang berkomitmen untuk meningkatkan kualitas dan daya saing lulusan SMK melalui sertifikasi profesi yang terpercaya.
          </p>
        </div>

        <div className="mt-16 text-lg text-gray-700 space-y-8 max-w-4xl mx-auto">
          <div className="relative">
            <img className="w-full h-64 object-cover rounded-xl shadow-lg" src="https://picsum.photos/1200/400?random=2" alt="Team working" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Visi Kami</h3>
            <p>
              Menjadi Lembaga Sertifikasi Profesi pihak pertama yang unggul, profesional, dan terpercaya dalam menghasilkan lulusan SMK yang kompeten dan berdaya saing global sesuai dengan standar industri dan Kerangka Kualifikasi Nasional Indonesia (KKNI).
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Misi Kami</h3>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Melaksanakan sertifikasi kompetensi kerja secara profesional, independen, dan tidak memihak.</li>
              <li>Mengembangkan skema sertifikasi yang relevan dengan kebutuhan industri digital dan dunia usaha.</li>
              <li>Menjamin mutu pelaksanaan uji kompetensi melalui penggunaan asesor yang kompeten dan Tempat Uji Kompetensi (TUK) yang terverifikasi.</li>
              <li>Membangun jejaring dan kerjasama dengan dunia industri untuk memastikan keselarasan antara kompetensi lulusan dengan kebutuhan pasar kerja.</li>
              <li>Secara berkelanjutan meningkatkan kualitas sistem manajemen mutu LSP sesuai dengan pedoman BNSP.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Dasar Hukum</h3>
            <p>
              LSP P1 Digital didirikan dan beroperasi berdasarkan lisensi dari Badan Nasional Sertifikasi Profesi (BNSP) dan mematuhi semua peraturan perundang-undangan yang berlaku di Indonesia terkait sistem sertifikasi kompetensi kerja. Kami berkomitmen penuh untuk menjaga integritas dan kredibilitas setiap sertifikat yang kami terbitkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;