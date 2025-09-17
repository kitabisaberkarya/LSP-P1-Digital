
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  linkText?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, linkText = "Lihat data" }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-shrink-0">{icon}</div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        </div>
      </div>
      <a href="#" className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
        {linkText} &rarr;
      </a>
    </div>
  );
};

export default StatCard;