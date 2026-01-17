import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Paths, File } from "expo-file-system";
import { Alert } from "react-native";

interface PropertyData {
  city: string;
  country: string;
  productionSystem: string;
  totalAreaHa: number;
  createdAt: string;
  waterManagementScore: number | null;
  waterQualityConservationScore: number | null;
  wasteManagementScore: number | null;
  waterPerformanceIndexScore: number | null;
}

interface PDFGeneratorOptions {
  property: PropertyData;
  userName: string;
  userEmail: string;
  userCpf: string;
}

interface ImprovementSuggestion {
  title: string;
  subtitle: string;
  items: string[];
}

const MINIMUM_SCORES = {
  waterManagement: 0.62,
  waterQuality: 0.61,
  wasteManagement: 0.71,
  waterPerformanceIndex: 0.64,
};

const getProductionSystemLabel = (system: string): string => {
  const systems: { [key: string]: string } = {
    PASTO: "Pasto",
    PASTO_SUPLEMENTACAO: "Pasto com Suplementação",
    CONFINADO: "Confinado",
    CONFINADO_MISTO: "Confinado Misto",
    OUTRO: "Outro",
  };
  return systems[system] || system;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatScore = (score: number | null): string => {
  if (score === null) return "N/A";
  return score.toFixed(2).replace(".", ",");
};

const getScoreColor = (score: number | null, minimum: number): string => {
  if (score === null) return "#6B7280";
  if (score >= minimum) return "#059669";
  return "#DC2626";
};

const getScoreStatus = (score: number | null, minimum: number): string => {
  if (score === null) return "Não Avaliado";
  if (score >= minimum) return "Aprovado ✓";
  return "Requer Melhorias";
};

const needsImprovement = (score: number | null, minimum: number): boolean => {
  if (score === null) return false;
  return score < minimum;
};

const getWaterManagementImprovements = (): ImprovementSuggestion[] => {
  return [
    {
      title: "Mesoindicador Consumo de Água",
      subtitle: "Para se obter a nota mínima é necessário:",
      items: [
        "Ter o mapa hidráulico da propriedade",
        "Medir o consumo de água de no mínimo 25% dos pontos de consumo com periodicidade mensal",
      ],
    },
    {
      title: "Mesoindicador Perdas de Água",
      subtitle: "Para se obter a nota mínima é necessário:",
      items: [
        "Ter controle de vazão nas mangueiras de lavagem",
        "Boias de nível instaladas nos bebedouros e nas estruturas de armazenamento de água",
        "Verificar com periodicidade semanal a ocorrência de vazamentos",
      ],
    },
    {
      title: "Mesoindicador Segurança Hídrica",
      subtitle: "Para se obter a nota mínima é necessário:",
      items: ["Ter alguma forma de reuso da água e/ou efluente"],
    },
  ];
};

const getWaterQualityImprovements = (): ImprovementSuggestion[] => {
  return [
    {
      title: "Mesoindicador Análise de Água",
      subtitle: "Para se obter a nota mínima é necessário:",
      items: [
        "Realizar a análise de água uma vez ao ano",
        "Analisar a qualidade da água em no mínimo 25% dos pontos de consumo",
        "Realizar a análise de Escherichia coli",
      ],
    },
    {
      title: "Mesoindicador Conservação da Água",
      subtitle: "Para se obter a nota mínima é necessário:",
      items: [
        "Os animais não podem ter acesso a cursos de água naturais (rios, nascentes, lagoas, etc.)",
        "Toda água é servida aos animais por bebedouros",
        "Bebedouros limpos no mínimo duas vezes por semana",
      ],
    },
  ];
};

const getWasteManagementImprovements = (): ImprovementSuggestion[] => {
  return [
    {
      title: "Mesoindicador Estrutura para os dejetos",
      subtitle: "Para se obter a nota mínima é necessário:",
      items: [
        "Estrutura de tratamento de resíduos impermeabilizada e sem vazamentos",
      ],
    },
    {
      title: "Mesoindicador Manejo de dejetos",
      subtitle: "Para se obter a nota mínima é necessário:",
      items: [
        "Não lavar o piso da ordenha após todas as ordenhas",
        "Antes da lavagem se faz a raspagem do esterco",
        "Lavagem é feita com água com pressão",
      ],
    },
    {
      title: "Mesoindicador Adubação",
      subtitle: "Para se obter a nota mínima é necessário:",
      items: [
        "Documenta todo o uso de fertilizantes químicos e orgânicos",
        "Realiza a análise de solo das áreas no mínimo a cada dois anos",
        "Fazer a aplicação do dejeto a cada quatro meses ou mais e de forma superficial",
      ],
    },
  ];
};

const renderImprovementSection = (
  title: string,
  icon: string,
  improvements: ImprovementSuggestion[],
): string => {
  return `
    <div class="improvement-category">
      <div class="improvement-category-header">
        <span class="improvement-icon">${icon}</span>
        <h3 class="improvement-category-title">${title}</h3>
      </div>
      ${improvements
        .map(
          (improvement) => `
        <div class="improvement-card">
          <h4 class="improvement-card-title">${improvement.title}</h4>
          <p class="improvement-card-subtitle">${improvement.subtitle}</p>
          <ul class="improvement-list">
            ${improvement.items.map((item) => `<li class="improvement-item">${item}</li>`).join("")}
          </ul>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
};

const generateHTMLContent = (options: PDFGeneratorOptions): string => {
  const { property, userName, userEmail, userCpf } = options;
  const mainScore = property.waterPerformanceIndexScore;
  const mainScoreColor = getScoreColor(
    mainScore,
    MINIMUM_SCORES.waterPerformanceIndex,
  );
  const mainScoreStatus = getScoreStatus(
    mainScore,
    MINIMUM_SCORES.waterPerformanceIndex,
  );

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Relatório IDH Leite - ${property.city}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica', 'Arial', sans-serif;
          color: #1F2937;
          line-height: 1.6;
          padding: 30px;
          background: #ffffff;
        }

        .header {
          position: relative;
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #006f36;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .logo-embrapa {
          height: 40px;
          width: auto;
        }

        .logo-idh {
          height: 60px;
          width: auto;
        }

        .header h1 {
          font-size: 22px;
          color: #006f36;
          margin-bottom: 8px;
        }

        .subtitle {
          font-size: 16px;
          color: #6B7280;
          margin-bottom: 15px;
        }

        .date-generated {
          font-size: 12px;
          color: #9CA3AF;
          margin-top: 8px;
        }

        .main-score-section {
          background: linear-gradient(135deg, ${mainScoreColor}15 0%, ${mainScoreColor}05 100%);
          border: 2px solid ${mainScoreColor};
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          margin: 25px 0;
        }

        .main-score-value {
          font-size: 48px;
          font-weight: bold;
          color: ${mainScoreColor};
          margin: 15px 0;
        }

        .main-score-label {
          font-size: 18px;
          color: #374151;
          font-weight: 600;
        }

        .status-badge {
          display: inline-block;
          padding: 8px 20px;
          background: ${mainScoreColor}20;
          color: ${mainScoreColor};
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          margin-top: 15px;
        }

        .section {
          margin-bottom: 25px;
          background: #F9FAFB;
          padding: 18px;
          border-radius: 10px;
          border-left: 4px solid #006f36;
        }

        .section-title {
          font-size: 16px;
          color: #006f36;
          margin-bottom: 12px;
          font-weight: bold;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid #E5E7EB;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #6B7280;
          font-weight: 500;
          font-size: 13px;
        }

        .info-value {
          color: #1F2937;
          font-weight: 600;
          font-size: 13px;
        }

        .scores-section {
          margin: 30px 0;
        }

        .scores-section h2 {
          font-size: 18px;
          color: #006f36;
          margin-bottom: 18px;
          padding-bottom: 8px;
          border-bottom: 2px solid #E5E7EB;
        }

        .score-card {
          background: #ffffff;
          border: 2px solid #E5E7EB;
          border-radius: 10px;
          padding: 18px;
          margin-bottom: 15px;
          page-break-inside: avoid;
        }

        .score-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .score-card-title {
          font-size: 15px;
          color: #1F2937;
          font-weight: 600;
        }

        .score-card-value {
          font-size: 28px;
          font-weight: bold;
        }

        .score-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #E5E7EB;
        }

        .score-minimum {
          font-size: 12px;
          color: #6B7280;
        }

        .score-status {
          padding: 6px 14px;
          border-radius: 14px;
          font-size: 12px;
          font-weight: 600;
        }

        .score-status.approved {
          background: #D1FAE5;
          color: #059669;
        }

        .score-status.needs-improvement {
          background: #FEE2E2;
          color: #DC2626;
        }

        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #E5E7EB;
          text-align: center;
          color: #6B7280;
          font-size: 12px;
        }

        .footer-note {
          margin-top: 8px;
          font-style: italic;
        }

        .improvements-section {
          margin-top: 40px;
          padding: 25px;
          background: #FEF3C7;
          border-radius: 12px;
          border-left: 4px solid #F59E0B;
          page-break-inside: avoid;
        }
        
        .header-logo-left {
          position: absolute;
          top: 10px;
          left: 10px;
          height: 50px;
          width: auto;
        }

        .improvements-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .improvements-header-icon {
          font-size: 32px;
        }

        .improvements-title {
          font-size: 22px;
          font-weight: bold;
          color: #92400E;
          margin: 0;
        }

        .improvement-category {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }

        .improvement-category-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #FDE68A;
        }

        .improvement-icon {
          font-size: 24px;
        }

        .improvement-category-title {
          font-size: 18px;
          font-weight: bold;
          color: #B45309;
          margin: 0;
        }

        .improvement-card {
          background: white;
          padding: 18px;
          border-radius: 8px;
          margin-bottom: 15px;
          border: 1px solid #FDE68A;
        }

        .improvement-card-title {
          font-size: 16px;
          font-weight: 600;
          color: #1F2937;
          margin: 0 0 8px 0;
        }

        .improvement-card-subtitle {
          font-size: 14px;
          color: #6B7280;
          margin: 0 0 12px 0;
          font-weight: 500;
        }

        .improvement-list {
          margin: 0;
          padding-left: 20px;
          list-style-type: disc;
        }

        .improvement-item {
          font-size: 13px;
          color: #374151;
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .improvement-item:last-child {
          margin-bottom: 0;
        }

        @media print {
          body {
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
    <div class="header">
      <img
        src="data:image/png;base64,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"
        alt="Logo"
        class="header-logo-left"
      />
    
      <h1>Relatório de Desempenho Hídrico</h1>
      <div class="subtitle">
        Índice de Desempenho Hídrico da Produção Leiteira (IDH Leite)
      </div>
      <div class="date-generated">
        Gerado em: ${formatDate(new Date().toISOString())}
      </div>
    </div>

      <div class="main-score-section">
        <div class="main-score-label">IDH Leite</div>
        <div class="main-score-value">${formatScore(mainScore)}</div>
        <div class="status-badge">${mainScoreStatus}</div>
      </div>

      <div class="section">
        <h2 class="section-title">👤 Dados do Usuário</h2>
        <div class="info-row">
          <span class="info-label">Nome:</span>
          <span class="info-value">${userName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">E-mail:</span>
          <span class="info-value">${userEmail}</span>
        </div>
        <div class="info-row">
          <span class="info-label">CPF:</span>
          <span class="info-value">${userCpf}</span>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">🏞️ Informações da Propriedade</h2>
        <div class="info-row">
          <span class="info-label">Localização:</span>
          <span class="info-value">${property.city}, ${property.country}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Sistema de Produção:</span>
          <span class="info-value">${getProductionSystemLabel(property.productionSystem)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Área Total:</span>
          <span class="info-value">${property.totalAreaHa} hectares</span>
        </div>
        <div class="info-row">
          <span class="info-label">Data da Avaliação:</span>
          <span class="info-value">${formatDate(property.createdAt)}</span>
        </div>
      </div>

      <div class="scores-section">
        <h2>📊 Pontuações Detalhadas</h2>

        <div class="score-card">
          <div class="score-card-header">
            <div class="score-card-title">💧 Quantidade de Água</div>
            <div class="score-card-value" style="color: ${getScoreColor(property.waterManagementScore, MINIMUM_SCORES.waterManagement)}">
              ${formatScore(property.waterManagementScore)}
            </div>
          </div>
          <div class="score-card-footer">
            <div class="score-minimum">Pontuação Mínima: ${MINIMUM_SCORES.waterManagement.toFixed(2).replace(".", ",")}</div>
            <div class="score-status ${property.waterManagementScore !== null && property.waterManagementScore >= MINIMUM_SCORES.waterManagement ? "approved" : "needs-improvement"}">
              ${getScoreStatus(property.waterManagementScore, MINIMUM_SCORES.waterManagement)}
            </div>
          </div>
        </div>

        <div class="score-card">
          <div class="score-card-header">
            <div class="score-card-title">✓ Qualidade da Água</div>
            <div class="score-card-value" style="color: ${getScoreColor(property.waterQualityConservationScore, MINIMUM_SCORES.waterQuality)}">
              ${formatScore(property.waterQualityConservationScore)}
            </div>
          </div>
          <div class="score-card-footer">
            <div class="score-minimum">Pontuação Mínima: ${MINIMUM_SCORES.waterQuality.toFixed(2).replace(".", ",")}</div>
            <div class="score-status ${property.waterQualityConservationScore !== null && property.waterQualityConservationScore >= MINIMUM_SCORES.waterQuality ? "approved" : "needs-improvement"}">
              ${getScoreStatus(property.waterQualityConservationScore, MINIMUM_SCORES.waterQuality)}
            </div>
          </div>
        </div>

        <div class="score-card">
          <div class="score-card-header">
            <div class="score-card-title">♻️ Manejo de Resíduos</div>
            <div class="score-card-value" style="color: ${getScoreColor(property.wasteManagementScore, MINIMUM_SCORES.wasteManagement)}">
              ${formatScore(property.wasteManagementScore)}
            </div>
          </div>
          <div class="score-card-footer">
            <div class="score-minimum">Pontuação Mínima: ${MINIMUM_SCORES.wasteManagement.toFixed(2).replace(".", ",")}</div>
            <div class="score-status ${property.wasteManagementScore !== null && property.wasteManagementScore >= MINIMUM_SCORES.wasteManagement ? "approved" : "needs-improvement"}">
              ${getScoreStatus(property.wasteManagementScore, MINIMUM_SCORES.wasteManagement)}
            </div>
          </div>
        </div>
      </div>

      ${
        needsImprovement(
          property.waterManagementScore,
          MINIMUM_SCORES.waterManagement,
        ) ||
        needsImprovement(
          property.waterQualityConservationScore,
          MINIMUM_SCORES.waterQuality,
        ) ||
        needsImprovement(
          property.wasteManagementScore,
          MINIMUM_SCORES.wasteManagement,
        )
          ? `
      <div class="improvements-section">
        <div class="improvements-header">
          <span class="improvements-header-icon">💡</span>
          <h2 class="improvements-title">Sugestões de Melhorias</h2>
        </div>
        <p style="font-size: 14px; color: #92400E; margin-bottom: 20px;">
          As seguintes sugestões podem ajudar a melhorar as pontuações abaixo do mínimo exigido:
        </p>

        ${
          needsImprovement(
            property.waterManagementScore,
            MINIMUM_SCORES.waterManagement,
          )
            ? renderImprovementSection(
                "💧 Quantidade de Água",
                "💧",
                getWaterManagementImprovements(),
              )
            : ""
        }

        ${
          needsImprovement(
            property.waterQualityConservationScore,
            MINIMUM_SCORES.waterQuality,
          )
            ? renderImprovementSection(
                "✓ Qualidade da Água",
                "✓",
                getWaterQualityImprovements(),
              )
            : ""
        }

        ${
          needsImprovement(
            property.wasteManagementScore,
            MINIMUM_SCORES.wasteManagement,
          )
            ? renderImprovementSection(
                "♻️ Manejo de Resíduos",
                "♻️",
                getWasteManagementImprovements(),
              )
            : ""
        }
      </div>
      `
          : ""
      }

      <div class="footer">
        <strong>EMBRAPA - Empresa Brasileira de Pesquisa Agropecuária</strong>
        <div class="footer-note">
          Este relatório foi gerado automaticamente pelo aplicativo IDH Leite.
          <br>
          As pontuações refletem o desempenho hídrico da propriedade avaliada.
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateAndSharePDF = async (
  options: PDFGeneratorOptions,
): Promise<void> => {
  try {
    // Verifica se o compartilhamento está disponível
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert(
        "Erro",
        "O compartilhamento não está disponível neste dispositivo.",
      );
      return;
    }

    // Gera o HTML
    const htmlContent = generateHTMLContent(options);

    // Cria o PDF
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // Define o nome do arquivo
    const timestamp = new Date().getTime();
    const fileName = `IDH_Leite_${options.property.city.replace(/\s/g, "_")}_${timestamp}.pdf`;

    // Cria referências aos arquivos usando a nova API
    const tempFile = new File(uri);
    const pdfFile = new File(Paths.document, fileName);

    // Copia o arquivo temporário para o diretório de documentos
    tempFile.copy(pdfFile);

    // Compartilha o PDF (isso abre a barra de compartilhamento nativa)
    await Sharing.shareAsync(pdfFile.uri, {
      mimeType: "application/pdf",
      dialogTitle: "Compartilhar Relatório IDH Leite",
      UTI: "com.adobe.pdf",
    });
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    Alert.alert(
      "Erro",
      "Não foi possível gerar o relatório. Por favor, tente novamente.",
    );
  }
};

export const generatePDF = async (
  options: PDFGeneratorOptions,
): Promise<string> => {
  try {
    const htmlContent = generateHTMLContent(options);

    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    return uri;
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw error;
  }
};
