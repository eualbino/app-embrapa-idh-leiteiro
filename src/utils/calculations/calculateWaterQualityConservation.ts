import type {
  CreateWaterQualityConservationRequest,
  WaterQualityConservationData,
} from "@/src/services/api/questionnaire/water-quality-conservation/dtos";

type WaterQualityInput = Omit<
  CreateWaterQualityConservationRequest,
  "propertyId" | "monitoredWaterPointsPercent" | "nitrateAnalysis" | "eColiAnalysis"
> & {
  monitoredWaterPointsPercent: number | null;
  nitrateAnalysis: number | null;
  eColiAnalysis: number | null;
};

export function calculateWaterQualityConservation(
  data: WaterQualityInput,
): Omit<WaterQualityConservationData, "propertyId"> {
  // Qualidade da Água (Q14-Q17)
  // Q15, Q16, Q17 são opcionais; se null, são omitidas sem redistribuição de peso
  let qualidadeAgua = data.monitorsQuality * 0.263;
  if (data.monitoredWaterPointsPercent !== null)
    qualidadeAgua += data.monitoredWaterPointsPercent * 0.223;
  if (data.nitrateAnalysis !== null)
    qualidadeAgua += data.nitrateAnalysis * 0.254;
  if (data.eColiAnalysis !== null)
    qualidadeAgua += data.eColiAnalysis * 0.260;

  // Conservação da Água (Q18-Q21)
  const conservacaoAgua =
    data.animalsAccessWaterBodies * 0.216 +
    data.drinkerWaterSupply * 0.304 +
    data.waterAccumulationAreas * 0.233 +
    data.drinkerCleaningFrequency * 0.247;

  const finalScore = qualidadeAgua * 0.48 + conservacaoAgua * 0.52;

  return {
    finalScore,
    mesoIndicators: { qualidadeAgua, conservacaoAgua },
    scores: {
      monitorsQualityScore: data.monitorsQuality,
      monitoredWaterPointsPercentScore: data.monitoredWaterPointsPercent,
      nitrateAnalysisScore: data.nitrateAnalysis,
      eColiAnalysisScore: data.eColiAnalysis,
      animalsAccessWaterBodiesScore: data.animalsAccessWaterBodies,
      drinkerWaterSupplyScore: data.drinkerWaterSupply,
      waterAccumulationAreasScore: data.waterAccumulationAreas,
      drinkerCleaningFrequencyScore: data.drinkerCleaningFrequency,
    },
  };
}
