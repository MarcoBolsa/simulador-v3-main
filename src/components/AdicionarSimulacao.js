/*
 * ARQUIVO: /src/components/AdicionarSimulacao.js (VERSÃO 3.26.10 - BOTÃO DE PROPOSTA)
 *
 * NOVAS FUNCIONALIDADES:
 * 1. Adicionado o botão "Gerar Proposta" na seção de Ações.
 */
import React from 'react';
import { Accordion } from './Accordion';
import { SubAccordion } from './SubAccordion';
import { useSimulador } from '../context/SimuladorProvider';

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

// --- Sub-Bloco: O Preview Roxo ---
const PreviewSimulacao = () => {
  const { preview, calculos } = useSimulador(); // Pega o 'calculos' para o alerta

  // Mensagem de Erro ou Carregando
  if (calculos.alertaFuro || !preview) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg opacity-70">
        <p className="text-center font-medium">
          {calculos.alertaFuro ? `⚠️ ${calculos.alertaFuro}` : "Preencha os dados para ver o preview."}
        </p>
      </div>
    );
  }

  // Mostra o preview formatado
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        {/* Crédito Contratado */}
        <div className="flex flex-col h-full">
          <label className="text-xs uppercase opacity-70">Crédito Contratado</label>
          <p className="text-lg md:text-2xl font-bold mt-auto">{formatCurrency(preview.creditoContratado)}</p>
        </div>
        {/* Crédito Líquido */}
        <div className="flex flex-col h-full">
          <label className="text-xs uppercase opacity-70">Crédito Líquido</label>
          <p className="text-lg md:text-2xl font-bold mt-auto">{formatCurrency(preview.creditoLiquido)}</p>
        </div>
        {/* Parcela Pré */}
        <div className="flex flex-col h-full">
          <label className="text-xs uppercase opacity-70">Parcela Pré</label>
          <p className="text-lg md:text-2xl font-bold">{formatCurrency(preview.parcelaPre.valor)}</p>
          {/* CORREÇÃO V3.12: Mostra os detalhes e parcelas restantes */}
          <p className="text-xs opacity-80" title={preview.parcelaPre.detalhes}>{preview.parcelaPre.detalhes}</p>
          <p className="text-xs opacity-80">📊 {preview.parcelaPre.parcelasRestantes} parcelas restantes</p>
        </div>
        {/* Lance Bolso */}
        <div className="flex flex-col h-full">
          <label className="text-xs uppercase opacity-70">Lance Bolso</label>
          <p className="text-lg md:text-2xl font-bold">{formatCurrency(preview.lanceBolso)}</p>
          <p className="text-xs opacity-80">🎯 {((preview.lanceBolso / (preview.creditoLiquido || 1)) * 100).toFixed(1)}% do líquido</p>
        </div>
        {/* Parcela Pós */}
        <div className="flex flex-col h-full">
          <label className="text-xs uppercase opacity-70">Parcela Pós</label>
          <p className="text-lg md:text-2xl font-bold">{formatCurrency(preview.parcelaPos.valor)}</p>
           {/* CORREÇÃO V3.12: Mostra os detalhes e parcelas restantes */}
           <p className="text-xs opacity-80" title={preview.parcelaPos.detalhes}>{preview.parcelaPos.detalhes}</p>
           <p className="text-xs opacity-80">📊 {preview.parcelaPos.parcelasRestantes} parcelas restantes</p>
        </div>
      </div>
      <p className="text-center text-sm mt-4 text-green-300 font-medium">
        ✓ Simulação válida
      </p>
    </div>
  );
};


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
    cenarios // Para verificar se há cenários e habilitar o botão
  } = useSimulador();

  const handleCurrencyChange = (e) => {
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
  
  // NOVO HANDLER: Geração de Proposta
  const handleGerarProposta = () => {
      // Implementação futura de coleta de dados e geração de PDF/e-mail
      alert("Módulo de Geração de Proposta ativado. Próxima etapa: Desenvolver a exportação.");
  };

  return (
    <Accordion titulo="Adicionar Simulação" icon="simulacao" comecaAberto={true}>
      
      {/* --- Dados Principais --- */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produto</label>
            <select name="produto" value={form.produto} onChange={handleFormChange} className="form-input">
              <option>Imóvel</option>
              <option>Veículo</option>
              <option>Caminhão</option>
              <option>Serviço</option>
              <option>Outros</option>
            </select>
          </div>
          {form.produto === 'Outros' && (
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Especifique</label>
              <input type="text" name="produtoOutros" onChange={handleFormChange} placeholder="Ex: Trator" className="form-input" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grupo nº</label>
            <input type="text" name="grupoNo" value={form.grupoNo} onChange={handleFormChange} placeholder="Ex: 1771" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor do Crédito (R$)</label>
            <input type="text" name="valorCredito" value={form.valorCredito} onChange={handleCurrencyChange} placeholder="100.000,00" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prazo Contratado</label>
            <input type="number" name="prazoContratado" value={form.prazoContratado} onChange={handlePrazoChange} placeholder="Ex: 216" className="form-input" />
          </div>
          {/* NOVO CAMPO: Quantidade de Cotas (V3.26.5) */}
          <div> 
            <label className="block text-sm font-medium text-gray-700 mb-1">Qtd. de Cotas</label>
            <input 
              type="number" 
              name="quantidadeCotas" 
              value={form.quantidadeCotas} 
              onChange={handleFormChange} 
              min="1" 
              placeholder="1" 
              className="form-input" 
            />
          </div>
          {/* Fim do novo campo */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Simulação (opcional)</label>
            <input type="text" name="nomeSimulacao" value={form.nomeSimulacao} onChange={handleFormChange} placeholder="Ex: Conservador, Moderado, Agressivo" className="form-input" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações (opcional)</label>
            <input type="text" name="observacoes" value={form.observacoes} onChange={handleFormChange} placeholder="Ex: Ideal para cliente com alta capacidade" className="form-input" />
          </div>
        </div>
      </div>
      
      {/* --- DADOS DO GRUPO (Sanfona Interna) --- */}
      <SubAccordion titulo="DADOS DO GRUPO">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prazo Original</label>
            <input type="number" name="prazoOriginal" value={form.prazoOriginal} onChange={handlePrazoChange} placeholder="Prazo Original" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prazo Realizado</label>
            <input type="number" name="prazoRealizado" value={form.prazoRealizado} onChange={handlePrazoChange} placeholder="Prazo Realizado" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prazo a Realizar</label>
            <input type="number" name="prazoARealizar" value={calculos.prazoARealizar} readOnly title="Prazo a Realizar" placeholder="Prazo a Realizar" className="form-input bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Furo</label>
            <input type="number" name="furo" value={form.furo} onChange={handleFuroChange} placeholder="Furo" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mês Contemplação</label>
            <input type="number" name="mesContemplacao" value={form.mesContemplacao} onChange={handleFormChange} placeholder="Mês Contemplação" className="form-input" />
          </div>
        </div>
      </SubAccordion>
      
      {/* --- PAGAMENTO (Sanfona Interna) --- */}
      <SubAccordion titulo="PAGAMENTO">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coluna 1 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Plano</label>
              <select name="tipoPlano" value={form.tipoPlano} onChange={handleFormChange} className="form-input">
                <option>Degrau</option><option>Linear</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Parcela</label>
              <select name="tipoParcela" value={form.tipoParcela} onChange={handleFormChange} className="form-input">
                <option>Integral</option>
                <option>Reduzida (70%)</option>
                <option>Reduzida (50%)</option>
              </select>
            </div>
          </div>
          {/* Coluna 2 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Taxa Adm (%)</label>
              <input type="number" step="0.01" name="taxaAdm" value={form.taxaAdm} onChange={handleTaxaChange} placeholder="Taxa Adm" className="form-input" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Desconto (%)</label>
              <input type="number" step="0.01" name="desconto" value={form.desconto} onChange={handleDescontoChange} placeholder="Desconto" className="form-input" />
            </div>
          </div>
          {/* Coluna 3 */}
          <div className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upgrade</label>
                <select name="upgrade" value={form.upgrade} onChange={handleFormChange} className="form-input">
                  <option>Nenhum</option>
                  <option>Acréscimo %</option>
                  <option>Acréscimo R$</option>
                </select>
              </div>
              {/* Campo condicional para Upgrade */}
              {(form.upgrade === 'Acréscimo %' || form.upgrade === 'Acréscimo R$') && (
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Valor do Upgrade ({form.upgrade.includes('%') ? '%' : 'R$'})</label>
                 <input type="text" name="upgradeValor" value={form.upgradeValor} onChange={handleFormChange} placeholder="Digite o valor" className="form-input" />
               </div>
              )}
          </div>
        </div>
      </SubAccordion>
      
      {/* --- LANCE (Sanfona Interna) --- */}
      <SubAccordion titulo="LANCE">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Lance Total (com toggle) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lance Total</label>
              <div className="flex items-center">
                <input type="number" name="lanceTotal" value={form.lanceTotal} onChange={handleFormChange} placeholder={form.tipoLance === 'parcelas' ? '45' : '50000'} className="form-input rounded-r-none" />
                <button 
                  onClick={toggleTipoLance} 
                  className="flex items-center justify-center h-[42px] px-4 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-600"
                >
                  <span className={`font-medium transition-all ${form.tipoLance === 'parcelas' ? 'text-blue-600' : 'text-gray-400'}`}>parcelas</span>
                  <div className={`relative w-10 h-6 mx-2 rounded-full cursor-pointer transition-colors ${form.tipoLance === 'valor' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <span className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${form.tipoLance === 'valor' ? 'translate-x-4' : 'translate-x-0'}`}></span>
                  </div>
                  <span className={`font-medium transition-all ${form.tipoLance === 'valor' ? 'text-blue-600' : 'text-gray-400'}`}>R$</span>
                </button>
              </div>
            </div>
            {/* Base do Lance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base do Lance</label>
              <select name="baseDoLance" value={form.baseDoLance} onChange={handleFormChange} className="form-input">
                <option>Crédito Inicial</option>
                <option>Crédito Final</option>
                <option>Parcela Integral</option>
                <option>Parcela Reduzida</option>
              </select>
            </div>
            {/* Slider Embutido */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lance Embutido: {formatCurrency(calculos.lanceEmbutidoValor)}</label>
              <div className="flex items-center gap-2">
                <input type="range" min="0" max="50" step="1" name="lanceEmbutidoPerc" value={form.lanceEmbutidoPerc} onChange={handleSliderChange} className="w-full" />
                <input type="number" min="0" max="50" name="lanceEmbutidoPerc" value={form.lanceEmbutidoPerc} onChange={handleFormChange} className="form-input w-20 text-center" />
                <span className="text-lg font-medium">%</span>
              </div>
            </div>
         </div>
         {calculos.alertaFuro && (
           <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-3 rounded-lg mt-4 text-center">
             ⚠️ {calculos.alertaFuro}
           </div>
         )}
      </SubAccordion>

      {/* --- LAYOUT CORRIGIDO: Pós-Lance e Seguro --- */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex flex-wrap items-center gap-6">
           <label className="text-sm font-medium text-gray-700">Estratégia Pós-Lance:</label>
           <button onClick={() => handleFormChange({ target: { name: 'estrategiaPosLance', value: 'reduzir_valor' }})}
             className={`btn ${form.estrategiaPosLance === 'reduzir_valor' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
             Reduzir Valor
           </button>
           <button onClick={() => handleFormChange({ target: { name: 'estrategiaPosLance', value: 'reduzir_prazo' }})}
             className={`btn ${form.estrategiaPosLance === 'reduzir_prazo' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
             Reduzir Prazo
           </button>
           
           <div className="flex items-center gap-2">
              <label htmlFor="calcularSeguro" className="text-sm font-medium text-gray-700">Calcular Seguro?</label>
              <input type="checkbox" id="calcularSeguro" name="calcularSeguro" checked={form.calcularSeguro} onChange={handleFormChange} className="form-checkbox" />
           </div>
           
           {form.calcularSeguro && (
             <div className="flex-1 min-w-[150px]">
               <label className="block text-sm font-medium text-gray-700 mb-1">Percentual Seguro (%):</label>
               <input type="text" name="percentualSeguro" value={form.percentualSeguro} onChange={handlePercentualSeguroChange} placeholder="0,030900" className="form-input" />
             </div>
           )}
        </div>
      </div>

      {/* --- AVANÇADO (Sanfona Interna) --- */}
      <SubAccordion titulo="AVANÇADO">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reajuste Anual (%)</label>
            <input type="number" name="reajusteAnual" value={form.reajusteAnual} onChange={handleFormChange} placeholder="Reajuste Anual (%)" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Índice</label>
            <select name="indice" value={form.indice} onChange={handleFormChange} className="form-input">
              <option>INCC</option><option>IPCA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fundo Reserva (%)</label>
            <input type="number" step="0.01" name="fundoReserva" value={form.fundoReserva} onChange={handleFormChange} placeholder="Fundo Reserva (%)" className="form-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Taxa Adesão (%)</label>
            <input type="number" step="0.01" name="taxaAdesao" value={form.taxaAdesao} onChange={handleFormChange} placeholder="Taxa Adesão (%)" className="form-input" />
          </div>
        </div>
      </SubAccordion>
      
      {/* --- PREVIEW DA SIMULAÇÃO --- */}
      <div className="mt-8">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">PREVIEW DA SIMULAÇÃO</h3>
        <PreviewSimulacao />
      </div>

      {/* --- BOTÕES DE AÇÃO (MODIFICADO) --- */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between gap-4">
        <button 
            className="btn-primary w-full"
            onClick={adicionarSimulacao}
            disabled={!!calculos.alertaFuro}
        >
            Adicionar Simulação
        </button>
        
        {/* NOVO BOTÃO: Gerar Proposta */}
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

    </Accordion>
  );
};
