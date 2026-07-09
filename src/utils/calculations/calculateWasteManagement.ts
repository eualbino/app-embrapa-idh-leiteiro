import type {
  CreateWasteManagementRequest,
  WasteManagementData,
} from "@/src/services/api/questionnaire/waste-management/dtos";
import { roundToTwo } from "./roundToTwo";

function getEstruturaWeights(impermeabilizedSystem: number): {
  wasteStorageSystem: number;
  impermeabilizedSystem: number;
  rainwaterDiverted: number;
  systemLeaks: number;
  roofGutters: number;
} {
  if (impermeabilizedSystem === 1) {
    return {
      wasteStorageSystem: 0.223,
      impermeabilizedSystem: 0.227,
      rainwaterDiverted: 0.150,
      systemLeaks: 0.238,
      roofGutters: 0.162,
    };
  }

  if (impermeabilizedSystem === 0.67) {
    return {
      wasteStorageSystem: 0.306,
      impermeabilizedSystem: 0,
      rainwaterDiverted: 0.206,
      systemLeaks: 0.326,
      roofGutters: 0.162,
    };
  }

  return {
    wasteStorageSystem: 0.838,
    impermeabilizedSystem: 0,
    rainwaterDiverted: 0,
    systemLeaks: 0,
    roofGutters: 0.162,
  };
}

export function calculateWasteManagement(
  data: Omit<CreateWasteManagementRequest, "propertyId">,
): Omit<WasteManagementData, "propertyId"> {
  const ew = getEstruturaWeights(data.impermeabilizedSystem);

  const estrutura =
    data.wasteStorageSystem * ew.wasteStorageSystem +
    data.impermeabilizedSystem * ew.impermeabilizedSystem +
    data.rainwaterDiverted * ew.rainwaterDiverted +
    data.systemLeaks * ew.systemLeaks +
    data.roofGutters * ew.roofGutters;

  const manejoResiduo =
    data.floorWashingPercentage * 0.223 +
    data.manureRaking * 0.294 +
    data.pressureWashing * 0.282 +
    data.emergencyPlan * 0.201;

  const adubacao =
    data.fertilizerDocumentation * 0.167 +
    data.organicResidueLab * 0.210 +
    data.soilAnalysis * 0.262 +
    data.residueApplicationFrequency * 0.174 +
    data.residueApplicationMethod * 0.187;

  const finalScore =
    estrutura * 0.302 + manejoResiduo * 0.401 + adubacao * 0.297;

  return {
    finalScore: roundToTwo(finalScore) as number,
    mesoIndicators: {
      estrutura: roundToTwo(estrutura) as number,
      manejoResiduo: roundToTwo(manejoResiduo) as number,
      adubacao: roundToTwo(adubacao) as number,
    },
    scores: {
      wasteStorageSystemScore: data.wasteStorageSystem,
      impermeabilizedSystemScore: data.impermeabilizedSystem,
      rainwaterDivertedScore: data.rainwaterDiverted,
      systemLeaksScore: data.systemLeaks,
      roofGuttersScore: data.roofGutters,
      floorWashingPercentageScore: data.floorWashingPercentage,
      manureRakingScore: data.manureRaking,
      pressureWashingScore: data.pressureWashing,
      emergencyPlanScore: data.emergencyPlan,
      fertilizerDocumentationScore: data.fertilizerDocumentation,
      organicResidueLabScore: data.organicResidueLab,
      soilAnalysisScore: data.soilAnalysis,
      residueApplicationFrequencyScore: data.residueApplicationFrequency,
      residueApplicationMethodScore: data.residueApplicationMethod,
    },
  };
}
