/*
 * ARQUIVO: /src/components/SubAccordion.js (O ARQUIVO FALTANTE)
 *
 * O QUE FAZ:
 * Este é o "Bloco Sanfona" de Nível 2 para as seções internas
 * (DADOS DO GRUPO, PAGAMENTO, LANCE, AVANÇADO)
 */

import React, { useState } from 'react';

// 'IconeSeta' é o sub-bloco da seta para abrir/fechar
const IconeSeta = ({ estaAberto }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${estaAberto ? '' : '-rotate-90'}`}>
    <path d="M15 7.5L10 12.5L5 7.5" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SubAccordion = ({ titulo, children }) => {
  const [estaAberto, setEstaAberto] = useState(true); // Começa aberto por padrão

  return (
    <div className="mt-6">
      <button
        className="flex justify-between items-center w-full pb-2 border-b-2 border-gray-200"
        onClick={() => setEstaAberto(!estaAberto)}
      >
        <h3 className="text-xs font-bold text-gray-500 uppercase">{titulo}</h3>
        <IconeSeta estaAberto={estaAberto} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${estaAberto ? 'max-h-[1000px] opacity-100 pt-4' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};
