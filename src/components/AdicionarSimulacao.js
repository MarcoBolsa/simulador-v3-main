// ARQUIVO: /src/components/AdicionarSimulacao.js (V3.27.3 - COMPLETO)

import React, { useState } from 'react';
import { Accordion } from './Accordion';
import { SubAccordion } from './SubAccordion';
import { useSimulador } from '../context/SimuladorProvider';
import { PropostaPDF } from './PropostaPDF'; // Importação do novo componente

// ... (Resto do código do AdicionarSimulacao.js, incluindo PreviewSimulacao)

// Bloco Principal
export const AdicionarSimulacao = () => {
  const { 
    form, 
    handleFormChange, 
    handlePrazoChange,
    handleFuroChange, // Handler para furo manual
    handleTaxaChange, 
    handleDescontoChange, 
    calculos, 
    adicionarSimulacao,
    limparFormulario,
    cenarios, 
    gerarDadosProposta 
  } = useSimulador();

  // NOVO ESTADO: Gerencia o modal de exportação E a renderização do PDF
  const [showModal, setShowModal] = useState(false);
  const [exportData, setExportData] = useState({});
  const [isPrinting, setIsPrinting] = useState(false); // NOVO: Controla a view de impressão

  const handleCurrencyChange = (e) => {
    // ... (função mantida)
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    handleFormChange({ target: { name: 'valorCredito', value: value } });
  };
  
  const handleSliderChange = (e) => {
     handleFormChange({ target: { name: 'lanceEmbutidoPerc', value: parseFloat(e.target.value) } });
  };
  
  const toggleTipoLance = () => {
    const novoTipo = form.tipoLance === 'parcelas' ? 'valor' : 'parcelas';
    handleFormChange({ target: { name: 'tipoLance', value: novoTipo } });
  };
  
  const handlePercentualSeguroChange = (e) => {
     let value = e.target.value.replace(/[^0-9,]/g, ''); // Permite apenas números e vírgula
     handleFormChange({ target: { name: 'percentualSeguro', value: value } });
  };
  
  // NOVO HANDLER: Geração de Proposta (Abre o modal)
  const handleGerarProposta = () => {
      try {
          const dadosExportacao = gerarDadosProposta();
          setExportData(dadosExportacao);
          setShowModal(true);
      } catch (error) {
          alert(`Erro ao gerar proposta: ${error.message}`);
      }
  };
  
  // NOVO HANDLER: Ação de Impressão (Chamado pelo Modal)
  const handlePrint = () => {
      // 1. Prepara a view para impressão (esconde outros elementos da tela)
      setIsPrinting(true);
      setShowModal(false);
      
      // 2. Renomeia o título do documento (opcional, mas bom para o nome do PDF)
      const oldTitle = document.title;
      document.title = `Proposta ${exportData.dadosIniciais.nomeCliente || 'Cliente'} - ${exportData.dataGeracao}`;

      // 3. Aciona a impressão do navegador
      setTimeout(() => {
          window.print();
          
          // 4. Retorna ao estado normal após a impressão/cancelamento
          document.title = oldTitle;
          setIsPrinting(false);
      }, 500); // Pequeno delay para garantir que o DOM seja renderizado
  };


  if (isPrinting) {
      // Se estiver no modo de impressão, renderiza apenas o documento PDF
      return <PropostaPDF dados={exportData} />;
  }

  return (
    <Accordion titulo="Adicionar Simulação" icon="simulacao" comecaAberto={true}>
      
      {/* ... (Todo o corpo do formulário permanece aqui) ... */}
      
      {/* --- BOTÕES DE AÇÃO --- */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between gap-4">
        <button 
            className="btn-primary w-full"
            onClick={adicionarSimulacao}
            disabled={!!calculos.alertaFuro}
        >
            Adicionar Simulação
        </button>
        
        {/* BOTÃO: Gerar Proposta */}
        <button 
            className="btn bg-red-600 text-white hover:bg-red-700"
            onClick={handleGerarProposta}
            disabled={cenarios.length === 0} // Desabilita se não houver cenários
        >
            Gerar Proposta
        </button>
        
        <button 
            className="btn-secondary"
            onClick={limparFormulario}
        >
            Limpar
        </button>
      </div>

      {/* --- MODAL DE EXPORTAÇÃO (V3.27.2) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Proposta Gerada</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">A proposta foi estruturada e está pronta para ser exportada. Escolha o formato:</p>
            
            <div className="w-full">
                <button 
                    onClick={handlePrint}
                    className="btn-primary w-full text-lg mb-3"
                >
                    Imprimir / Gerar PDF
                </button>
                <p className="text-xs text-gray-500 text-center mb-4">
                    Isso abrirá a caixa de diálogo de impressão do seu navegador.
                </p>
                <div className="border-t pt-3">
                    <button 
                        onClick={() => { navigator.clipboard.writeText(JSON.stringify(exportData, null, 2)); alert('Dados JSON copiados para a área de transferência!'); }}
                        className="text-sm btn-secondary w-full"
                    >
                        Copiar Dados JSON Brutos
                    </button>
                </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="btn-secondary">
                    Fechar
                </button>
            </div>
          </div>
        </div>
      )}

    </Accordion>
  );
};
