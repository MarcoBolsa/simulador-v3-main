/*
 * ARQUIVO: /src/context/SimuladorProvider.js (VERSÃO 3.26.5 - SUPORTE A MÚLTIPLAS COTAS)
 *
 * NOVAS FUNCIONALIDADES:
 * 1. Adicionado o campo 'quantidadeCotas' ao estado inicial.
 * 2. Refatorada a função 'adicionarSimulacao' para multiplicar os valores TOTAIS
 * (Crédito, Lance, Valor da Parcela) pela quantidade de cotas.
 */

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// ========================================================================
// REGRAS DE NEGÓCIO (Do seu arquivo de script)
// ========================================================================
const groupRules = {
  '1740': { livre: 10, fixo: 0, taxaAdm: 19, fundoReserva: 1 }, '1741': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1742': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1743': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1744': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1745': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1746': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 },
  '1750': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1760': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1761': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1762': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 },
  '1763': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 }, '1764': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 }, '1765': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 }, '1766': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 }, '1767': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 }, '1768': { livre: 30, fixo: 30, taxaAdm: 17, fundoReserva: 0 }, '1769': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 }, '1772': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 },
  '1770': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1 }, '1771': { livre: 20, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1773': { livre: 20, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1775': { livre: 20, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 },
  '1790': { livre: 20, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1777': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1779': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1781': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 },
  '1778': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1782': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1780': { livre: 20, fixo: 20, taxaAdm: 19, fundoReserva: 1},
  '1783': { livre: 0, fixo: 30, taxaAdm: 19, fundoReserva: 1 }, '1786': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1788': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 },
  '1789': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 }, '1791': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 }, 
  '1793': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '1792': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 }, '1794': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '1795': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '1796': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 }, '1798': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '1797': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 }, '1799': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 }, '2103': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 }, '2107': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 }, '2111': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '1810': { livre: 10, fixo: 0, taxaAdm: 19, fundoReserva: 1 }, '1820': { livre: 10, fixo: 0, taxaAdm: 19, fundoReserva: 1 }, '1830': { livre: 30, fixo: 0, taxaAdm: 19, fundoReserva: 1 },
  '1840': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 }, '1850': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '1860': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '1870': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'integral' }, taxaAdm: 19, fundoReserva: 1 },
  '1880': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'integral' }, taxaAdm: 19, fundoReserva: 1 },
  '1890': { livre: 30, fixo: 30, taxaAdm: 19, fundoReserva: 1 },
  '1902': { livre: 10, fixo: 0, taxaAdm: 19, fundoReserva: 1 },
  '1903': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1905': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1907': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 }, '1908': { livre: 30, fixo: 0, taxaAdm: 17, fundoReserva: 0.5 },
  '2102': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'integral' }, taxaAdm: 19, fundoReserva: 1 },
  '2108': { livre: 0, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'integral' }, taxaAdm: 19, fundoReserva: 1 },
  '2113': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '2115': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'reduzida' }, taxaAdm: 19, fundoReserva: 1 },
  '2117': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'integral' }, taxaAdm: 19, fundoReserva: 1 },
  '2119': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'integral' }, taxaAdm: 19, fundoReserva: 1 },
  '2121': { livre: 30, fixo: 30, parcelaReduzida: { enabled: true, lanceCalculadoSobre: 'integral' }, taxaAdm: 19, fundoReserva: 1 },
};

