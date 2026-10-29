"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  RotateCcw,
  Plus,
  Trash2,
  ShieldAlert,
  User,
  Clock,
  PhoneCall,
  Activity,
  Users,
  Eye,
  CheckCircle2,
  Copy,
  Heart,
} from "lucide-react";
import DocumentPreview from "@/components/DocumentPreview";
import {
  FormDataDeclaracoes,
  EpisodioPresencial,
  generatePdfTermo,
} from "@/utils/generatePdf";

const initialData: FormDataDeclaracoes = {
  dataOitiva: "29 de outubro de 2026",
  cidade: "Penápolis",
  delegaciaNome: "sede da DDM Penápolis",
  delegadaNome: "Dra. Flávia Santin Torres",
  delegadaCargo: "Delegada de Polícia",
  escrivaNome: "Thais Aparecida Bassi Soares",
  escrivaCargo: "Escrivã de Polícia ad hoc",

  vitimaNome: "",
  vitimaRg: "",
  vitimaCpf: "",
  vitimaNascimento: "",
  vitimaFiliacao: "",
  vitimaEscolaridade: "ensino médio completo",
  vitimaNaturalidade: "Penápolis-SP",
  vitimaEndereco: "",
  vitimaTelefone: "",

  autorNome: "",
  autorVulgo: "",
  autorVinculo: "",

  dataInicio: "",
  dataFim: "",
  perduraAteHoje: true,
  qtdEpisodios: "",
  periodosCriticos: "",

  episodios: [
    {
      id: "ep-1",
      data: "",
      hora: "",
      local: "",
      conduta: "",
    },
    {
      id: "ep-2",
      data: "",
      hora: "",
      local: "",
      conduta: "",
    },
  ],
  locaisFrequentes: "",

  meiosContato: {
    ligacoes: true,
    whatsapp: true,
    sms: false,
    instagram: true,
    email: false,
    outros: false,
    outrosTexto: "",
  },
  canaisAutorTelefones: "",
  canaisAutorPerfis: "",
  canaisVitimaAtingidos: "",
  mensagensTexto: "",
  oposicaoData: "",
  oposicaoMeio: "",
  oposicaoTermos: "",
  houveContinuidadeAposRecusa: true,

  rotinaMudancas: "",
  fazUsoMedicamentos: "SIM",
  medicamentosDataReceita: "",
  medicamentosQuais: "",

  provaPrints: true,
  provaPrintsObs: "",
  provaAudios: true,
  provaAudiosObs: "",
  provaCftv: false,
  provaCftvObs: "",
  provaLaudos: true,
  provaLaudosObs: "",

  testemunha1Nome: "",
  testemunha1Relacao: "",
  testemunha1Telefone: "",
  testemunha2Nome: "",
  testemunha2Relacao: "",
  testemunha2Telefone: "",

  testemunhaPresencialNome: "Jeferson Garcia Arcilla",
};

