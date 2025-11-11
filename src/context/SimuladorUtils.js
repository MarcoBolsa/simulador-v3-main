// ARQUIVO: /src/context/SimuladorUtils.js (VERSÃO 3.27.1 - REGRAS DE NEGÓCIO E UTILS)

// ========================================================================
// REGRAS DE NEGÓCIO (Tabelas de Grupos e Upgrades)
// ========================================================================
export const groupRules = {
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

export const upgradeTables = {
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

// ========================================================================
// FUNÇÕES UTILS (Exportadas para uso em outros módulos)
// ========================================================================
export const parseCurrency = (value) => {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  return parseFloat(String(value).replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
};
export const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

// ========================================================================
// MOTOR DE CÁLCULO HELPER (Exportado para uso em SimuladorProvider)
// ========================================================================

// Helper 3.1: Calcular Parcela Base
export const calcularParcelaBase = (credito, prazo, taxaAdmTotal, plano, tipoParcela, calcularSeguro, percSeguro) => {
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