const upgradeTables = {
  '1771': {'70000':100000,'75000':107000,'80000':114000,'85000':121000,'90000':128000,'95000':135000,'100000':140000, '105000':140000, '110000':140000, '115000':140000, '120000':140000, '125000':140000, '130000':140000, '135000':140000, '140000':140000},
  '1773': {'70000':100000,'75000':107000,'80000':114000,'85000':121000,'90000':128000,'95000':135000,'100000':140000, '105000':140000, '110000':140000, '115000':140000, '120000':140000, '125000':140000, '130000':140000, '135000':140000, '140000':140000},
  '1775': {'70000':100000,'75000':107000,'80000':114000,'85000':121000,'90000':128000,'95000':135000,'100000':140000, '105000':140000, '110000':140000, '115000':140000, '120000':140000, '125000':140000, '130000':140000, '135000':140000, '140000':140000},
  '1777': {'70000':100000,'75000':107000,'80000':114000,'85000':121000,'90000':128000,'95000':135000,'100000':140000, '105000':140000, '110000':140000, '115000':140000, '120000':140000, '125000':140000, '130000':140000, '135000':140000, '140000':140000},
  '1779': {'70000':100000,'75000':107000,'80000':114000,'85000':121000,'90000':128000,'95000':135000,'100000':140000, '105000':140000, '110000':140000, '115000':140000, '120000':140000, '125000':140000, '130000':140000, '135000':140000, '140000':140000},
  '1781': {'70000':100000,'75000':107000,'80000':114000,'85000':121000,'90000':128000,'95000':135000,'100000':140000, '105000':140000, '110000':140000, '115000':140000, '120000':140000, '125000':140000, '130000':140000, '135000':140000, '140000':140000},
  '1778': {'150000':214285.71,'160000':228571.43,'170000':242857.14,'180000':257142.86,'190000':271428.57,'200000':285714.29,'210000':300000,'220000':314285.71,'230000':328571.43,'240000':342857.14,'250000':357142.86,'260000':371428.57,'270000':385714.29,'280000':400000,'290000':414285.71, '300000':428571.43},
  '1782': {'150000':214285.71,'160000':228571.43,'170000':242857.14,'180000':257142.86,'190000':271428.57,'200000':285714.29,'210000':300000,'220000':314285.71,'230000':328571.43,'240000':342857.14,'250000':357142.86,'260000':371428.57,'270000':385714.29,'280000':400000,'290000':414285.71, '300000':428571.43},
  '1783': {'80000':115000,'85000':120000,'90000':130000,'95000':135000,'100000':145000,'105000':150000,'110000':160000, '115000':160000, '120000':160000, '125000':160000, '130000':160000, '135000':160000, '140000':160000, '145000':160000, '150000':160000, '155000':160000, '160000':160000},
  '1786': {'180000':257142.86,'190000':271428.57,'200000':285714.29,'210000':300000,'220000':314285.71,'230000':328571.43,'240000':342857.14,'250000':357142.86,'260000':371428.57,'270000':385714.29,'280000':400000,'290000':414285.71,'300000':428571.43,'310000':442857.71,'320000':457142.86,'330000':471428.57,'340000':485714.29,'350000':500000,'360000':514285.71},
  '1788': {'180000':257142.86,'190000':271428.57,'200000':285714.29,'210000':300000,'220000':314285.71,'230000':328571.43,'240000':342857.14,'250000':357142.86,'260000':371428.57,'270000':385714.29,'280000':400000,'290000':414285.71,'300000':428571.43,'310000':442857.71,'320000':457142.86,'330000':471428.57,'340000':485714.29,'350000':500000,'360000':514285.71},
  '1789': {'80000':115000,'85000':120000,'90000':130000,'95000':135000,'100000':145000,'105000':150000,'110000':160000, '115000':160000, '120000':160000, '125000':160000, '130000':160000, '135000':160000, '140000':160000, '145000':160000, '150000':160000, '155000':160000, '160000':160000},
  '1790': {'350000':500000,'400000':571000,'410000':585000,'420000':600000, '450000':600000, '500000':600000, '550000':600000, '600000':600000, '650000':600000, '700000':600000 },
  '1903': {'80000':115000,'85000':120000,'90000':130000,'95000':135000,'100000':145000,'105000':150000,'110000':160000, '115000':160000, '120000':160000, '125000':160000, '130000':160000, '135000':160000, '140000':160000, '145000':160000, '150000':160000, '155000':160000, '160000':160000},
  '1905': {'80000':115000,'85000':120000,'90000':130000,'95000':135000,'100000':145000,'105000':150000,'110000':160000, '115000':160000, '120000':160000, '125000':160000, '130000':160000, '135000':160000, '140000':160000, '145000':160000, '150000':160000, '155000':160000, '160000':160000},
  '1907': {'80000':115000,'85000':120000,'90000':130000,'95000':135000,'100000':145000,'105000':150000,'110000':160000, '115000':160000, '120000':160000, '125000':160000, '130000':160000, '135000':160000, '140000':160000, '145000':160000, '150000':160000, '155000':160000, '160000':160000},
  '1908': {'112000':160000,'119000':170000,'126000':180000,'133000':190000,'140000':200000,'147000':210000,'154000':220000, '110000':220000, '120000':220000, '130000':220000, '140000':220000, '150000':220000, '160000':220000, '170000':220000, '180000':220000, '190000':220000, '200000':220000, '210000':220000, '220000':220000},
};

const SimuladorContext = createContext();

