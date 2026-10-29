import { jsPDF } from "jspdf";
import { BRASAO_BASE64 } from "./brasaoBase64";

export interface EpisodioPresencial {
  id: string;
  data: string;
  hora: string;
  local: string;
  conduta: string;
}

export interface FormDataDeclaracoes {
  // Dados do Cartório e Autoridades
  dataOitiva: string; // Ex: 29 de outubro de 2026
  cidade: string;
  delegaciaNome: string;
  delegadaNome: string;
  delegadaCargo: string;
  escrivaNome: string;
  escrivaCargo: string;

  // Declarante
  vitimaNome: string;
  vitimaRg: string;
  vitimaCpf: string;
  vitimaNascimento: string;
  vitimaFiliacao: string;
  vitimaEscolaridade: string;
  vitimaNaturalidade: string;
  vitimaEndereco: string;
  vitimaTelefone: string;

  // Investigado
  autorNome: string;
  autorVulgo: string;
  autorVinculo: string;

  // I. Início e Período
  dataInicio: string;
  dataFim: string;
  perduraAteHoje: boolean;
  qtdEpisodios: string;
  periodosCriticos: string;

  // II. Contatos Presenciais
  episodios: EpisodioPresencial[];
  locaisFrequentes: string;

  // III. Contatos Telefônicos e Digitais
  meiosContato: {
    ligacoes: boolean;
    whatsapp: boolean;
    sms: boolean;
    instagram: boolean;
    email: boolean;
    outros: boolean;
    outrosTexto: string;
  };
  canaisAutorTelefones: string;
  canaisAutorPerfis: string;
  canaisVitimaAtingidos: string;
  mensagensTexto: string;
  oposicaoData: string;
  oposicaoMeio: string;
  oposicaoTermos: string;
  houveContinuidadeAposRecusa: boolean;

  // IV. Impactos
  rotinaMudancas: string;
  fazUsoMedicamentos: "SIM" | "NAO";
  medicamentosDataReceita: string;
  medicamentosQuais: string;

  // Provas Materiais (Item 14)
  provaPrints: boolean;
  provaPrintsObs: string;
  provaAudios: boolean;
  provaAudiosObs: string;
  provaCftv: boolean;
  provaCftvObs: string;
  provaLaudos: boolean;
  provaLaudosObs: string;

  // Testemunhas (Item 15)
  testemunha1Nome: string;
  testemunha1Relacao: string;
  testemunha1Telefone: string;
  testemunha2Nome: string;
  testemunha2Relacao: string;
  testemunha2Telefone: string;

  // Assinaturas Adicionais
  declaranteAssinaturaNome?: string;
  testemunhaPresencialNome?: string;
}

function formatDateBr(isoDate: string): string {
  if (!isoDate) return "____/____/________";
  const parts = isoDate.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return isoDate;
}

