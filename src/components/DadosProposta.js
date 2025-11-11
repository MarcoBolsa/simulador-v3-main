import React from 'react';
import { Accordion } from './Accordion';
import { useSimulador } from '../context/SimuladorProvider';

export const DadosProposta = () => {
  const { proposta, setProposta } = useSimulador();

  return (
    <Accordion titulo="Dados da Proposta" icon="proposta" comecaAberto={true}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label htmlFor="nomeCliente" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Cliente
          </label>
          <input
            type="text"
            id="nomeCliente"
            name="nomeCliente"
            placeholder="João Silva"
            className="form-input bg-gray-50"
            value={proposta.nomeCliente}
            onChange={setProposta}
          />
        </div>
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            placeholder="(11) 98765-4321"
            className="form-input bg-gray-50"
            value={proposta.telefone}
            onChange={setProposta}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mail (Opcional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="cliente@exemplo.com"
            className="form-input bg-gray-50"
            value={proposta.email}
            onChange={setProposta}
          />
        </div>
        <div>
          <label htmlFor="objetivoCliente" className="block text-sm font-medium text-gray-700 mb-1">
            Objetivo do Cliente
          </label>
          <input
            type="text"
            id="objetivoCliente"
            name="objetivoCliente"
            placeholder="Compra de Imóvel"
            className="form-input bg-gray-50"
            value={proposta.objetivoCliente}
            onChange={setProposta}
          />
        </div>
      </div>
    </Accordion>
  );
};
