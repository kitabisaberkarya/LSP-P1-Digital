
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold">LSP P1 SMK DR. SOETOMO SURABAYA</h3>
            <p className="mt-2 text-gray-400">
              Lembaga Sertifikasi Profesi Pihak Pertama untuk siswa/i SMK sesuai standar kompetensi kerja BNSP.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Kontak Kami</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                <span>info@lspsmkdrsoetomo.sch.id</span>
              </li>
              <li className="flex items-center">
                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                <span>(021) 123-4567</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Ikuti Kami</h3>
            <div className="flex mt-2 space-x-4">
              {/* Placeholder icons */}
              <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Facebook</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
              <a href="#" className="text-gray-400 hover:text-white"><span className="sr-only">Instagram</span><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.006 1.485c-1.064-.048-1.579-.208-2.008-.372a3.41 3.41 0 00-1.22.766 3.41 3.41 0 00-.766 1.22c-.164.429-.324.944-.372 2.008-.048 1.009-.06 1.344-.06 3.52s.012 2.51.06 3.52c.048 1.064.208 1.579.372 2.008.164.429.387.82.766 1.22a3.41 3.41 0 001.22.766c.429.164.944.324 2.008.372 1.009.048 1.344.06 3.52.06s2.51-.012 3.52-.06c1.064-.048 1.579-.208 2.008-.372a3.41 3.41 0 001.22-.766 3.41 3.41 0 00.766-1.22c.164-.429.324-.944.372-2.008.048-1.009.06-1.344.06-3.52s-.012-2.51-.06-3.52c-.048-1.064-.208-1.579-.372-2.008a3.41 3.41 0 00-.766-1.22 3.41 3.41 0 00-1.22-.766c-.429-.164-.944-.324-2.008-.372C14.826 3.495 14.49 3.485 12.315 3.485zm-1.006 2.768a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM12 15a3 3 0 110-6 3 3 0 010 6zm3.315-9.315a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" clipRule="evenodd" /></svg></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LSP P1 SMK DR. SOETOMO SURABAYA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
