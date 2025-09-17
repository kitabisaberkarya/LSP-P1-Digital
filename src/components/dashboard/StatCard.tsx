import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className={`relative ${color} text-white p-4 rounded-lg shadow-md overflow-hidden h-32 flex flex-col justify-between`}>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="mt-1 text-sm">{title}</p>
      </div>
      <div className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-20 text-white z-0">
        {React.cloneElement(icon, { className: "w-24 h-24" })}
      </div>
      <a href="#" className="relative z-10 bg-black/20 hover:bg-black/30 text-center py-1 text-xs font-medium rounded-sm transition-colors mt-2">
        Lihat data <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  );
};

export default StatCard;