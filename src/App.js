/*
 * ARQUIVO: /src/App.js (V3.27.5 - IMPLEMENTAÇÃO DO HANDLER DE IMPRESSÃO ROOT)
 */
import React, { useState } from 'react';
import { SimuladorProvider } from './context/SimuladorProvider';
import { Header } from './components/Header';
import { DadosProposta } from './components/DadosProposta';
import { AdicionarSimulacao } from './components/AdicionarSimulacao';
import { SimulacoesCriadas } from './components/SimulacoesCriadas';
import { PropostaPDF } from './components/PropostaPDF'; // Importamos o componente PDF

function App() {
  // NOVO ESTADO: Controla a view de impressão e os dados a serem impressos
  const [isPrinting, setIsPrinting] = useState(false);
  const [propostaDados, setPropostaDados] = useState(null);

  // HANDLER GLOBAL DE IMPRESSÃO (Recebe os dados do AdicionarSimulacao)
  const handleGlobalPrint = (data) => {
      setPropostaDados(data);
      setIsPrinting(true);
      
      const oldTitle = document.title;
      document.title = `Proposta ${data.dadosIniciais.nomeCliente || 'Cliente'} - ${data.dataGeracao}`;

      // Aciona o print após a renderização (pequeno delay)
      setTimeout(() => {
          window.print();
          
          // Restaura o estado e o título após a impressão
          document.title = oldTitle;
          setIsPrinting(false);
          setPropostaDados(null);
      }, 500); 
  };
  
  // Expor o handler globalmente (Necessário para o AdicionarSimulacao chamá-lo)
  window.handleGlobalPrint = handleGlobalPrint;

  // 1. Renderização Condicional: Se isPrinting for true, renderiza SOMENTE o PDF
  if (isPrinting && propostaDados) {
      return <PropostaPDF dados={propostaDados} />;
  }

  // 2. Renderização Normal
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
