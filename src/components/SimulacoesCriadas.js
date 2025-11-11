// ARQUIVO: /src/components/SimulacoesCriadas.js (V3.27.1 - COMPLETO)

import React from 'react';
import { useSimulador } from '../context/SimuladorProvider';
import { CenarioCard } from './CenarioCard';

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

// Componente helper simples para o total
const TotalCard = ({ titulo, valor, cor }) => (
    <div className="flex flex-col">
        <span className="text-xs font-medium uppercase text-gray-500">{titulo}</span>
        <span className={`text-lg font-extrabold ${cor}`}>{formatCurrency(valor)}</span>
    </div>
);


export const SimulacoesCriadas = () => {
  // NOVO: Importando totalGeral
  const { cenarios, totalGeral } = useSimulador();

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
      
      {/* NOVO BLOCO DE RESUMO DO ORÇAMENTO */}
      <div className="space-y-4 mb-6 p-4 border rounded-lg bg-indigo-50">
        <h3 className="text-lg font-bold text-gray-800">Resumo Total do Orçamento</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <TotalCard titulo="Crédito Líquido Total" valor={totalGeral.creditoLiquidoTotal} cor="text-green-700" />
            <TotalCard titulo="Lance Bolso Total" valor={totalGeral.lanceBolsoTotal} cor="text-orange-700" />
            <TotalCard titulo="Lance Total (R$)" valor={totalGeral.lanceTotalGeral} cor="text-purple-700" />
            <TotalCard titulo="Parcela Pré Total" valor={totalGeral.parcelaPreTotal} cor="text-gray-700" />
            <TotalCard titulo="Parcela Pós Total" valor={totalGeral.parcelaPosTotal} cor="text-blue-700" />
        </div>
      </div>
      {/* FIM DO BLOCO DE RESUMO */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cenarios.map(cenario => (
          <CenarioCard key={cenario.id} cenario={cenario} />
        ))}
      </div>
    </section>
  );
};
