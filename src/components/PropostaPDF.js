// ARQUIVO: /src/components/PropostaPDF.js (NOVO COMPONENTE DE DOCUMENTO FINAL)

import React from 'react';

const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

// Este componente é o layout do documento que será impresso/exportado para PDF.
export const PropostaPDF = ({ dados }) => {
    if (!dados || dados.cenariosDetalhados.length === 0) {
        return <div className="text-center p-8 text-gray-600">Nenhum dado de proposta para visualização.</div>;
    }

    const { dadosIniciais, resumoGeral, cenariosDetalhados } = dados;

    return (
        <div className="p-8 font-sans bg-white min-h-screen">
            
            {/* CABEÇALHO E DADOS DO CLIENTE */}
            <header className="mb-8 pb-4 border-b border-gray-300">
                <h1 className="text-3xl font-bold text-gray-800">PROPOSTA DE CONSÓRCIO ESTRATÉGICA</h1>
                <p className="text-sm text-gray-500 mt-1">Data de Geração: {dados.dataGeracao}</p>
                
                <div className="mt-4 grid grid-cols-2 text-sm">
                    <div>
                        <p className="font-semibold text-gray-700">Cliente: {dadosIniciais.nomeCliente || 'Não Informado'}</p>
                        <p className="text-gray-600">Objetivo: {dadosIniciais.objetivoCliente || 'Não Informado'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600">Telefone: {dadosIniciais.telefone}</p>
                        <p className="text-gray-600">Email: {dadosIniciais.email}</p>
                    </div>
                </div>
            </header>

            {/* RESUMO GERAL */}
            <section className="mb-8 p-4 bg-gray-50 rounded-lg border">
                <h2 className="text-xl font-bold mb-3 text-gray-700">Resumo Total do Orçamento</h2>
                <div className="grid grid-cols-5 gap-4 text-center text-sm">
                    <div><span className="font-medium text-gray-500 block">Crédito Líquido</span><span className="font-extrabold text-green-600">{formatCurrency(resumoGeral.creditoLiquidoTotal)}</span></div>
                    <div><span className="font-medium text-gray-500 block">Lance Bolso</span><span className="font-extrabold text-orange-600">{formatCurrency(resumoGeral.lanceBolsoTotal)}</span></div>
                    <div><span className="font-medium text-gray-500 block">Parcela Pré Total</span><span className="font-extrabold">{formatCurrency(resumoGeral.parcelaPreTotal)}</span></div>
                    <div><span className="font-medium text-gray-500 block">Parcela Pós Total</span><span className="font-extrabold">{formatCurrency(resumoGeral.parcelaPosTotal)}</span></div>
                    <div><span className="font-medium text-gray-500 block">Lance Total (Geral)</span><span className="font-extrabold text-purple-600">{formatCurrency(resumoGeral.lanceTotalGeral)}</span></div>
                </div>
            </section>

            {/* DETALHES DOS CENÁRIOS */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Cenários Detalhados</h2>
                {cenariosDetalhados.map((cenario, index) => (
                    <div key={cenario.id} className="p-4 border rounded-lg shadow-sm">
                        <h3 className="text-lg font-bold mb-2">
                            {cenario.nome}
                            {cenario.qtdCotas > 1 && <span className="ml-2 text-sm text-gray-500">({cenario.qtdCotas} Cotas)</span>}
                        </h3>

                        <div className="grid grid-cols-4 gap-4 text-sm mt-3">
                            <div><span className="font-medium text-gray-500 block">Grupo/Cota</span><span className="font-semibold">{cenario.resultados.grupo}</span></div>
                            <div><span className="font-medium text-gray-500 block">Crédito por Cota</span><span className="font-semibold">{formatCurrency(cenario.resultados.creditoUnitario)}</span></div>
                            <div><span className="font-medium text-gray-500 block">Crédito Líquido Total</span><span className="font-semibold text-green-600">{formatCurrency(cenario.resultados.creditoLiquido)}</span></div>
                            <div><span className="font-medium text-gray-500 block">Prazo Contratado</span><span className="font-semibold">{cenario.resultados.prazo} meses</span></div>
                        </div>

                        <div className="mt-4 border-t pt-3">
                            <h4 className="font-bold text-gray-700 mb-1">Pagamentos e Lances</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-500">Parcela Pré ({cenario.resultados.tipoParcela}): <span className="font-semibold">{formatCurrency(cenario.resultados.parcelaPre.valor)}</span></p>
                                    <p className="text-xs text-gray-500 ml-2">{cenario.resultados.parcelaPre.detalhes}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Parcela Pós ({cenario.resultados.prazo} meses): <span className="font-semibold">{formatCurrency(cenario.resultados.parcelaPos.valor)}</span></p>
                                    <p className="text-xs text-gray-500 ml-2">{cenario.resultados.parcelaPos.detalhes}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Lance Bolso: <span className="font-semibold">{formatCurrency(cenario.resultados.lanceBolso)}</span></p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Lance Total: <span className="font-semibold">{formatCurrency(cenario.resultados.lanceTotal)}</span></p>
                                </div>
                            </div>
                        </div>

                        {cenario.observacoes && (
                            <p className="mt-3 p-2 bg-yellow-50 text-xs rounded">Observações: {cenario.observacoes}</p>
                        )}
                    </div>
                ))}
            </section>
            
            <footer className="mt-8 pt-4 border-t text-xs text-gray-500 text-center">
                Documento gerado pelo Simulador V3.27.3. Consulte as regras do consórcio para validação final.
            </footer>
        </div>
    );
};
