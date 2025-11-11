import React, { useState } from 'react';

const IconDoc = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> <path d="M16 13H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> <path d="M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconAdd = () => (
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
    <path d="M12 9V15M9 12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconeSeta = ({ estaAberto }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${estaAberto ? '' : '-rotate-90'}`}>
    <path d="M15 7.5L10 12.5L5 7.5" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Accordion = ({ titulo, icon, comecaAberto = false, children }) => {
  const [estaAberto, setEstaAberto] = useState(comecaAberto);

  const getIcon = () => {
    if (icon === 'proposta') return <IconDoc />;
    if (icon === 'simulacao') return <IconAdd />;
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 print:hidden">
      <button
        className="flex justify-between items-center w-full p-6 cursor-pointer"
        onClick={() => setEstaAberto(!estaAberto)}
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <h2 className="text-xl font-bold text-gray-800">{titulo}</h2>
        </div>
        <IconeSeta estaAberto={estaAberto} />
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${estaAberto ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pt-0 p-6 border-t border-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};
