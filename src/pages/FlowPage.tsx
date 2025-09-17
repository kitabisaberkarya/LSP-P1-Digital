
import React from 'react';

const FlowPage: React.FC = () => {

  const FlowStep = ({ title, description, isDecision = false, isValid = false }: { title: string; description?: string; isDecision?: boolean; isValid?: boolean }) => {
    const baseClasses = "relative bg-white p-4 border border-gray-300 rounded-md shadow-sm w-full text-center";
    const decisionClasses = isDecision ? "transform -rotate-45 w-40 h-40 flex items-center justify-center p-2" : "";
    const decisionTextClasses = isDecision ? "transform rotate-45" : "";

    return (
      <div className={`${baseClasses} ${decisionClasses}`}>
        <div className={decisionTextClasses}>
          <h4 className="font-bold text-sm text-gray-800">{title}</h4>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
        {isDecision && (
             <>
                <div className="absolute top-1/2 -right-12 text-sm font-bold text-red-600">Tidak</div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-green-600">Ya</div>
             </>
        )}
      </div>
    );
  };
  
  const Arrow = ({ direction, className }: { direction: 'down' | 'right' | 'left-down' | 'up-right' ; className?: string }) => {
    const classes = {
        down: "w-px h-12 bg-gray-400 after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-l-4 after:border-r-4 after:border-t-8 after:border-l-transparent after:border-r-transparent after:border-t-gray-500",
        right: "h-px w-16 bg-gray-400 after:content-[''] after:absolute after:top-1/2 after:-right-2 after:-translate-y-1/2 after:border-t-4 after:border-b-4 after:border-l-8 after:border-t-transparent after:border-b-transparent after:border-l-gray-500",
        'left-down': 'h-16 w-16 border-b border-l border-gray-400 rounded-bl-xl',
        'up-right': 'absolute h-48 w-12 border-t border-r border-gray-400 rounded-tr-xl',
    }
    return <div className={`relative ${classes[direction]} ${className}`}></div>;
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Proses Pendaftaran Asesmen Uji Kompetensi</h1>
          <p className="mt-4 text-xl text-gray-500">Alur proses dari pendaftaran hingga penerbitan sertifikat kompetensi.</p>
        </div>

        <div className="grid grid-cols-4 gap-x-8">
          {/* Column Headers */}
          {['Calon Asesi', 'Asesi Terdaftar', 'Administrator', 'Asesor'].map(role => (
            <div key={role} className="text-center pb-4 border-b-2 border-blue-600 mb-8">
              <h3 className="text-lg font-bold text-blue-700">{role}</h3>
            </div>
          ))}

          {/* Flow Steps Grid */}
          {/* Row 1 */}
          <div className="flex flex-col items-center"><FlowStep title="Akses Portal Online" description="http://batik.silsp.online" /></div>
          <div></div>
          <div></div>
          <div></div>

          {/* Arrow */}
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div></div>
          <div></div>
          <div></div>

           {/* Row 2 */}
          <div className="flex flex-col items-center"><FlowStep title="Data Pendaftaran" /></div>
          <div className="flex flex-col items-center self-start relative pt-20"><Arrow direction="up-right" className="-top-20 -left-6" /> <FlowStep title="Data Profil dan Dokumen Pokok" /></div>
          <div></div>
          <div></div>
          
           {/* Arrow */}
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div></div>
          <div></div>
          
           {/* Row 3 */}
          <div className="flex flex-col items-center"><FlowStep title="Terdaftar dan memperoleh Akun" description="(Username & Password)" /></div>
          <div className="flex flex-col items-center"><FlowStep isDecision title="Lengkap & Valid?" /></div>
          <div className="flex flex-col items-center"><FlowStep title="Verifikasi Pendaftaran Asesmen" /></div>
          <div></div>
          
           {/* Arrow from Decision */}
          <div></div>
          <div className="flex justify-start relative"><Arrow direction="left-down" className="ml-2 mt-4" /><span className="absolute top-0 -left-10 text-sm font-bold text-red-600">Tidak</span></div>
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div></div>

           {/* Row 4 */}
          <div className="col-start-2 flex flex-col items-center"><FlowStep title="Pendaftaran Asesmen Skema" /></div>
          <div className="flex flex-col items-center"><FlowStep title="Validasi Pembayaran Biaya Asesmen" /></div>
          <div></div>

           {/* Arrow */}
          <div></div>
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div className="flex flex-col items-center self-start relative pt-20"><Arrow direction="up-right" className="-top-20 -left-6" /></div>

           {/* Row 5 */}
          <div className="col-start-2 flex flex-col items-center"><FlowStep title="Pembayaran Biaya Asesmen" /></div>
          <div className="flex flex-col items-center"><FlowStep isDecision title="Pembayaran Valid?" /></div>
          <div className="flex flex-col items-center self-end relative"><FlowStep title="Validasi oleh Asesor dan Pelaksanaan Asesmen" /><Arrow direction="right" className="absolute top-1/2 -right-16 -translate-y-1/2" /></div>
          
           {/* Row 6 */}
          <div></div>
          <div></div>
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div></div>
          
           {/* Row 7 */}
          <div className="col-start-2 flex flex-col items-center"><FlowStep title="Notifikasi Jadwal Asesmen" /></div>
          <div className="flex flex-col items-center"><FlowStep title="Plotting Jadwal Asesmen" /></div>
          <div className="col-start-4 flex flex-col items-center"><FlowStep title="Data Hasil Asesmen" /></div>
          
           {/* Arrow */}
          <div></div>
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div></div>
          <div className="flex justify-center"><Arrow direction="down" /></div>
          
           {/* Row 8 */}
          <div className="col-start-2 flex flex-col items-center"><FlowStep title="Asesmen Mandiri" /></div>
          <div></div>
          <div className="flex flex-col items-center"><FlowStep title="Pengolahan Data" /></div>
          
           {/* Arrow */}
          <div></div>
          <div className="flex justify-center"><Arrow direction="down" /></div>
          <div></div>
          <div className="flex justify-center"><Arrow direction="left-down" className="ml-24" /></div>

           {/* Row 9 */}
          <div className="col-start-2 flex flex-col items-center"><FlowStep title="Laporan / Sertifikat Kompetensi" /></div>
          <div></div>
          <div></div>

        </div>
      </div>
    </div>
  );
};

export default FlowPage;