"use client";

import React from "react";
import { FormDataDeclaracoes } from "@/utils/generatePdf";

interface DocumentPreviewProps {
  data: FormDataDeclaracoes;
}

function formatDate(iso: string): string {
  if (!iso) return "____/____/________";
  const p = iso.split("-");
  return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : iso;
}

export default function DocumentPreview({ data }: DocumentPreviewProps) {
  const dataExtenso = data.dataOitiva || "29 de outubro de 2026";
  const cidade = data.cidade || "Penápolis";
  const delegacia = data.delegaciaNome || "sede da DDM Penápolis";
  const delegada = data.delegadaNome || "Dra. Flávia Santin Torres";
  const escriva = data.escrivaNome || "Thais Aparecida Bassi Soares";

  const vitimaNome = data.vitimaNome || "...................";
  const vitimaRg = data.vitimaRg || ".....";
  const vitimaCpf = data.vitimaCpf || "......";
  const vitimaNasc = data.vitimaNascimento ? formatDate(data.vitimaNascimento) : ".....";
  const vitimaFil = data.vitimaFiliacao || "....... e .........";
  const vitimaEsc = data.vitimaEscolaridade || "ensino médio completo";
  const vitimaNat = data.vitimaNaturalidade || "Penápolis-SP";
  const vitimaEnd = data.vitimaEndereco || "........– Penápolis/SP";
  const vitimaTel = data.vitimaTelefone || "(18) ........";

  const dataIni = formatDate(data.dataInicio);
  const dataFimStr = data.perduraAteHoje
    ? "até a presente data"
    : data.dataFim
    ? `até ${formatDate(data.dataFim)}`
    : "até ____/____/________";

  const autorDesc = data.autorNome
    ? `${data.autorNome}${data.autorVulgo ? ` ("${data.autorVulgo}")` : ""}${data.autorVinculo ? ` (${data.autorVinculo})` : ""}`
    : "o investigado";

  const fazUso = data.fazUsoMedicamentos === "SIM";

  return (
    <div
      id="documento-termo-folha"
      className="bg-white text-black p-8 md:p-12 shadow-2xl rounded-sm border border-slate-300 max-w-[850px] mx-auto text-justify text-[10pt] leading-[1.65] font-['Segoe_UI',Arial,sans-serif]"
    >
      {/* Cabeçalho Oficial SP */}
      <div className="flex items-center gap-4 border-b border-slate-300 pb-3 mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brasao-pcsp.png"
          alt="Brasão da Polícia Civil do Estado de São Paulo"
          className="w-16 h-auto object-contain flex-shrink-0"
        />
        <div className="border-l border-slate-300 pl-4 text-xs font-sans text-slate-800 leading-tight">
          <p className="font-bold tracking-wide">SECRETARIA DA SEGURANÇA PÚBLICA</p>
          <p className="font-bold tracking-wide">POLÍCIA CIVIL DO ESTADO DE SÃO PAULO</p>
          <p>Departamento de Polícia Judiciária de São Paulo Interior – Deinter 10</p>
          <p>Delegacia Seccional de Polícia de Araçatuba</p>
          <p>Delegacia de Polícia de Defesa da Mulher do Município de Penápolis/SP</p>
        </div>
      </div>

      {/* Título */}
      <div className="text-center font-bold text-sm tracking-wider uppercase mb-5 text-black">
        TERMO DE DECLARAÇÕES
      </div>

      {/* Preâmbulo */}
      <p className="mb-4">
        Aos {dataExtenso}, nesta cidade de {cidade}, no Estado de São Paulo, na {delegacia}, sob
        orientação da Exma. Sra. {delegada}, Delegada de Polícia respectivo, comigo {escriva},
        Escrivã de Polícia ad hoc de seu cargo nomeada e assinada, comparece{" "}
        <strong className="font-semibold">{vitimaNome}</strong>, RG: {vitimaRg}, CPF: {vitimaCpf},{" "}
        nascida em {vitimaNasc}, filha de {vitimaFil}, {vitimaEsc}, nascida em {vitimaNat}, endereço
        residencial {vitimaEnd}; telefone Celular {vitimaTel}. Sabendo ler e escrever, declarou que:
      </p>

      {/* Item 1 */}
      <p className="mb-3">
        <strong>1.</strong> Que as condutas de perseguição praticadas pelo investigado (
        {autorDesc}) se iniciaram na data de {dataIni} e perduraram {dataFimStr}.
      </p>

      {/* Item 2 */}
      <p className="mb-3">
        <strong>2.</strong> Que, ao todo, a declarante estima que ocorreram aproximadamente{" "}
        <strong>{data.qtdEpisodios || "_____"}</strong> episódios específicos de abordagem ou investida,
        ocorridos nas seguintes datas ou períodos aproximados:{" "}
        {data.periodosCriticos ||
          "________________________________________________________________________________________."}
      </p>

      {/* Item 3 */}
      <div className="mb-3">
        <p>
          <strong>3.</strong> Que ocorreram abordagens presenciais nos seguintes termos:
        </p>
        {data.episodios && data.episodios.length > 0 ? (
          data.episodios.map((ep, i) => (
            <p key={ep.id} className="pl-4 mt-1">
              - Episódio {i + 1}: No dia {formatDate(ep.data)}, por volta das{" "}
              {ep.hora ? `${ep.hora} horas` : "____:____ horas"}, no local{" "}
              {ep.local || "________________________________________"}, ocasião em que o investigado{" "}
              {ep.conduta ||
                "____________________________________________________________________________________."}
            </p>
          ))
        ) : (
          <>
            <p className="pl-4 mt-1">
              - Episódio 1: No dia ____/____/________, por volta das ____:____ horas, no local
              ________________________________________, ocasião em que o investigado
              ____________________________________________________________________________________.
            </p>
            <p className="pl-4 mt-1">
              - Episódio 2: No dia ____/____/________, por volta das ____:____ horas, no local
              ________________________________________, ocasião em que o investigado
              ____________________________________________________________________________________.
            </p>
          </>
        )}
      </div>

      {/* Item 4 */}
      <p className="mb-3">
        <strong>4.</strong> Que o investigado compareceu outras vezes à sua residência, ao seu local
        de trabalho ou a locais por ela frequentados, especificamente em:{" "}
        {data.locaisFrequentes ||
          "________________________________________________________________________________________."}
      </p>

      {/* Item 5 */}
      <p className="mb-3">
        <strong>5.</strong> Que o investigado efetuou contatos através de ligações telefônicas,
        mensagens de texto (SMS), WhatsApp, redes sociais ou outros aplicativos.
      </p>

      {/* Item 6 */}
      <div className="mb-3">
        <p>
          <strong>6.</strong> Que os meios de contato utilizados pelo investigado foram:
        </p>
        <p className="pl-4 mt-1">
          - Números de telefone/WhatsApp:{" "}
          {data.canaisAutorTelefones ||
            "________________________________________________________"}
        </p>
        <p className="pl-4 mt-1">
          - Perfis em redes sociais / E-mails:{" "}
          {data.canaisAutorPerfis ||
            "____________________________________________________"}
        </p>
        <p className="pl-4 mt-1">
          - Números/Contas da declarante contatados:{" "}
          {data.canaisVitimaAtingidos ||
            "____________________________________________"}
        </p>
      </div>

      {/* Item 7 */}
      <p className="mb-3">
        <strong>7.</strong> Que concretamente o investigado disse ou escreveu o seguinte nos
        contatos mais relevantes:{" "}
        {data.mensagensTexto ||
          "________________________________________________________________________________________."}
      </p>

      {/* Item 8 */}
      <p className="mb-3">
        <strong>8.</strong> Que a declarante manifestou expressamente ao investigado que não desejava
        mais manter qualquer tipo de comunicação com ele.
      </p>

      {/* Item 9 */}
      <p className="mb-3">
        <strong>9.</strong> Que referida recusa foi externada na data de{" "}
        {formatDate(data.oposicaoData)}, por meio de{" "}
        {data.oposicaoMeio || "________________________"}, nos seguintes termos:{" "}
        {data.oposicaoTermos ||
          "________________________________________________________________________________________."}
      </p>

      {/* Item 10 */}
      <p className="mb-3">
        <strong>10.</strong> Que, mesmo após a expressa recusa, o investigado deu continuidade aos
        contatos e à perseguição.
      </p>

      {/* Item 11 */}
      <p className="mb-3">
        <strong>11.</strong> Que as condutas do investigado perturbaram e restringiram sua liberdade,
        privacidade e rotina diária.
      </p>

      {/* Item 12 */}
      <p className="mb-3">
        <strong>12.</strong> Que, em razão da situação, a declarante precisou adotar as seguintes
        alterações em sua vida cotidiana:{" "}
        {data.rotinaMudancas ||
          "________________________________________________________________________________________."}
      </p>

      {/* Item 13 */}
      <p className="mb-4">
        <strong>13.</strong> Que, em decorrência do abalo emocional e psicológico sofrido por conta da
        perseguição, a declarante ({fazUso ? " X " : "   "}) FAZ ({!fazUso ? " X " : "   "}) NÃO FAZ
        uso de medicamentos controlados (como antidepressivos ou ansiolíticos)
        {data.medicamentosQuais ? ` (${data.medicamentosQuais})` : ""}, receitados em{" "}
        {formatDate(data.medicamentosDataReceita)}.
      </p>

      {/* Seção VI */}
      <p className="font-bold uppercase tracking-wide text-xs mb-2 text-slate-800">
        VI. DAS PROVAS MATERIAIS, IMAGENS E LAUDOS MÉDICOS
      </p>

      {/* Item 14 */}
      <div className="mb-4">
        <p>
          <strong>14.</strong> Que a declarante possui e disponibiliza para juntada as seguintes
          provas materiais:
        </p>
        <p className="pl-4 mt-1">
          - Prints / Capturas de tela: ({data.provaPrints ? " X " : "   "}) SIM (
          {!data.provaPrints ? " X " : "   "}) NÃO — Detalhes:{" "}
          {data.provaPrintsObs || "_______________________________"}
        </p>
        <p className="pl-4 mt-1">
          - Arquivos de áudio / Vídeo / Fotos: ({data.provaAudios ? " X " : "   "}) SIM (
          {!data.provaAudios ? " X " : "   "}) NÃO — Detalhes:{" "}
          {data.provaAudiosObs || "______________________"}
        </p>
        <p className="pl-4 mt-1">
          - Imagens de câmeras de segurança: ({data.provaCftv ? " X " : "   "}) SIM (
          {!data.provaCftv ? " X " : "   "}) NÃO — Detalhes:{" "}
          {data.provaCftvObs || "________________________"}
        </p>
        <p className="pl-4 mt-1">
          - Relatórios / Atestados Médicos ou Psicológicos: ({data.provaLaudos ? " X " : "   "}) SIM (
          {!data.provaLaudos ? " X " : "   "}) NÃO — Detalhes:{" "}
          {data.provaLaudosObs || "__________"}
        </p>
      </div>

      {/* Seção VII */}
      <p className="font-bold uppercase tracking-wide text-xs mb-2 text-slate-800">
        VII. DAS TESTEMUNHAS
      </p>

      {/* Item 15 */}
      <div className="mb-6">
        <p>
          <strong>15.</strong> Que as seguintes pessoas presenciaram as abordagens, ouviram
          ligações, visualizaram mensagens ou viram o investigado nas proximidades:
        </p>
        <p className="pl-4 mt-1">
          - Testemunha 1: Nome: {data.testemunha1Nome || "____________________________________"} |
          Relação: {data.testemunha1Relacao || "___________________"} | Tel:{" "}
          {data.testemunha1Telefone || "_________________"}
        </p>
        <p className="pl-4 mt-1">
          - Testemunha 2: Nome: {data.testemunha2Nome || "____________________________________"} |
          Relação: {data.testemunha2Relacao || "___________________"} | Tel:{" "}
          {data.testemunha2Telefone || "_________________"}
        </p>
      </div>

      {/* Fecho */}
      <p className="mb-10">
        Nada mais disse e nem lhe foi perguntado. Lido e achado conforme, assina a presente
        declaração juntamente com a Autoridade Policial e o(a) Escrivão(ã) de Polícia.
      </p>

      {/* Assinaturas */}
      <div className="grid grid-cols-3 gap-6 text-center text-xs mt-8">
        <div>
          <div className="border-t border-black pt-1 font-semibold">{delegada}</div>
          <div className="text-slate-600 text-[9pt]">Delegada de Polícia</div>
        </div>
        <div>
          <div className="border-t border-black pt-1 font-semibold">{escriva}</div>
          <div className="text-slate-600 text-[9pt]">Escrivã de Polícia ad hoc</div>
        </div>
        <div>
          <div className="border-t border-black pt-1 font-semibold">
            {data.vitimaNome || "Heloisa Arcilla Richart"}
          </div>
          <div className="text-slate-600 text-[9pt]">Declarante</div>
        </div>
      </div>

      <div className="max-w-xs mx-auto text-center text-xs mt-8">
        <div className="border-t border-black pt-1 font-semibold">
          {data.testemunhaPresencialNome || "Jeferson Garcia Arcilla"}
        </div>
        <div className="text-slate-600 text-[9pt]">Testemunha Presencial</div>
      </div>

      {/* Rodapé do Formulário */}
      <div className="mt-12 pt-4 border-t border-slate-300 text-center text-[8pt] text-slate-500 leading-tight">
        <p>Avenida Bento da Cruz nº 223 – Bº Centro - Penápolis/SP - CEP: 16300-011</p>
        <p>(18) 3652-1951 – ddm.penapolis@policiacivil.sp.gov.br</p>
      </div>
    </div>
  );
}