export function generatePdfTermo(data: FormDataDeclaracoes) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const leftMargin = 20;
  const rightMargin = 20;
  const contentWidth = pageWidth - leftMargin - rightMargin;
  const topMargin = 50; // space reserved for header
  const bottomMargin = 25; // space reserved for footer

  let currentY = topMargin;

  function drawHeader() {
    // Brasão PCSP
    try {
      doc.addImage(BRASAO_BASE64, "PNG", leftMargin, 10, 18, 24);
    } catch {
      // fallback if image fail
    }

    // Linha vertical separadora
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.line(leftMargin + 22, 10, leftMargin + 22, 36);

    // Texto do cabeçalho
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);

    const headerTextX = leftMargin + 25;
    let headerY = 13.5;
    const headerLines = [
      "SECRETARIA DA SEGURANÇA PÚBLICA",
      "POLÍCIA CIVIL DO ESTADO DE SÃO PAULO",
      "Departamento de Polícia Judiciária de São Paulo Interior – Deinter 10",
      "Delegacia Seccional de Polícia de Araçatuba",
      "Delegacia de Polícia de Defesa da Mulher do Município de Penápolis/SP",
    ];

    headerLines.forEach((line) => {
      doc.text(line, headerTextX, headerY);
      headerY += 4.5;
    });

    // Linha horizontal separadora abaixo do cabeçalho
    doc.setDrawColor(210, 210, 210);
    doc.line(leftMargin, 38, pageWidth - rightMargin, 38);
  }

  function drawFooter(pageNumber: number, totalPages: number) {
    // Linha horizontal
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.2);
    doc.line(leftMargin, pageHeight - 18, pageWidth - rightMargin, pageHeight - 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(80, 80, 80);

    // Rodapé centralizado
    const fLine1 = "Avenida Bento da Cruz nº 223 – Bº Centro - Penápolis/SP - CEP: 16300-011";
    const fLine2 = "(18) 3652-1951 – ddm.penapolis@policiacivil.sp.gov.br";
    doc.text(fLine1, pageWidth / 2, pageHeight - 13, { align: "center" });
    doc.text(fLine2, pageWidth / 2, pageHeight - 9, { align: "center" });

    // Data e página no canto direito
    const todayFormatted = new Date().toLocaleDateString("pt-BR");
    doc.text(`Data: ${todayFormatted}`, pageWidth - rightMargin, pageHeight - 13, { align: "right" });
    doc.text(`Página ${pageNumber} de ${totalPages}`, pageWidth - rightMargin, pageHeight - 9, { align: "right" });
  }

  function checkPageBreak(requiredHeight: number) {
    if (currentY + requiredHeight > pageHeight - bottomMargin) {
      doc.addPage();
      currentY = 44; // start below header on next pages
    }
  }

  // Draw first page header
  drawHeader();
  currentY = 46;

  // Título: TERMO DE DECLARAÇÕES
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("TERMO DE DECLARAÇÕES", pageWidth / 2, currentY, { align: "center" });
  currentY += 8;

  // Preâmbulo
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);

  const dataExtenso = data.dataOitiva || "29 de outubro de 2026";
  const cidade = data.cidade || "Penápolis";
  const delegacia = data.delegaciaNome || "sede da DDM Penápolis";
  const delegada = data.delegadaNome || "Dra. Flávia Santin Torres";
  const escriva = data.escrivaNome || "Thais Aparecida Bassi Soares";

  const vitimaNome = data.vitimaNome || "...................";
  const vitimaRg = data.vitimaRg || "...................";
  const vitimaCpf = data.vitimaCpf || "...................";
  const vitimaNasc = data.vitimaNascimento ? formatDateBr(data.vitimaNascimento) : ".....";
  const vitimaFil = data.vitimaFiliacao || "....... e .........";
  const vitimaEsc = data.vitimaEscolaridade || "ensino médio completo";
  const vitimaNat = data.vitimaNaturalidade || "Penápolis-SP";
  const vitimaEnd = data.vitimaEndereco || "...................";
  const vitimaTel = data.vitimaTelefone || "(18) ........";

  const preambulo = `Aos ${dataExtenso}, nesta cidade de ${cidade}, no Estado de São Paulo, na ${delegacia}, sob orientação da Exma. Sra. ${delegada}, Delegada de Polícia respectivo, comigo ${escriva}, Escrivã de Polícia ad hoc de seu cargo nomeada e assinada, comparece ${vitimaNome}, RG: ${vitimaRg}, CPF: ${vitimaCpf}, nascida em ${vitimaNasc}, filha de ${vitimaFil}, ${vitimaEsc}, natural de ${vitimaNat}, residente e domiciliada à ${vitimaEnd}; telefone Celular ${vitimaTel}. Sabendo ler e escrever, inquirida a respeito dos fatos, declarou que:`;

  const preambuloLines = doc.splitTextToSize(preambulo, contentWidth);
  checkPageBreak(preambuloLines.length * 4.8);
  doc.text(preambuloLines, leftMargin, currentY, { align: "justify", maxWidth: contentWidth });
  currentY += preambuloLines.length * 4.8 + 5;

  // Itens enumerados
  function addParagraph(num: number, text: string, prefixBold = true) {
    const fullText = prefixBold ? `${num}. ${text}` : text;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const lines = doc.splitTextToSize(fullText, contentWidth);
    checkPageBreak(lines.length * 4.8 + 2.5);
    doc.text(lines, leftMargin, currentY, { align: "justify", maxWidth: contentWidth });
    currentY += lines.length * 4.8 + 3.5;
  }

  function addSubItem(text: string) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const lines = doc.splitTextToSize(`- ${text}`, contentWidth - 4);
    checkPageBreak(lines.length * 4.8 + 2);
    doc.text(lines, leftMargin + 4, currentY, { align: "justify", maxWidth: contentWidth - 4 });
    currentY += lines.length * 4.8 + 2.5;
  }

  function addSectionHeader(title: string) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    checkPageBreak(8);
    currentY += 2;
    doc.text(title, leftMargin, currentY);
    currentY += 5;
  }

  // 1. Início e término
  const dataIni = formatDateBr(data.dataInicio);
  const dataFimStr = data.perduraAteHoje
    ? "até a presente data"
    : data.dataFim
    ? `até ${formatDateBr(data.dataFim)}`
    : "até ____/____/________";
  const autorIdent = data.autorNome ? `${data.autorNome}${data.autorVulgo ? ` ("${data.autorVulgo}")` : ""}${data.autorVinculo ? ` (${data.autorVinculo})` : ""}` : "o investigado";

  addParagraph(
    1,
    `Que as condutas de perseguição praticadas por ${autorIdent} se iniciaram na data de ${dataIni} e perduraram ${dataFimStr}.`
  );

  // 2. Quantidade de episódios
  const qtdEp = data.qtdEpisodios || "_____";
  const periodos = data.periodosCriticos || "________________________________________________________________________________________";
  addParagraph(
    2,
    `Que, ao todo, a declarante estima que ocorreram aproximadamente ${qtdEp} episódios específicos de abordagem ou investida, ocorridos nas seguintes datas ou períodos aproximados: ${periodos}.`
  );

  // 3. Abordagens presenciais
  addParagraph(3, "Que ocorreram abordagens presenciais nos seguintes termos:");
  if (data.episodios && data.episodios.length > 0) {
    data.episodios.forEach((ep, index) => {
      const d = formatDateBr(ep.data);
      const h = ep.hora ? `${ep.hora} horas` : "____:____ horas";
      const l = ep.local || "________________________________________";
      const c = ep.conduta || "____________________________________________________________________________________";
      addSubItem(`Episódio ${index + 1}: No dia ${d}, por volta das ${h}, no local ${l}, ocasião em que o investigado ${c}.`);
    });
  } else {
    addSubItem("Episódio 1: No dia ____/____/________, por volta das ____:____ horas, no local ________________________________________, ocasião em que o investigado ____________________________________________________________________________________.");
    addSubItem("Episódio 2: No dia ____/____/________, por volta das ____:____ horas, no local ________________________________________, ocasião em que o investigado ____________________________________________________________________________________.");
  }

  // 4. Comparecimento em residência/trabalho
  const freq = data.locaisFrequentes || "________________________________________________________________________________________";
  addParagraph(
    4,
    `Que o investigado compareceu outras vezes à sua residência, ao seu local de trabalho ou a locais por ela frequentados, especificamente em: ${freq}.`
  );

  // 5. Contatos digitais/telefônicos
  addParagraph(
    5,
    "Que o investigado efetuou contatos através de ligações telefônicas, mensagens de texto (SMS), WhatsApp, redes sociais ou outros aplicativos."
  );

  // 6. Meios de contato
  addParagraph(6, "Que os meios de contato utilizados pelo investigado foram:");
  addSubItem(`Números de telefone/WhatsApp: ${data.canaisAutorTelefones || "________________________________________________________"}`);
  addSubItem(`Perfis em redes sociais / E-mails: ${data.canaisAutorPerfis || "____________________________________________________"}`);
  addSubItem(`Números/Contas da declarante contatados: ${data.canaisVitimaAtingidos || "____________________________________________"}`);

  // 7. O que disse/escreveu
  const msgRelevantes = data.mensagensTexto || "________________________________________________________________________________________";
  addParagraph(
    7,
    `Que concretamente o investigado disse ou escreveu o seguinte nos contatos mais relevantes: ${msgRelevantes}.`
  );

  // 8. Oposição manifestada
  addParagraph(
    8,
    "Que a declarante manifestou expressamente ao investigado que não desejava mais manter qualquer tipo de comunicação com ele."
  );

  // 9. Recusa externada
  const opData = formatDateBr(data.oposicaoData);
  const opMeio = data.oposicaoMeio || "________________________";
  const opTermos = data.oposicaoTermos || "________________________________________________________________________________________";
  addParagraph(
    9,
    `Que referida recusa foi externada na data de ${opData}, por meio de ${opMeio}, nos seguintes termos: ${opTermos}.`
  );

  // 10. Continuidade
  addParagraph(
    10,
    "Que, mesmo após a expressa recusa, o investigado deu continuidade aos contatos e à perseguição."
  );

  // 11. Perturbação da liberdade
  addParagraph(
    11,
    "Que as condutas do investigado perturbaram e restringiram sua liberdade, privacidade e rotina diária."
  );

  // 12. Alterações de rotina
  const mudancas = data.rotinaMudancas || "________________________________________________________________________________________";
  addParagraph(
    12,
    `Que, em razão da situação, a declarante precisou adotar as seguintes alterações em sua vida cotidiana: ${mudancas}.`
  );

  // 13. Uso de medicamentos
  const fazUso = data.fazUsoMedicamentos === "SIM";
  const recData = formatDateBr(data.medicamentosDataReceita);
  const recDesc = data.medicamentosQuais ? ` (${data.medicamentosQuais})` : "";
  addParagraph(
    13,
    `Que, em decorrência do abalo emocional e psicológico sofrido por conta da perseguição, a declarante (${fazUso ? " X " : "   "}) FAZ  (${!fazUso ? " X " : "   "}) NÃO FAZ uso de medicamentos controlados (como antidepressivos ou ansiolíticos)${recDesc}, receitados em ${recData}.`
  );

  // Seção VI
  addSectionHeader("VI. DAS PROVAS MATERIAIS, IMAGENS E LAUDOS MÉDICOS");

  // 14. Provas materiais
  addParagraph(14, "Que a declarante possui e disponibiliza para juntada as seguintes provas materiais:");
  const simNao = (val: boolean) => `(${val ? " X " : "   "}) SIM  (${!val ? " X " : "   "}) NÃO`;

  addSubItem(`Prints / Capturas de tela: ${simNao(data.provaPrints)} — Detalhes: ${data.provaPrintsObs || "_______________________________"}`);
  addSubItem(`Arquivos de áudio / Vídeo / Fotos: ${simNao(data.provaAudios)} — Detalhes: ${data.provaAudiosObs || "______________________"}`);
  addSubItem(`Imagens de câmeras de segurança: ${simNao(data.provaCftv)} — Detalhes: ${data.provaCftvObs || "________________________"}`);
  addSubItem(`Relatórios / Atestados Médicos ou Psicológicos: ${simNao(data.provaLaudos)} — Detalhes: ${data.provaLaudosObs || "__________"}`);

  // Seção VII
  addSectionHeader("VII. DAS TESTEMUNHAS");

  // 15. Testemunhas
  addParagraph(
    15,
    "Que as seguintes pessoas presenciaram as abordagens, ouviram ligações, visualizaram mensagens ou viram o investigado nas proximidades:"
  );
  const t1Nome = data.testemunha1Nome || "____________________________________";
  const t1Rel = data.testemunha1Relacao || "___________________";
  const t1Tel = data.testemunha1Telefone || "_________________";
  addSubItem(`Testemunha 1: Nome: ${t1Nome} | Relação: ${t1Rel} | Tel: ${t1Tel}`);

  const t2Nome = data.testemunha2Nome || "____________________________________";
  const t2Rel = data.testemunha2Relacao || "___________________";
  const t2Tel = data.testemunha2Telefone || "_________________";
  addSubItem(`Testemunha 2: Nome: ${t2Nome} | Relação: ${t2Rel} | Tel: ${t2Tel}`);

  // Encerramento
  currentY += 4;
  const encerramento = "Nada mais disse e nem lhe foi perguntado. Lido e achado conforme, assina a presente declaração juntamente com a Autoridade Policial e o(a) Escrivão(ã) de Polícia.";
  const encerramentoLines = doc.splitTextToSize(encerramento, contentWidth);
  checkPageBreak(encerramentoLines.length * 4.8 + 35);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(encerramentoLines, leftMargin, currentY, { align: "justify", maxWidth: contentWidth });
  currentY += encerramentoLines.length * 4.8 + 14;

  // Bloco de Assinaturas (idêntico ao documento)
  checkPageBreak(30);

  const colWidth = contentWidth / 3;
  const sigY = currentY;

  // Linhas de assinatura
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.3);

  // Delegada
  doc.line(leftMargin, sigY, leftMargin + colWidth - 6, sigY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(delegada, leftMargin + (colWidth - 6) / 2, sigY + 4, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Delegada de Polícia", leftMargin + (colWidth - 6) / 2, sigY + 8, { align: "center" });

  // Escrivã
  const col2X = leftMargin + colWidth + 3;
  doc.line(col2X, sigY, col2X + colWidth - 6, sigY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(escriva, col2X + (colWidth - 6) / 2, sigY + 4, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Escrivã de Polícia ad hoc", col2X + (colWidth - 6) / 2, sigY + 8, { align: "center" });

  // Declarante
  const col3X = leftMargin + colWidth * 2 + 6;
  const declNome = data.vitimaNome || "Heloisa Arcilla Richart";
  doc.line(col3X, sigY, leftMargin + contentWidth, sigY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(declNome, col3X + (contentWidth - (colWidth * 2 + 6)) / 2, sigY + 4, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Declarante", col3X + (contentWidth - (colWidth * 2 + 6)) / 2, sigY + 8, { align: "center" });

  // Testemunha presencial se houver
  if (data.testemunhaPresencialNome || true) {
    const testNome = data.testemunhaPresencialNome || "Jeferson Garcia Arcilla";
    const testY = sigY + 18;
    checkPageBreak(18);
    doc.line(leftMargin + colWidth * 0.5, testY, leftMargin + colWidth * 2.5, testY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(testNome, pageWidth / 2, testY + 4, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Testemunha Presencial", pageWidth / 2, testY + 8, { align: "center" });
  }

  // Draw headers and footers for all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawHeader();
    drawFooter(i, totalPages);
  }

  return doc;
}