export default function Home() {
  const [formData, setFormData] = useState<FormDataDeclaracoes>(initialData);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleChange = (
    field: keyof FormDataDeclaracoes,
    value: string | boolean | EpisodioPresencial[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEpisodioChange = (
    index: number,
    field: keyof EpisodioPresencial,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.episodios];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, episodios: updated };
    });
  };

  const addEpisodio = () => {
    setFormData((prev) => ({
      ...prev,
      episodios: [
        ...prev.episodios,
        {
          id: `ep-${Date.now()}`,
          data: "",
          hora: "",
          local: "",
          conduta: "",
        },
      ],
    }));
  };

  const removeEpisodio = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      episodios: prev.episodios.filter((_, i) => i !== index),
    }));
  };

  const fillExampleData = () => {
    setFormData({
      dataOitiva: "29 de outubro de 2026",
      cidade: "Penápolis",
      delegaciaNome: "sede da DDM Penápolis",
      delegadaNome: "Dra. Flávia Santin Torres",
      delegadaCargo: "Delegada de Polícia",
      escrivaNome: "Thais Aparecida Bassi Soares",
      escrivaCargo: "Escrivã de Polícia ad hoc",

      vitimaNome: "Camila Ribeiro Soares",
      vitimaRg: "44.891.204-X SSP/SP",
      vitimaCpf: "389.241.098-72",
      vitimaNascimento: "1994-06-14",
      vitimaFiliacao: "Carlos Ribeiro Soares e Helena Martins Soares",
      vitimaEscolaridade: "ensino superior completo (Arquiteta e Urbanista)",
      vitimaNaturalidade: "Penápolis-SP",
      vitimaEndereco: "Rua Tiradentes, 540, Centro, Penápolis/SP",
      vitimaTelefone: "(18) 99762-4099",

      autorNome: "Rodrigo Mendes Siqueira",
      autorVulgo: "Rodrigo",
      autorVinculo: "Ex-namorado (término da relação há 6 meses)",

      dataInicio: "2024-05-10",
      dataFim: "",
      perduraAteHoje: true,
      qtdEpisodios: "25",
      periodosCriticos:
        "Condutas contínuas que se intensificaram nos finais de semana, principalmente no período noturno e madrugadas, com rondas frequentes defronte à residência da declarante.",

      episodios: [
        {
          id: "ep-1",
          data: "2024-09-18",
          hora: "18:45",
          local: "Em frente ao escritório de arquitetura na Av. Rui Barbosa",
          conduta:
            "Estacionou veículo Polo prata bloqueando a saída da declarante, exigindo conversas e proferindo ofensas verbais diante de clientes e colaboradores.",
        },
        {
          id: "ep-2",
          data: "2024-10-12",
          hora: "22:30",
          local: "Portão da residência da declarante",
          conduta:
            "Buzinou repetidamente por mais de vinte minutos e jogou pedras no portão, gritando que ela não teria paz enquanto não reatasse o relacionamento.",
        },
      ],
      locaisFrequentes:
        "Passa repetidas vezes devagar em frente à residência da vítima, comparece sem justificativa no local de trabalho e transita pela rota habitual da academia que a declarante frequenta.",

      meiosContato: {
        ligacoes: true,
        whatsapp: true,
        sms: true,
        instagram: true,
        email: true,
        outros: false,
        outrosTexto: "",
      },
      canaisAutorTelefones:
        "(18) 99882-1100, (18) 99711-4567 e chamadas em modo confidencial/restrito",
      canaisAutorPerfis:
        "@rodrigo_mendes_sp e perfis recém-criados no Instagram (@observador_pnp)",
      canaisVitimaAtingidos:
        "Telefone celular pessoal (WhatsApp), telefone do escritório e direct do Instagram",
      mensagensTexto:
        'Dizendo frases como: "Se você não for minha, não será de mais ninguém", "Eu sei cada passo que você dá em Penápolis", além de encaminhar fotos da fachada da casa da vítima tiradas em tempo real.',
      oposicaoData: "2024-06-01",
      oposicaoMeio: "mensagem escrita via WhatsApp e notificação verbal",
      oposicaoTermos:
        '"Rodrigo, acabou de vez. Não me procure, não venha na minha casa ou no meu trabalho e pare de me ligar. Me deixe em paz ou tomarei as medidas legais cabíveis."',
      houveContinuidadeAposRecusa: true,

      rotinaMudancas:
        "Necessitou alterar itinerários diários de deslocamento, fechou a conta pública de trabalho no Instagram, instalou novas câmeras no portão de casa e passou a depender da companhia de familiares para ingressar e sair de sua residência.",
      fazUsoMedicamentos: "SIM",
      medicamentosDataReceita: "2024-07-15",
      medicamentosQuais:
        "Clonazepam 0,5mg e Sertralina 50mg prescritos por médico psiquiatra para crise de pânico e ansiedade severa",

      provaPrints: true,
      provaPrintsObs: "45 capturas de tela das mensagens e chamadas salvas em mídia digital",
      provaAudios: true,
      provaAudiosObs: "06 gravações de áudio com ameaças e chantagens emocionais",
      provaCftv: true,
      provaCftvObs: "Imagens do sistema de segurança do condomínio e da residência vizinha",
      provaLaudos: true,
      provaLaudosObs: "Atestado e relatório médico psiquiátrico com diagnóstico de F41.0",

      testemunha1Nome: "Mariana Albuquerque Prado",
      testemunha1Relacao: "Colega de trabalho (presenciou o episódio de 18/09)",
      testemunha1Telefone: "(18) 99655-3211",
      testemunha2Nome: "Carlos Alberto de Souza",
      testemunha2Relacao: "Vizinho imediato (presenciou o episódio de 12/10)",
      testemunha2Telefone: "(18) 99122-8700",

      testemunhaPresencialNome: "Jeferson Garcia Arcilla",
    });
  };

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = generatePdfTermo(formData);
      const filename = `Termo_Declaracoes_Perseguicao_${formData.vitimaNome.replace(/\s+/g, "_") || "PolíciaCivil"}.pdf`;
      doc.save(filename);
    } catch (e) {
      console.error(e);
      alert("Ocorreu um erro ao gerar o PDF. Verifique os dados.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const el = document.getElementById("documento-termo-folha");
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brasao-pcsp.png"
              alt="Brasão PCSP"
              className="w-8 h-8 object-contain brightness-110"
            />
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                SISTEMA DE OITIVAS FORENSES
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 bg-blue-600/30 text-blue-300 rounded border border-blue-500/40">
                  DDM Penápolis
                </span>
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                Feito por <span className="text-white font-semibold">Gustavo Caciolato</span> para uso exclusivo da <span className="text-amber-300 font-semibold">Thais Soares</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Termo de Declarações • Crime de Perseguição / Stalking (Art. 147-A CP)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === "form" ? "preview" : "form")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
            >
              {activeTab === "form" ? (
                <>
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="hidden sm:inline">Visualizar Modelo</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Voltar ao Formulário</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? "Gerando..." : "Gerar PDF"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Imprimir Documento"
            >
              <Printer className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation & Quick Actions (no-print) */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm no-print">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab("form")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                activeTab === "form"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              1. Preenchimento Guiado
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                activeTab === "preview"
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              2. Espelho Oficial (Word/PDF)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fillExampleData}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Preencher Exemplo Real
            </button>
            <button
              onClick={() => setFormData(initialData)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar
            </button>
            <button
              onClick={handleCopyText}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  Copiar Texto
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content View: Form or Preview */}
        {activeTab === "form" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 no-print">
            {/* Form Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Autoridades e Delegacia */}
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Cabeçalho e Autoridades Policiais
                    </h2>
                    <p className="text-xs text-slate-500">
                      Unidade de Polícia Judiciária, Autoridade Policial e Escrivão(ã)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Data da Oitiva
                    </label>
                    <input
                      type="text"
                      value={formData.dataOitiva}
                      onChange={(e) => handleChange("dataOitiva", e.target.value)}
                      placeholder="Ex: 29 de outubro de 2026"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Município / Cidade
                    </label>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => handleChange("cidade", e.target.value)}
                      placeholder="Ex: Penápolis"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Unidade Policial
                    </label>
                    <input
                      type="text"
                      value={formData.delegaciaNome}
                      onChange={(e) => handleChange("delegaciaNome", e.target.value)}
                      placeholder="Ex: sede da DDM Penápolis"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Delegada / Autoridade
                    </label>
                    <input
                      type="text"
                      value={formData.delegadaNome}
                      onChange={(e) => handleChange("delegadaNome", e.target.value)}
                      placeholder="Ex: Dra. Flávia Santin Torres"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Escrivã(o) de Polícia
                    </label>
                    <input
                      type="text"
                      value={formData.escrivaNome}
                      onChange={(e) => handleChange("escrivaNome", e.target.value)}
                      placeholder="Ex: Thais Aparecida Bassi Soares"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Testemunha Presencial (Assinatura)
                    </label>
                    <input
                      type="text"
                      value={formData.testemunhaPresencialNome || ""}
                      onChange={(e) =>
                        handleChange("testemunhaPresencialNome", e.target.value)
                      }
                      placeholder="Ex: Jeferson Garcia Arcilla"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </section>

              {/* Qualificação da Vítima e Investigado */}
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Qualificação das Partes
                    </h2>
                    <p className="text-xs text-slate-500">
                      Qualificação da declarante/vítima e dados do suposto agressor
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/60 space-y-3">
                  <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                    Declarante (Vítima)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={formData.vitimaNome}
                        onChange={(e) => handleChange("vitimaNome", e.target.value)}
                        placeholder="Ex: Heloisa Arcilla Richart"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        RG
                      </label>
                      <input
                        type="text"
                        value={formData.vitimaRg}
                        onChange={(e) => handleChange("vitimaRg", e.target.value)}
                        placeholder="Ex: 00.000.000-0"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        CPF
                      </label>
                      <input
                        type="text"
                        value={formData.vitimaCpf}
                        onChange={(e) => handleChange("vitimaCpf", e.target.value)}
                        placeholder="Ex: 000.000.000-00"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        value={formData.vitimaNascimento}
                        onChange={(e) =>
                          handleChange("vitimaNascimento", e.target.value)
                        }
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Naturalidade
                      </label>
                      <input
                        type="text"
                        value={formData.vitimaNaturalidade}
                        onChange={(e) =>
                          handleChange("vitimaNaturalidade", e.target.value)
                        }
                        placeholder="Ex: Penápolis-SP"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Filiação (Pai e Mãe)
                      </label>
                      <input
                        type="text"
                        value={formData.vitimaFiliacao}
                        onChange={(e) => handleChange("vitimaFiliacao", e.target.value)}
                        placeholder="Ex: Nome do pai e Nome da mãe"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Escolaridade / Profissão
                      </label>
                      <input
                        type="text"
                        value={formData.vitimaEscolaridade}
                        onChange={(e) =>
                          handleChange("vitimaEscolaridade", e.target.value)
                        }
                        placeholder="Ex: ensino médio completo"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Endereço Residencial Completo
                      </label>
                      <input
                        type="text"
                        value={formData.vitimaEndereco}
                        onChange={(e) => handleChange("vitimaEndereco", e.target.value)}
                        placeholder="Rua, número, bairro, cidade - UF"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Telefone Celular / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={formData.vitimaTelefone}
                        onChange={(e) => handleChange("vitimaTelefone", e.target.value)}
                        placeholder="(18) 90000-0000"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/60 space-y-3">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                    Pessoa Investigada / Suposto Perseguidor
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Nome do Investigado
                      </label>
                      <input
                        type="text"
                        value={formData.autorNome}
                        onChange={(e) => handleChange("autorNome", e.target.value)}
                        placeholder="Nome completo ou conhecido"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Alcunha / Apelido
                      </label>
                      <input
                        type="text"
                        value={formData.autorVulgo}
                        onChange={(e) => handleChange("autorVulgo", e.target.value)}
                        placeholder="Ex: Rodrigo"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Vínculo com a Declarante
                      </label>
                      <input
                        type="text"
                        value={formData.autorVinculo}
                        onChange={(e) => handleChange("autorVinculo", e.target.value)}
                        placeholder="Ex: Ex-namorado, colega de trabalho"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* I. Do Início e Período da Perseguição */}
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      I. Do Início e Período da Perseguição
                    </h2>
                    <p className="text-xs text-slate-500">
                      Itens 1 e 2 do Termo: Habitualidade, marco temporal e frequência
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      1. Data de Início *
                    </label>
                    <input
                      type="date"
                      value={formData.dataInicio}
                      onChange={(e) => handleChange("dataInicio", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Data de Término (se houver)
                    </label>
                    <input
                      type="date"
                      disabled={formData.perduraAteHoje}
                      value={formData.dataFim}
                      onChange={(e) => handleChange("dataFim", e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center h-10 px-3 bg-slate-50 rounded-lg border border-slate-200">
                    <label className="flex items-center gap-2 text-xs font-semibold text-rose-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.perduraAteHoje}
                        onChange={(e) =>
                          handleChange("perduraAteHoje", e.target.checked)
                        }
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                      Perdura até a presente data
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      2. Qtd. Estimada de Episódios
                    </label>
                    <input
                      type="number"
                      value={formData.qtdEpisodios}
                      onChange={(e) => handleChange("qtdEpisodios", e.target.value)}
                      placeholder="Ex: 25"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      Datas ou Períodos Aproximados Críticos
                    </label>
                    <textarea
                      rows={2}
                      value={formData.periodosCriticos}
                      onChange={(e) =>
                        handleChange("periodosCriticos", e.target.value)
                      }
                      placeholder="Ex: Condutas concentradas nas noites e fins de semana..."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </section>

              {/* II. Contatos Presenciais */}
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        II. Contatos Presenciais e Locais Frequentes
                      </h2>
                      <p className="text-xs text-slate-500">
                        Itens 3 e 4 do Termo: Emboscadas, aproximações e campanas
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={addEpisodio}
                    type="button"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar Episódio
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="block text-[11px] font-bold text-slate-800 uppercase">
                    3. Episódios Específicos de Abordagem Presencial:
                  </label>
                  {formData.episodios.map((ep, idx) => (
                    <div
                      key={ep.id}
                      className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 uppercase">
                          Episódio {idx + 1}
                        </span>
                        {formData.episodios.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEpisodio(idx)}
                            className="text-rose-600 hover:text-rose-800 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Excluir
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">
                            Data
                          </label>
                          <input
                            type="date"
                            value={ep.data}
                            onChange={(e) =>
                              handleEpisodioChange(idx, "data", e.target.value)
                            }
                            className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">
                            Horário
                          </label>
                          <input
                            type="time"
                            value={ep.hora}
                            onChange={(e) =>
                              handleEpisodioChange(idx, "hora", e.target.value)
                            }
                            className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">
                            Local Específico
                          </label>
                          <input
                            type="text"
                            value={ep.local}
                            onChange={(e) =>
                              handleEpisodioChange(idx, "local", e.target.value)
                            }
                            placeholder="Ex: Portaria do prédio, estacionamento"
                            className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">
                          Conduta do Investigado na Ocasião
                        </label>
                        <textarea
                          rows={2}
                          value={ep.conduta}
                          onChange={(e) =>
                            handleEpisodioChange(idx, "conduta", e.target.value)
                          }
                          placeholder="Descreva as palavras ditas, intimidação física, perseguição com carro..."
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 uppercase mb-1">
                      4. Comparecimento a Residência, Trabalho ou Locais Frequentes:
                    </label>
                    <textarea
                      rows={2}
                      value={formData.locaisFrequentes}
                      onChange={(e) =>
                        handleChange("locaisFrequentes", e.target.value)
                      }
                      placeholder="Relate se ele faz campanas no portão de casa, passa devagar pela academia ou pelo trabalho..."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </section>

              {/* III. Contatos Telefônicos e Digitais */}
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      III. Contatos Digitais, Telefônicos e Recusa Formal
                    </h2>
                    <p className="text-xs text-slate-500">
                      Itens 5 a 10 do Termo: Cyberstalking, mensagens, oposição expressa e reiteração
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        6. Números de Telefone/WhatsApp do Autor
                      </label>
                      <input
                        type="text"
                        value={formData.canaisAutorTelefones}
                        onChange={(e) =>
                          handleChange("canaisAutorTelefones", e.target.value)
                        }
                        placeholder="Ex: (18) 99882-1100, números restritos"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Perfis em Redes Sociais / E-mails
                      </label>
                      <input
                        type="text"
                        value={formData.canaisAutorPerfis}
                        onChange={(e) =>
                          handleChange("canaisAutorPerfis", e.target.value)
                        }
                        placeholder="Ex: @rodrigo_mendes, contas falsas"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                        Canais da Declarante Contatados
                      </label>
                      <input
                        type="text"
                        value={formData.canaisVitimaAtingidos}
                        onChange={(e) =>
                          handleChange("canaisVitimaAtingidos", e.target.value)
                        }
                        placeholder="Ex: WhatsApp pessoal e direct do Instagram"
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      7. Transcrição Literal das Mensagens Relevantes ou Ameaças
                    </label>
                    <textarea
                      rows={3}
                      value={formData.mensagensTexto}
                      onChange={(e) =>
                        handleChange("mensagensTexto", e.target.value)
                      }
                      placeholder='Ex: "Se você não responder, eu vou até a sua casa..."'
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        8 e 9. Data da Recusa Expressa
                      </label>
                      <input
                        type="date"
                        value={formData.oposicaoData}
                        onChange={(e) =>
                          handleChange("oposicaoData", e.target.value)
                        }
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Meio Empregado para Recusa
                      </label>
                      <input
                        type="text"
                        value={formData.oposicaoMeio}
                        onChange={(e) =>
                          handleChange("oposicaoMeio", e.target.value)
                        }
                        placeholder="Ex: mensagem expressa no WhatsApp"
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">
                        Termos Exatos da Recusa
                      </label>
                      <input
                        type="text"
                        value={formData.oposicaoTermos}
                        onChange={(e) =>
                          handleChange("oposicaoTermos", e.target.value)
                        }
                        placeholder='Ex: "Não me procure mais, me deixe em paz"'
                        className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-rose-900 uppercase block">
                        10. Continuidade após notificação de recusa
                      </span>
                      <p className="text-[11px] text-rose-700">
                        Mesmo ciente de que a vítima não queria contato, prosseguiu nas investidas?
                      </p>
                    </div>
                    <label className="flex items-center gap-1.5 font-bold text-xs text-rose-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.houveContinuidadeAposRecusa}
                        onChange={(e) =>
                          handleChange(
                            "houveContinuidadeAposRecusa",
                            e.target.checked
                          )
                        }
                        className="rounded text-rose-600 w-4 h-4"
                      />
                      Sim, persistiu
                    </label>
                  </div>
                </div>
              </section>

              {/* IV. Impactos na Rotina e Saúde */}
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      IV. Impactos na Rotina, Liberdade e Saúde Mental
                    </h2>
                    <p className="text-xs text-slate-500">
                      Itens 11 a 13 do Termo: Alteração da vida cotidiana e abalo psicológico
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
                      11 e 12. Alterações de Rotina Adotadas pela Declarante
                    </label>
                    <textarea
                      rows={2}
                      value={formData.rotinaMudancas}
                      onChange={(e) =>
                        handleChange("rotinaMudancas", e.target.value)
                      }
                      placeholder="Descreva mudanças de trajeto, fechamento de redes sociais, mudança de domicílio, necessidade de acompanhante..."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase">
                        13. Uso de Medicamentos Psiquiátricos Controlados
                      </span>
                      <div className="flex items-center gap-4 text-xs font-semibold">
                        <label className="flex items-center gap-1 cursor-pointer text-rose-700">
                          <input
                            type="radio"
                            name="radio_medicamento"
                            value="SIM"
                            checked={formData.fazUsoMedicamentos === "SIM"}
                            onChange={() =>
                              handleChange("fazUsoMedicamentos", "SIM")
                            }
                            className="text-rose-600"
                          />
                          ( X ) FAZ USO
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-slate-600">
                          <input
                            type="radio"
                            name="radio_medicamento"
                            value="NAO"
                            checked={formData.fazUsoMedicamentos === "NAO"}
                            onChange={() =>
                              handleChange("fazUsoMedicamentos", "NAO")
                            }
                            className="text-slate-600"
                          />
                          (   ) NÃO FAZ USO
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">
                          Data da Receita Médica
                        </label>
                        <input
                          type="date"
                          value={formData.medicamentosDataReceita}
                          onChange={(e) =>
                            handleChange(
                              "medicamentosDataReceita",
                              e.target.value
                            )
                          }
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-600 uppercase mb-0.5">
                          Medicamentos Prescritos / Diagnóstico
                        </label>
                        <input
                          type="text"
                          value={formData.medicamentosQuais}
                          onChange={(e) =>
                            handleChange("medicamentosQuais", e.target.value)
                          }
                          placeholder="Ex: Ansiolíticos, antidepressivos, acompanhamento psiquiátrico"
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* VI. Provas Materiais e VII. Testemunhas */}
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      VI. Provas Materiais e VII. Testemunhas
                    </h2>
                    <p className="text-xs text-slate-500">
                      Itens 14 e 15 do Termo: Mídias comprobatórias e rol de testemunhas
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 uppercase mb-2">
                      14. Provas Materiais Disponibilizadas para Juntada:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.provaPrints}
                              onChange={(e) =>
                                handleChange("provaPrints", e.target.checked)
                              }
                              className="rounded text-blue-600 w-4 h-4"
                            />
                            Prints / Capturas de tela
                          </label>
                        </div>
                        <input
                          type="text"
                          value={formData.provaPrintsObs}
                          onChange={(e) =>
                            handleChange("provaPrintsObs", e.target.value)
                          }
                          placeholder="Detalhes (ex: 45 capturas com datas/horários)"
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.provaAudios}
                              onChange={(e) =>
                                handleChange("provaAudios", e.target.checked)
                              }
                              className="rounded text-blue-600 w-4 h-4"
                            />
                            Arquivos de Áudio / Vídeo / Fotos
                          </label>
                        </div>
                        <input
                          type="text"
                          value={formData.provaAudiosObs}
                          onChange={(e) =>
                            handleChange("provaAudiosObs", e.target.value)
                          }
                          placeholder="Detalhes (ex: 6 áudios em WhatsApp)"
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.provaCftv}
                              onChange={(e) =>
                                handleChange("provaCftv", e.target.checked)
                              }
                              className="rounded text-blue-600 w-4 h-4"
                            />
                            Imagens de Câmeras de Segurança (CFTV)
                          </label>
                        </div>
                        <input
                          type="text"
                          value={formData.provaCftvObs}
                          onChange={(e) =>
                            handleChange("provaCftvObs", e.target.value)
                          }
                          placeholder="Detalhes (ex: Câmera da portaria)"
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.provaLaudos}
                              onChange={(e) =>
                                handleChange("provaLaudos", e.target.checked)
                              }
                              className="rounded text-blue-600 w-4 h-4"
                            />
                            Relatórios / Atestados Médicos
                          </label>
                        </div>
                        <input
                          type="text"
                          value={formData.provaLaudosObs}
                          onChange={(e) =>
                            handleChange("provaLaudosObs", e.target.value)
                          }
                          placeholder="Detalhes (ex: Laudo psiquiátrico emitido)"
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-800 uppercase mb-2">
                      15. Rol de Testemunhas:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                        <span className="text-[10px] font-bold text-slate-600 uppercase">
                          Testemunha 1
                        </span>
                        <input
                          type="text"
                          value={formData.testemunha1Nome}
                          onChange={(e) =>
                            handleChange("testemunha1Nome", e.target.value)
                          }
                          placeholder="Nome Completo"
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={formData.testemunha1Relacao}
                          onChange={(e) =>
                            handleChange("testemunha1Relacao", e.target.value)
                          }
                          placeholder="Relação / Vínculo (ex: Colega de trabalho)"
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={formData.testemunha1Telefone}
                          onChange={(e) =>
                            handleChange("testemunha1Telefone", e.target.value)
                          }
                          placeholder="Telefone / Contato"
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>

                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                        <span className="text-[10px] font-bold text-slate-600 uppercase">
                          Testemunha 2
                        </span>
                        <input
                          type="text"
                          value={formData.testemunha2Nome}
                          onChange={(e) =>
                            handleChange("testemunha2Nome", e.target.value)
                          }
                          placeholder="Nome Completo"
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={formData.testemunha2Relacao}
                          onChange={(e) =>
                            handleChange("testemunha2Relacao", e.target.value)
                          }
                          placeholder="Relação / Vínculo (ex: Vizinho)"
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={formData.testemunha2Telefone}
                          onChange={(e) =>
                            handleChange("testemunha2Telefone", e.target.value)
                          }
                          placeholder="Telefone / Contato"
                          className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Botão de Finalização */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-900 text-white rounded-xl shadow-lg">
                <div>
                  <h3 className="text-sm font-bold tracking-wide">
                    Pronto para Gerar o Documento Oficial
                  </h3>
                  <p className="text-xs text-slate-400">
                    O PDF reproduz exatamente a paginação, o brasão da Polícia Civil e o layout do Word (.docx).
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("preview")}
                    type="button"
                    className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  >
                    Visualizar Modelo
                  </button>
                  <button
                    onClick={handleDownloadPdf}
                    type="button"
                    disabled={isGeneratingPdf}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Gerar PDF Oficial
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Preview Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-20">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Resumo do Termo
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    15 Itens Forenses
                  </span>
                </div>

                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Declarante:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                      {formData.vitimaNome || "Não preenchido"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Investigado:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                      {formData.autorNome || "Não informado"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Episódios Registrados:</span>
                    <span className="font-semibold text-slate-800">
                      {formData.episodios.length} presenciais
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Uso de Medicamento:</span>
                    <span
                      className={`font-semibold ${
                        formData.fazUsoMedicamentos === "SIM"
                          ? "text-rose-600"
                          : "text-slate-700"
                      }`}
                    >
                      {formData.fazUsoMedicamentos}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Delegacia:</span>
                    <span className="font-semibold text-slate-800">
                      {formData.delegaciaNome}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <button
                    onClick={handleDownloadPdf}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Baixar PDF (.pdf)
                  </button>
                  <button
                    onClick={handlePrint}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    Imprimir Direto
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Live Document Preview Screen (Word-like page) */
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm no-print">
              <span className="text-xs font-semibold text-slate-700">
                Visualização fiel à formatação do Word (.docx) com Brasão Oficial da Polícia Civil
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPdf}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" /> Baixar PDF
                </button>
                <button
                  onClick={handlePrint}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" /> Imprimir
                </button>
              </div>
            </div>

            <DocumentPreview data={formData} />
          </div>
        )}
      </main>

      {/* Footer com copyright e carinho */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-400 no-print mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Sistema de Oitivas Forenses • Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5 text-slate-300 font-medium">
            Feito com carinho por <span className="text-white font-semibold">Gu Caciolato</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </footer>
    </div>
  );
}
