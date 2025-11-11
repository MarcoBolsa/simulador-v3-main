import React, { useState } from 'react';
import { useSimulador } from '../context/SimuladorProvider';

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

export const CenarioCard = ({ cenario }) => {
  const { removerCenario } = useSimulador();
  const [verDetalhes, setVerDetalhes] = useState(false);
  
  const { nome, preview } = cenario;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-3 border border-gray-200">
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-700">Grupo: {cenario.inputs.grupoNo}</p>
        <button 
          onClick={() => removerCenario(cenario.id)} 
          className="text-gray-400 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>
      </div>
      <h3 className="font-bold text-xl text-green-600 -mt-3">
        CRÉDITO: {formatCurrency(preview.creditoContratado)}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <label className="text-xs font-medium text-green-800">CRÉDITO LÍQUIDO</label>
          <p className="text-xl font-bold text-green-800">{formatCurrency(preview.creditoLiquido)}</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <label className="text-xs font-medium text-gray-600">PARCELA PRÉ</label>
          <p className="text-xl font-bold text-gray-800">{formatCurrency(preview.parcelaPre.valor)}</p>
          <span className="text-xs text-gray-500 truncate" title={preview.parcelaPre.detalhes}>{preview.parcelaPre.detalhes}</span>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <label className="text-xs font-medium text-orange-800">LANCE BOLSO</label>
          <p className="text-xl font-bold text-orange-800">{formatCurrency(preview.lanceBolso)}</p>
          <span className="text-xs text-orange-600">
            {((preview.lanceBolso / preview.creditoLiquido) * 100 || 0).toFixed(1)}% do líquido
          </span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <label className="text-xs font-medium text-blue-800">PARCELA PÓS</label>
          <p className="text-xl font-bold text-blue-800">{formatCurrency(preview.parcelaPos.valor)}</p>
          <span className="text-xs text-blue-600 truncate" title={preview.parcelaPos.detalhes}>{preview.parcelaPos.detalhes}</span>
        </div>
      </div>

      <button 
        onClick={() => setVerDetalhes(!verDetalhes)}
        className="w-full flex justify-center items-center gap-2 p-3 bg-gray-100 rounded-lg text-blue-600 font-medium hover:bg-gray-200"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform ${verDetalhes ? 'rotate-180' : ''}`}><path d="M15 7.5L10 12.5L5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {verDetalhes ? 'Ocultar detalhes' : 'Ver detalhes completos'}
      </button>

      {verDetalhes && (
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 grid grid-cols-2 gap-x-4 gap-y-1">
          <strong>Lance Total:</strong><span>{formatCurrency(preview.detalhes.lanceTotal)}</span>
          <strong>Lance Embutido:</strong><span>{formatCurrency(preview.detalhes.lanceEmbutido)}</span>
          <strong>Custo do Furo:</strong><span>{formatCurrency(preview.detalhes.custoDoFuro)}</span>
          <strong>Prazo:</strong><span>{preview.detalhes.prazo}</span>
          <strong>Contemplação:</strong><span>{preview.detalhes.contemplacao}</span>
          <strong>Plano:</strong><span>{preview.detalhes.plano}</span>
          <strong>Tipo Parcela:</strong><span>{preview.detalhes.tipoParcela}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <button className="text-sm btn-secondary flex-1">Editar Nome</button>
        <button className="text-sm btn-secondary flex-1">Editar</button>
        <button className="text-sm btn-secondary flex-1">Duplicar</button>
      </div>
      
      <div>
        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{nome}</span>
      </div>
    </div>
  );
};
