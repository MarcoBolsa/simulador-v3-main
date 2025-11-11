import React from 'react';
import { useSimulador } from '../context/SimuladorProvider';

export const Header = () => {
  const { limparTudo } = useSimulador(); 

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg print:hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Simulador de Consórcio Estratégico</h1>
          <p className="text-lg opacity-90">Crie e compare cenários de crédito para seus clientes.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white">
            Exportar
          </button>
          <button className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white">
            Importar
          </button>
          <button 
            onClick={limparTudo} 
            className="btn bg-red-600 hover:bg-red-700 text-white"
          >
            Limpar Tudo
          </button>
        </div>
      </div>
    </header>
  );
};
