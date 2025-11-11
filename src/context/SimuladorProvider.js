/*
 * ARQUIVO: /src/context/SimuladorProvider.js (VERSÃO 3.27.6 - ARREDONDAMENTO NA TOTALIZAÇÃO)
 *
 * CORREÇÃO DE PRECISÃO:
 * 1. Aplicado Math.round(valor * 100) / 100 nas somas de totalGeral para garantir
 * precisão de duas casas decimais (evita erros de R$ 0,01 em finanças).
 */

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
// IMPORTAÇÃO MODULARIZADA: Substitui as regras e funções de cálculo
import { 
    parseCurrency, 
    formatCurrency, 
    groupRules, 
    calcularParcelaBase 
} from './SimuladorUtils'; 

const SimuladorContext = createContext();

// Função auxiliar para garantir arredondamento de moeda (2 casas)
const roundCurrency = (value) => Math.round(value * 100) / 100;

export const SimuladorProvider = ({ children }) => {
  
  // DADOS DE TESTE PRÉ-PREENCHIDOS
  const estadoInicialForm = {
    produto: 'Imóvel',
    grupoNo: '1768',
    valorCredito: '230.000,00',
    prazoContratado: '120',
    nomeSimulacao: '',
    observacoes: '',
    prazoOriginal: '180',
    prazoRealizado: '72',
    mesContemplacao: '1',
    tipoPlano: 'Degrau',
    tipoParcela: 'Integral',
    taxaAdm: '17',
    desconto: '0',
    upgrade: 'Acréscimo %',
    upgradeValor: '30',
    lanceTotal: '45',
    tipoLance: 'parcelas',
    baseDoLance: 'Crédito Inicial',
    lanceEmbutidoPerc: 30,
    estrategiaPosLance: 'reduzir_valor',
    calcularSeguro: true,
    percentualSeguro: '0,030900',
    reajusteAnual: '0',
    indice: 'INCC',
    fundoReserva: '0', // O GRUPO 1768 TEM FR 0 NO MEU groupRules
    taxaAdesao: '0',
    furo: '12', // (120 - (180 - 72)) = 12
    quantidadeCotas: '1', // NOVO CAMPO
  };

  const [proposta, setProposta] = useState({
    nomeCliente: 'João Silva',
    telefone: '(11) 98765-4321',
    email: 'cliente@exemplo.com',
    objetivoCliente: 'Compra de Imóvel',
  });
  const [form, setForm] = useState(estadoInicialForm);
  const [taxaAdmOriginal, setTaxaAdmOriginal] = useState(parseFloat(estadoInicialForm.taxaAdm) || 0);
  
  const [calculos, setCalculos] = useState({
    prazoARealizar: 108,
    lanceEmbutidoValor: 69000,
    alertaFuro: '',
  });

  const [preview, setPreview] = useState(null);
  const [cenarios, setCenarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // --- ATUALIZAR INPUT PROPOSTA ---
   const handlePropostaChange = (e) => {
    const { name, value } = e.target;
    setProposta(prev => ({ ...prev, [name]: value }));
  };

  // --- ATUALIZAR INPUT FORMULÁRIO (GENÉRICO) ---
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    if (errorMessage) setErrorMessage('');
    setForm(prev => ({ ...prev, [name]: val }));
  };
  
  // --- HANDLERS ESPECÍFICOS ---
  
  // Lógica de Prazo e Furo V15
  const handlePrazoChange = (e) => {
    const { name, value } = e.target;
    
    setForm(prevForm => {
      const novoForm = { ...prevForm, [name]: value };
      
      const prazoOrig = parseInt(novoForm.prazoOriginal) || 0;
      const prazoRealiz = parseInt(novoForm.prazoRealizado) || 0;
      const prazoCont = parseInt(novoForm.prazoContratado) || 0;

      const prazoARealizarCalculado = Math.max(0, prazoOrig - prazoRealiz);
      const prazoRestanteGrupo = prazoOrig - prazoRealiz;
      const furoCalculado = Math.max(0, prazoCont - prazoRestanteGrupo);

      setCalculos(prevCalc => ({ ...prevCalc, prazoARealizar: prazoARealizarCalculado }));
      
      return { 
        ...novoForm, 
        furo: furoCalculado.toString()
      };
    });
  };
  
  // Lógica de Furo Manual
  const handleFuroChange = (e) => {
     setForm(prev => ({ ...prev, furo: e.target.value }));
  };

  // Lógica de Desconto Simultâneo
  const handleTaxaChange = (e) => {
    const novaTaxa = e.target.value;
    setForm(prev => ({ ...prev, taxaAdm: novaTaxa, desconto: '0' }));
    setTaxaAdmOriginal(parseFloat(novaTaxa) || 0);
  };

  const handleDescontoChange = (e) => {
    const novoDesconto = parseFloat(e.target.value) || 0;
    const novaTaxa = taxaAdmOriginal * (1 - (novoDesconto / 100));
    setForm(prev => ({ 
      ...prev, 
      desconto: e.target.value,
      taxaAdm: novaTaxa.toFixed(2)
    }));
  };
  
  // ========================================================================
  // MOTOR DE CÁLCULO V15 
  // O corpo deste useMemo FOI MANTIDO AQUI e utiliza as funções importadas.
  // ========================================================================
  
  const simulationResult = useMemo(() => {
    try {
      // 1. MAPEAMENTO: Interface (form) -> DadosEntrada (V15)
      const dados = {
        valorCredito: parseCurrency(form.valorCredito),
        prazoContratado: parseInt(form.prazoContratado),
        prazoOriginal: parseInt(form.prazoOriginal),
        prazoRealizado: parseInt(form.prazoRealizado),
        tipoPlano: form.tipoPlano.toLowerCase(), // 'Degrau' -> 'degrau'
        tipoParcela: form.tipoParcela.includes('70') ? "Reduzida_70" : (form.tipoParcela.includes('50') ? "Reduzida_50" : "Integral"),
        taxaAdm: parseFloat(form.taxaAdm),
        fundoReserva: parseFloat(form.fundoReserva),
        taxaAdesao: parseFloat(form.taxaAdesao),
        percentualSeguro: parseFloat(String(form.percentualSeguro).replace(',', '.')),
        calcularSeguro: form.calcularSeguro,
        reajusteAnual: parseFloat(form.reajusteAnual),
        descontoGrandesNegocios: parseFloat(form.desconto),
        mesContemplacao: parseInt(form.mesContemplacao),
        baseLance: form.baseDoLance.replace(' ', '_'), // "Crédito Inicial" -> "Crédito_Inicial"
        usarLanceValor: form.tipoLance === 'valor',
        lanceTotalValorInput: form.tipoLance === 'valor' ? parseFloat(form.lanceTotal) : 0,
        lanceTotalParcelas: form.tipoLance === 'parcelas' ? parseInt(form.lanceTotal) : 0,
        lanceEmbutidoPercentual: form.lanceEmbutidoPerc,
        upgrade: form.upgrade.includes('%') ? "Acrescimo_Percentual" : (form.upgrade.includes('R$') ? "Acrescimo_Valor" : "Nenhum"),
        valorUpgrade: parseCurrency(form.upgradeValor),
        estrategiaPos: form.estrategiaPosLance === 'reduzir_valor' ? "Reduzir_Valor" : "Reduzir_Prazo",
      };
      
      // --- INÍCIO DO MOTOR DE CÁLCULO V15 ---
      const {
          valorCredito, prazoContratado, calcularSeguro,
          lanceEmbutidoPercentual, mesContemplacao, prazoRealizado, usarLanceValor, lanceTotalValorInput, lanceTotalParcelas,
          baseLance, upgrade, valorUpgrade, tipoPlano, percentualSeguro, 
          estrategiaPos, tipoParcela, prazoOriginal, reajusteAnual
      } = dados;
    
      if(!prazoContratado || prazoContratado <= 0) throw new Error("Prazo do contrato inválido.");
      
      const taxaAdmFinal = dados.taxaAdm * (1 - dados.descontoGrandesNegocios / 100);
      const taxaAdmTotalPercent = taxaAdmFinal + dados.fundoReserva + dados.taxaAdesao;
      const taxaAdmTotal = taxaAdmTotalPercent / 100;

      if(isNaN(taxaAdmTotal)) throw new Error("Taxas inválidas.");
    
      const numReajustes = Math.floor(Math.max(0, mesContemplacao - 1) / 12);
      const valorCreditoReajustado = valorCredito * Math.pow(1 + reajusteAnual / 100, numReajustes);
      
      let valorCreditoFinal = valorCreditoReajustado;
      if (upgrade === "Acrescimo_Percentual" && valorUpgrade > 0) {
        valorCreditoFinal = valorCreditoReajustado * (1 + valorUpgrade / 100);
      } else if (upgrade === "Acrescimo_Valor" && valorUpgrade > 0) {
        valorCreditoFinal = valorUpgrade;
      }
      
      // --- 3.1 CÁLCULO PARCELA PRÉ ---
      const { parcela: pPre, parcelaFinal: pPreFinal } = calcularParcelaBase(
        valorCredito, prazoContratado, taxaAdmTotal, tipoPlano, 
        tipoParcela, calcularSeguro, form.percentualSeguro
      );
      
      let parcelaPreAtual = pPre;
      if (tipoPlano === 'degrau' && mesContemplacao > Math.ceil(prazoContratado / 2)) { 
        parcelaPreAtual = pPreFinal;
      }

      let pDetalhePre = `1-${prazoContratado}: ${formatCurrency(pPre)}`;
      if (tipoPlano === 'degrau' && pPreFinal !== null) { 
         const pontoDeVirada = Math.ceil(prazoContratado / 2);
         pDetalhePre = `1-${pontoDeVirada}: ${formatCurrency(pPre)} | ${pontoDeVirada+1}-${prazoContratado}: ${formatCurrency(pPreFinal)}`;
      } else if (tipoParcela !== "Integral") {
         pDetalhePre = `1-${prazoContratado}: ${formatCurrency(pPre)}`;
      }

      // 3.2.3 Cálculo do Furo (Nº Parcelas)
      const prazoRestanteGrupo = prazoOriginal - prazoRealizado;
      const furoN = Math.max(0, prazoContratado - prazoRestanteGrupo);
      
      // 3.2.4 & 3.2.5 Base do Lance e Custo do Furo (R$)
      let creditoBaseLance = valorCredito;
      let tipoParcelaLance = "Integral";
      
      if (baseLance === "Credito_Final") {
        creditoBaseLance = valorCreditoFinal;
      } else if (baseLance === "Parcela_Reduzida") {
        tipoParcelaLance = tipoParcela;
      }
      
      const { parcela: pLance1, parcelaFinal: pLance2 } = calcularParcelaBase(
        creditoBaseLance, prazoContratado, taxaAdmTotal, tipoPlano, 
        tipoParcelaLance, calcularSeguro, form.percentualSeguro
      );
      
      const pLanceMetade2 = pLance2 !== null ? pLance2 : pLance1;
      const numParcelasMetade = Math.ceil(prazoContratado / 2);
    
      let custoFuroR = 0; // 3.2.5
      for (let i = 0; i < furoN; i++) {
        const pIndex = prazoContratado - 1 - i;
        if (tipoPlano === "degrau" && pIndex >= numParcelasMetade) { 
          custoFuroR += pLanceMetade2;
        } else {
          custoFuroR += pLance1;
        }
      }
      
      // 3.2.4 Cálculo do Lance Total (R$)
      let lanceTotalR = 0;
      if (usarLanceValor) {
        lanceTotalR = lanceTotalValorInput;
      } else {
        for (let i = 0; i < lanceTotalParcelas; i++) {
          const pIndex = prazoContratado - 1 - i;
          if (tipoPlano === "degrau" && pIndex >= numParcelasMetade) { 
            lanceTotalR += pLanceMetade2;
          } else {
            lanceTotalR += pLance1;
          }
        }
      }
      // O LANCE TOTAL FOI CORRETAMENTE CALCULADO AQUI (em R$ 90.268,65 para 45 parcelas)
    
      // 3.2.6 Lance Embutido e Crédito Líquido
      let baseEmbutido = valorCredito; // Default 'Crédito_Inicial'
      if (baseLance === "Credito_Final") {
        baseEmbutido = valorCreditoFinal;
      }
      const lanceEmbutidoR = baseEmbutido * (lanceEmbutidoPercentual / 100);
      const creditoLiquido = valorCreditoFinal - lanceEmbutidoR;
      
      // 3.2.7 Recurso Próprio (Lance Bolso)
      const lanceBolsoR = Math.max(0, lanceTotalR - lanceEmbutidoR);
      const lanceBolsoPercentualLiquido = (creditoLiquido > 0) ? (lanceBolsoR / creditoLiquido) * 100 : 0;
      
      // 3.2.8 Saldo do Lance (R$)
      let saldoLanceR = 0;
      let saldoLanceN = 0;
      if (!usarLanceValor) {
         saldoLanceN = Math.max(0, lanceTotalParcelas - furoN);
      } else {
         const lanceUtil = Math.max(0, lanceTotalR - custoFuroR);
         saldoLanceN = (pLanceMetade2 > 0) ? Math.floor(lanceUtil / pLanceMetade2) : 0;
      }
      
      for (let i = 0; i < saldoLanceN; i++) {
        const pIndex = prazoContratado - 1 - furoN - i;
        if (tipoPlano === "degrau" && pIndex >= numParcelasMetade) { 
          saldoLanceR += pLanceMetade2;
        } else {
          saldoLanceR += pLance1;
        }
      }
      
      // --- 3.3 CÁLCULO PARCELA PÓS ---
      
      // 3.3.1 Prazo Final Restante
      const parcelasJaPagas = mesContemplacao;
      let prazoFinal = 0;
      if (estrategiaPos === "Reduzir_Valor") {
        // CORREÇÃO: Usar o furo correto (52)
        prazoFinal = Math.max(0, prazoContratado - parcelasJaPagas - furoN);
      } else { // "Reduzir_Prazo"
        prazoFinal = Math.max(0, prazoContratado - parcelasJaPagas - furoN - saldoLanceN);
      }
      
      // 3.3.2 Diferença Acumulada
      let diferencaAcumulada = 0;
      if (tipoParcela !== "Integral") {
        for (let mes = 1; mes < mesContemplacao; mes++) {
          const reajustesAplicados = Math.floor(Math.max(0, mes - 1) / 12);
          const creditoDoMes = valorCredito * Math.pow(1 + reajusteAnual / 100, reajustesAplicados);
          
          const pIntegralBase = calcularParcelaBase(creditoDoMes, prazoContratado, taxaAdmTotal, tipoPlano, "Integral", false, '0').parcela;
          const pReduzidaBase = calcularParcelaBase(creditoDoMes, prazoContratado, taxaAdmTotal, tipoPlano, tipoParcela, false, '0').parcela;
          
          diferencaAcumulada += pIntegralBase - pReduzidaBase;
        }
      }
      const acrescimoMensalDiferenca = (prazoFinal > 0) ? diferencaAcumulada / prazoFinal : 0;
      
      // 3.3.5 Desconto do Saldo do Lance
      const descontoMensal = (estrategiaPos === "Reduzir_Valor" && prazoFinal > 0) ? saldoLanceR / prazoFinal : 0;
      
      // 3.3.6 & 3.3.7 Fórmula Final Pós
      let novaParcela1 = 0;
      let novaParcela2 = 0;
      
      if (baseLance === "Credito_Final" || baseLance === "Parcela_Integral" || baseLance === "Parcela_Reduzida") {
        const finalBase = calcularParcelaBase(valorCreditoFinal, prazoContratado, taxaAdmTotal, tipoPlano, "Integral", calcularSeguro, form.percentualSeguro); 
        novaParcela1 = finalBase.parcela - descontoMensal + acrescimoMensalDiferenca;
        novaParcela2 = (finalBase.parcelaFinal !== null ? finalBase.parcelaFinal : finalBase.parcela) - descontoMensal + acrescimoMensalDiferenca;
      } else { // "Crédito_Inicial"
        const valorUpgradeEfetivo = valorCreditoFinal - valorCreditoReajustado;
        const taxaAdminUpgrade = valorUpgradeEfetivo * (taxaAdmFinal / 100); // Usa taxa c/ desconto
        const amortUpgradeMensal = (prazoFinal > 0) ? valorUpgradeEfetivo / prazoFinal : 0;
        
        const ta_r_final = valorCreditoFinal * taxaAdmTotal;
        const sp_r_pos = calcularSeguro ? (valorCreditoFinal + ta_r_final) * (percentualSeguro / 100) : 0;
    
        const preBase = calcularParcelaBase(valorCredito, prazoContratado, taxaAdmTotal, tipoPlano, tipoParcela, false, '0');
        const p1_pre_base = preBase.parcela;
        const p2_pre_base = preBase.parcelaFinal !== null ? preBase.parcelaFinal : p1_pre_base;
    
        let taxaUpgradeMensal1a = 0;
        let taxaUpgradeMensal2a = 0;
        
        if (tipoPlano === 'linear') { 
          taxaUpgradeMensal1a = (prazoFinal > 0) ? taxaAdminUpgrade / prazoFinal : 0;
          taxaUpgradeMensal2a = taxaUpgradeMensal1a;
        } else { // Degrau
          const metadeOriginal = Math.ceil(prazoContratado / 2);
          const parcelas1aMetadeRestantes = Math.max(0, metadeOriginal - mesContemplacao);
          taxaUpgradeMensal1a = (parcelas1aMetadeRestantes > 0) ? taxaAdminUpgrade / parcelas1aMetadeRestantes : 0;
          taxaUpgradeMensal2a = 0;
        }
        
        novaParcela1 = p1_pre_base + amortUpgradeMensal + taxaUpgradeMensal1a + sp_r_pos - descontoMensal + acrescimoMensalDiferenca;
        novaParcela2 = p2_pre_base + amortUpgradeMensal + taxaUpgradeMensal2a + sp_r_pos - descontoMensal + acrescimoMensalDiferenca;
      }
      
      let pDetalhePos = `${prazoFinal} parcelas restantes de ${formatCurrency(novaParcela1)}`;
      const pontoDeViradaOriginal = Math.ceil(prazoContratado / 2);
      if (tipoPlano === 'degrau') { 
         const pontoDeViradaPos = Math.max(0, pontoDeViradaOriginal - (mesContemplacao - 1));
         if (pontoDeViradaPos > 0 && pontoDeViradaPos < prazoFinal) {
           pDetalhePos = `1-${pontoDeViradaPos}: ${formatCurrency(novaParcela1)} | ${pontoDeViradaPos+1}-${prazoFinal}: ${formatCurrency(novaParcela2)}`;
         } else if (pontoDeViradaPos <= 0 && prazoFinal > 0) {
           pDetalhePos = `1-${prazoFinal} (Restantes): ${formatCurrency(novaParcela2)}`;
         }
      }
      
      // --- FIM DO MOTOR V15 ---
    
      return {
        success: true,
        data: {
          creditoFinal: valorCreditoFinal, 
          creditoContratado: valorCredito,
          creditoLiquido: creditoLiquido,
          parcelaPre: { valor: parcelaPreAtual, detalhes: pDetalhePre, parcelasRestantes: prazoContratado - (mesContemplacao - 1) },
          lanceBolso: Math.max(0, lanceBolsoR),
          parcelaPos: { 
            valor: (tipoPlano === 'degrau' && (mesContemplacao-1) >= pontoDeViradaOriginal) ? Math.max(0, novaParcela2) : Math.max(0, novaParcela1), 
            detalhes: pDetalhePos,
            parcelasRestantes: prazoFinal
          },
          detalhes: {
            lanceTotal: lanceTotalR,
            lanceEmbutido: lanceEmbutidoR,
            custoDoFuro: custoFuroR,
            prazo: `${prazoContratado} meses`,
            plano: form.tipoPlano,
            tipoParcela: form.tipoParcela,
            contemplacao: `Mês ${mesContemplacao}`
          }
        }
      };
    } catch (error) {
      console.warn("Erro no motor de cálculo:", error.message);
      return { success: false, error: error.message };
    }
  }, [form]);
    
  // ========================================================================
  // LÓGICA AUTOMÁTICA (Reagindo ao 'form' e ao 'motor')
  // ========================================================================
  useEffect(() => {
    // Atualiza o Cérebro com os resultados do motor de cálculo
    if (simulationResult.success) {
      setPreview(simulationResult.data);
    } else {
      setPreview(null);
    }
    
    // Atualiza os campos derivados (prazo, R$ embutido)
    const prazoOrig = parseInt(form.prazoOriginal) || 0;
    const prazoRealiz = parseInt(form.prazoRealizado) || 0;
    const prazoCont = parseInt(form.prazoContratado) || 0;
    
    const prazoARealizarCalculado = Math.max(0, prazoOrig - prazoRealiz);
    const prazoRestanteGrupo = prazoOrig - prazoRealiz;
    const furoCalculado = Math.max(0, prazoCont - prazoRestanteGrupo);
    
    const valorCred = parseCurrency(form.valorCredito);
    
    let baseEmbutido = valorCred;
    if (form.baseDoLance === 'Crédito Final' && simulationResult.success) {
      baseEmbutido = simulationResult.data.creditoFinal || valorCred; 
    }
    const lanceEmbutidoValor = baseEmbutido * (form.lanceEmbutidoPerc / 100);

    // Validação de Furo
    let alertaFuro = '';
    const furoEmParcelas = furoCalculado;
    const lanceEmParcelas = parseFloat(form.lanceTotal) || 0; 
    
    if (form.tipoLance === 'parcelas' && lanceEmParcelas < furoEmParcelas) {
      alertaFuro = 'ATENÇÃO: Lance (em parcelas) menor que o furo!';
    } else if (simulationResult.success && simulationResult.data.detalhes.lanceTotal < simulationResult.data.detalhes.custoDoFuro) {
      alertaFuro = `ATENÇÃO: Lance (${formatCurrency(simulationResult.data.detalhes.lanceTotal)}) menor que o Custo do Furo (${formatCurrency(simulationResult.data.detalhes.custoDoFuro)})`;
    } else if (simulationResult.error) {
      alertaFuro = `Erro: ${simulationResult.error}`;
    }

    setCalculos({
      prazoARealizar: prazoARealizarCalculado,
      lanceEmbutidoValor: lanceEmbutidoValor,
      alertaFuro: alertaFuro,
    });
    
  }, [form, simulationResult]);
  
  // Efeito 1: Atualiza taxas/regras quando o Grupo muda
  useEffect(() => {
    const regra = groupRules[form.grupoNo];
    if (regra) {
      const novaTaxa = regra.taxaAdm ? regra.taxaAdm.toString() : '17';
      setForm(prev => ({
        ...prev,
        taxaAdm: novaTaxa,
        fundoReserva: regra.fundoReserva ? regra.fundoReserva.toString() : '0',
        desconto: '0', // Reseta o desconto ao mudar de grupo
      }));
      setTaxaAdmOriginal(parseFloat(novaTaxa) || 0);
    }
  }, [form.grupoNo]);

  // ========================================================================
  // LÓGICA DE TOTALIZAÇÃO GLOBAL (V3.26.9)
  // ========================================================================
  const totalGeral = useMemo(() => {
    if (cenarios.length === 0) {
        return {
            creditoLiquidoTotal: 0,
            lanceBolsoTotal: 0,
            parcelaPreTotal: 0,
            parcelaPosTotal: 0,
            lanceTotalGeral: 0,
        };
    }

    return cenarios.reduce((acc, cenario) => {
        // APLICANDO CORREÇÃO DE ARREDONDAMENTO NA SOMA (Math.round)
        acc.creditoLiquidoTotal = roundCurrency(acc.creditoLiquidoTotal + cenario.preview.creditoLiquido);
        acc.lanceBolsoTotal = roundCurrency(acc.lanceBolsoTotal + cenario.preview.lanceBolso);
        acc.parcelaPreTotal = roundCurrency(acc.parcelaPreTotal + cenario.preview.parcelaPre.valor);
        acc.parcelaPosTotal = roundCurrency(acc.parcelaPosTotal + cenario.preview.parcelaPos.valor);
        acc.lanceTotalGeral = roundCurrency(acc.lanceTotalGeral + cenario.preview.detalhes.lanceTotal);
        return acc;
    }, {
        creditoLiquidoTotal: 0,
        lanceBolsoTotal: 0,
        parcelaPreTotal: 0,
        parcelaPosTotal: 0,
        lanceTotalGeral: 0,
    });
  }, [cenarios]);


  // ========================================================================
  // LÓGICA DE GERAÇÃO DA PROPOSTA (V3.27.0)
  // ========================================================================
  const gerarDadosProposta = () => {
      if (cenarios.length === 0) {
          throw new Error("Não é possível gerar a proposta sem cenários criados.");
      }
      
      const dadosProposta = {
          id: `PROPOSTA-${Date.now()}`,
          dataGeracao: new Date().toLocaleString('pt-BR'),
          dadosIniciais: proposta, 
          
          // 2. Totalização Global (já está calculado)
          resumoGeral: totalGeral, 
          
          // 3. Cenários Detalhados 
          cenariosDetalhados: cenarios.map(c => ({
              id: c.id,
              nome: c.nome,
              observacoes: c.inputs.observacoes,
              qtdCotas: c.inputs.quantidadeCotas,
              // Mantemos os principais resultados
              resultados: {
                  grupo: c.inputs.grupoNo,
                  creditoContratado: c.preview.creditoContratado,
                  creditoUnitario: c.preview.creditoUnitario,
                  creditoLiquido: c.preview.creditoLiquido,
                  lanceTotal: c.preview.detalhes.lanceTotal,
                  lanceEmbutido: c.preview.detalhes.lanceEmbutido,
                  lanceBolso: c.preview.lanceBolso,
                  parcelaPre: {
                      valor: c.preview.parcelaPre.valor,
                      detalhes: c.preview.parcelaPre.detalhes
                  },
                  parcelaPos: {
                      valor: c.preview.parcelaPos.valor,
                      detalhes: c.preview.parcelaPos.detalhes
                  },
                  prazo: c.inputs.prazoContratado,
                  taxaAdm: c.inputs.taxaAdm,
                  tipoParcela: c.inputs.tipoParcela,
                  contemplacao: c.preview.detalhes.contemplacao
              }
          }))
      };
      
      return dadosProposta;
  };

  // ========================================================================
  // AÇÕES DO ORÇAMENTO
  // ========================================================================
  
  const removerCenario = (idParaRemover) => {
    setCenarios(prev => prev.filter(cenario => cenario.id !== idParaRemover));
  };
  
  const editarCenario = (idParaEditar) => { 
    const cenario = cenarios.find(c => c.id === idParaEditar);
    if (cenario) {
      setForm({ ...cenario.inputs });
    } else {
      setErrorMessage("Cenário não encontrado para edição.");
    }
  };
  
  const duplicarCenario = (idParaDuplicar) => { 
    const cenario = cenarios.find(c => c.id === idParaDuplicar);
    if (cenario) {
      const novoCenario = {
        ...cenario,
        id: Date.now(), // Novo ID único
        // Usa o nome salvo no input, adicionando ' (Cópia)' se não tiver nomeSimulacao
        nome: cenario.inputs.nomeSimulacao ? `${cenario.inputs.nomeSimulacao} (Cópia)` : `Cenário ${cenarios.length + 1}`
      };
      // Adiciona o novo cenário ao final da lista
      setCenarios(prev => [...prev, novoCenario]);
    }
  };

  const adicionarSimulacao = () => {
    if (preview && !calculos.alertaFuro) {
      // 1. Pega a quantidade de cotas
      const qtdCotas = parseInt(form.quantidadeCotas) || 1;
      
      // 2. Cria o novo objeto de preview com os valores totais multiplicados
      const previewTotal = {
        ...preview,
        // NOVO: Salva o valor unitário do crédito antes da multiplicação
        creditoUnitario: preview.creditoContratado, 
        
        // Multiplica os totais da proposta
        creditoContratado: preview.creditoContratado * qtdCotas, // Agora é o Total
        creditoLiquido: preview.creditoLiquido * qtdCotas,
        lanceBolso: preview.lanceBolso * qtdCotas,
        
        // Multiplica os valores da parcela (Mantendo os detalhes de parcela por cota inalterados)
        parcelaPre: {
          ...preview.parcelaPre,
          valor: preview.parcelaPre.valor * qtdCotas
        },
        parcelaPos: {
          ...preview.parcelaPos,
          valor: preview.parcelaPos.valor * qtdCotas
        },
        
        detalhes: {
          ...preview.detalhes,
          lanceTotal: preview.detalhes.lanceTotal * qtdCotas,
          lanceEmbutido: preview.detalhes.lanceEmbutido * qtdCotas,
          custoDoFuro: preview.detalhes.custoDoFuro * qtdCotas,
        }
      };
      
      // 3. Adiciona ao estado 'cenarios'
      setCenarios(prev => [
        ...prev,
        {
          id: Date.now(),
          nome: form.nomeSimulacao || `Cenário ${cenarios.length + 1}`,
          inputs: { ...form, quantidadeCotas: qtdCotas }, // Salva a Qtd numérico
          preview: previewTotal // Salva o preview com totais
        }
      ]);
      
      // ... (restante da função)

      setForm(prev => ({
        ...estadoInicialForm,
        // Mantém dados úteis para a próxima simulação
        grupoNo: prev.grupoNo,
        valorCredito: prev.valorCredito,
        prazoContratado: prev.prazoContratado,
        prazoOriginal: prev.prazoOriginal,
        taxaAdm: prev.taxaAdm, // Mantém a taxa do grupo
        fundoReserva: prev.fundoReserva, // Mantém o FR do grupo
      }));
      setTaxaAdmOriginal(parseFloat(form.taxaAdm) || 0); // Reseta a taxa original
    } else if (calculos.alertaFuro) {
      alert(calculos.alertaFuro);
    } else {
      alert("Simulação inválida. Verifique os dados.");
    }
  };
  
  const limparTudo = () => {
    setCenarios([]);
    setForm(estadoInicialForm);
    setTaxaAdmOriginal(parseFloat(estadoInicialForm.taxaAdm) || 0);
  };
  
  const limparFormulario = () => {
     setForm(prev => ({
        ...estadoInicialForm,
        // Mantém dados da proposta para agilidade
        grupoNo: prev.grupoNo,
        valorCredito: prev.valorCredito,
        prazoContratado: prev.prazoContratado,
        prazoOriginal: prev.prazoOriginal,
        quantidadeCotas: prev.quantidadeCotas, // Mantém a qtd de cotas
      }));
     setTaxaAdmOriginal(parseFloat(estadoInicialForm.taxaAdm) || 0);
  };

  // ========================================================================
  // COMPARTILHANDO TUDO
  // ========================================================================
  const value = {
    proposta,
    setProposta: handlePropostaChange,
    form,
    handleFormChange,
    handlePrazoChange,
    handleFuroChange, // Exporta o handler do furo manual
    handleTaxaChange,
    handleDescontoChange,
    calculos,
    preview,
    cenarios,
    totalGeral,         // Totalização Global
    gerarDadosProposta, // NOVO
    adicionarSimulacao,
    limparTudo,
    limparFormulario,
    removerCenario,
    editarCenario,      
    duplicarCenario,    
    errorMessage,
  };

  return (
    <SimuladorContext.Provider value={value}>
      {children}
    </SimuladorContext.Provider>
  );
};

// "Atalho" para os blocos
export const useSimulador = () => {
  const context = useContext(SimuladorContext);
  if (!context) {
    throw new Error('useSimulador deve ser usado dentro de um SimuladorProvider');
  }
  return context;
};