const parseCurrency = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  return parseFloat(String(value).replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
};
const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

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
  // MOTOR DE CÁLCULO V15 (O "Coração" do Sistema)
  // ========================================================================
  
  // Helper 3.1: Calcular Parcela Base
  const calcularParcelaBase = (credito, prazo, taxaAdmTotal, plano, tipoParcela, calcularSeguro, percSeguro) => {
    const taxaSeguroPercent = calcularSeguro ? (parseFloat(String(percSeguro).replace(',', '.')) || 0) / 100 : 0;
    
    if (prazo <= 0) return { parcela: 0, parcelaFinal: null };

    const totalCustosAdm = credito * taxaAdmTotal;
    const sp_r = (credito + totalCustosAdm) * taxaSeguroPercent; //
    const p_Am = credito / prazo; //
    
    let reducao = 1.0; //
    if (tipoParcela === "Reduzida_70") reducao = 0.7;
    if (tipoParcela === "Reduzida_50") reducao = 0.5;

    let p = { parcela: 0, parcelaFinal: null };

    if (plano === "linear") { //
      const adminMensal = (prazo > 0) ? totalCustosAdm / prazo : 0;
      const base = p_Am + adminMensal;
      p.parcela = (base * reducao) + sp_r;
    } else { // "degrau"
      const pontoDeVirada = Math.ceil(prazo / 2);
      const adminMetade = (pontoDeVirada > 0) ? totalCustosAdm / pontoDeVirada : 0;
      const base1 = p_Am + adminMetade;
      const base2 = p_Am;
      p.parcela = (base1 * reducao) + sp_r;
      p.parcelaFinal = (base2 * reducao) + sp_r;
    }
    return p;
  };

  // Motor principal, "memorizado" para rodar apenas quando o 'form' mudar
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
      // CORREÇÃO V3.9/V3.10: Pega as variáveis corretas
      const {
          valorCredito, prazoContratado, calcularSeguro,
          lanceEmbutidoPercentual, mesContemplacao, prazoRealizado, usarLanceValor, lanceTotalValorInput, lanceTotalParcelas,
          baseLance, upgrade, valorUpgrade, tipoPlano, percentualSeguro, // CORREÇÃO V3.26.4
          estrategiaPos, tipoParcela, prazoOriginal, reajusteAnual
      } = dados;
    
      if(!prazoContratado || prazoContratado <= 0) throw new Error("Prazo do contrato inválido.");
      
      //
      const taxaAdmFinal = dados.taxaAdm * (1 - dados.descontoGrandesNegocios / 100);
      const taxaAdmTotalPercent = taxaAdmFinal + dados.fundoReserva + dados.taxaAdesao;
      const taxaAdmTotal = taxaAdmTotalPercent / 100;

      if(isNaN(taxaAdmTotal)) throw new Error("Taxas inválidas.");
    
      // 3.2.1 Crédito Reajustado
      const numReajustes = Math.floor(Math.max(0, mesContemplacao - 1) / 12);
      const valorCreditoReajustado = valorCredito * Math.pow(1 + reajusteAnual / 100, numReajustes);
      
      // 3.2.2 Crédito Final (com Upgrade)
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
          
          // **CORREÇÃO V3.26**: Usar calcularParcelaBase
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
        // Fórmula 3.3.6
        // **CORREÇÃO V3.26**: Usar calcularParcelaBase
        const finalBase = calcularParcelaBase(valorCreditoFinal, prazoContratado, taxaAdmTotal, tipoPlano, "Integral", calcularSeguro, form.percentualSeguro); 
        novaParcela1 = finalBase.parcela - descontoMensal + acrescimoMensalDiferenca;
        novaParcela2 = (finalBase.parcelaFinal !== null ? finalBase.parcelaFinal : finalBase.parcela) - descontoMensal + acrescimoMensalDiferenca;
      } else { // "Crédito_Inicial"
        // Fórmula 3.3.7
        const valorUpgradeEfetivo = valorCreditoFinal - valorCreditoReajustado;
        const taxaAdminUpgrade = valorUpgradeEfetivo * (taxaAdmFinal / 100); // Usa taxa c/ desconto
        const amortUpgradeMensal = (prazoFinal > 0) ? valorUpgradeEfetivo / prazoFinal : 0;
        
        const ta_r_final = valorCreditoFinal * taxaAdmTotal;
        const sp_r_pos = calcularSeguro ? (valorCreditoFinal + ta_r_final) * (percentualSeguro / 100) : 0;
    
        // **CORREÇÃO V3.26**: Usar calcularParcelaBase
        const preBase = calcularParcelaBase(valorCredito, prazoContratado, taxaAdmTotal, tipoPlano, tipoParcela, false, '0');
        const p1_pre_base = preBase.parcela;
        const p2_pre_base = preBase.parcelaFinal !== null ? preBase.parcelaFinal : p1_pre_base;
    
        let taxaUpgradeMensal1a = 0;
        let taxaUpgradeMensal2a = 0;
        
        if (tipoPlano === 'linear') { // 
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
         // CORREÇÃO: O ponto de virada PÓS depende do mês de contemplação
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
      // Nota: 'creditoFinal' não está no objeto data, mas é uma variável calculada
      // e é assumida aqui. Se der erro, deve-se usar o 'valorCreditoFinal' da função simulationResult.
      // Por enquanto, confiamos que o 'preview' será alimentado com o valor correto
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
  // AÇÕES DO ORÇAMENTO
  // ========================================================================
  
  const adicionarSimulacao = () => {
    if (preview && !calculos.alertaFuro) {
      // 1. Pega a quantidade de cotas
      const qtdCotas = parseInt(form.quantidadeCotas) || 1;
      
      // 2. Cria o novo objeto de preview com os valores totais multiplicados
      const previewTotal = {
        ...preview,
        // Multiplica os totais da proposta
        creditoContratado: preview.creditoContratado * qtdCotas,
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
  
  const removerCenario = (idParaRemover) => {
    setCenarios(prev => prev.filter(cenario => cenario.id !== idParaRemover));
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
        quantidadeCotas: prev.quantidadeCotas, // Adicionado para manter a qtd de cotas
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
    adicionarSimulacao,
    limparTudo,
    limparFormulario,
    removerCenario,
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
