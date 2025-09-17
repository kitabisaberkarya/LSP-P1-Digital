import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 flex items-start space-x-4">
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${color.replace('text', 'bg')}/10`}>
        {React.cloneElement(icon, { className: `w-6 h-6 ${color}` })}
      </div>
      <div className="flex-1">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;