import React from 'react';
import { useSimulador } from '../context/SimuladorProvider';
import { CenarioCard } from './CenarioCard';

export const SimulacoesCriadas = () => {
  const { cenarios } = useSimulador();

  if (cenarios.length === 0) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
        <h3 className="text-xl font-medium text-gray-700">Nenhum cenário criado</h3>
        <p className="text-gray-500">Preencha o formulário acima e clique em "Adicionar Simulação" para começar.</p>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">📊 Simulações Criadas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cenarios.map(cenario => (
          <CenarioCard key={cenario.id} cenario={cenario} />
        ))}
      </div>
    </section>
  );
};
