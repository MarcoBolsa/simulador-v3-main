/*
 * ARQUIVO: /src/App.js (V3.0)
 */
import React from 'react';
import { SimuladorProvider } from './context/SimuladorProvider';
import { Header } from './components/Header';
import { DadosProposta } from './components/DadosProposta';
import { AdicionarSimulacao } from './components/AdicionarSimulacao';
import { SimulacoesCriadas } from './components/SimulacoesCriadas';

function App() {
  return (
    <SimuladorProvider>
      <div className="min-h-screen">
        
        {/* CABEÇALHO ROXO */}
        <Header />
        
        {/* Container principal */}
        <div className="max-w-7xl mx-auto p-4 md:p-8 -mt-16">
          <main className="flex flex-col gap-6">
            
            {/* Bloco 1: Dados da Proposta */}
            <DadosProposta />
            
            {/* Bloco 2: Adicionar Simulação */}
            <AdicionarSimulacao />
            
            {/* Bloco 3: Simulações Criadas */}
            <SimulacoesCriadas />

          </main>
        </div>
      </div>
    </SimuladorProvider>
  );
}

export default App;
