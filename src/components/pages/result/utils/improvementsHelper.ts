import type { TFunction } from "i18next";

export interface ImprovementItem {
  title: string;
  subtitle: string;
  items: string[];
}

export interface ImprovementsData {
  waterManagement: ImprovementItem[];
  waterQuality: ImprovementItem[];
  wasteManagement: ImprovementItem[];
}

export const getImprovements = (t: TFunction): ImprovementsData => {
  return {
    waterManagement: [
      {
        title: t("result.improvements.waterManagement.waterConsumption.title"),
        subtitle: t(
          "result.improvements.waterManagement.waterConsumption.subtitle",
        ),
        items: t("result.improvements.waterManagement.waterConsumption.items", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("result.improvements.waterManagement.waterLosses.title"),
        subtitle: t("result.improvements.waterManagement.waterLosses.subtitle"),
        items: t("result.improvements.waterManagement.waterLosses.items", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("result.improvements.waterManagement.waterSecurity.title"),
        subtitle: t(
          "result.improvements.waterManagement.waterSecurity.subtitle",
        ),
        items: t("result.improvements.waterManagement.waterSecurity.items", {
          returnObjects: true,
        }) as string[],
      },
    ],
    waterQuality: [
      {
        title: t("result.improvements.waterQuality.waterAnalysis.title"),
        subtitle: t("result.improvements.waterQuality.waterAnalysis.subtitle"),
        items: t("result.improvements.waterQuality.waterAnalysis.items", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("result.improvements.waterQuality.waterConservation.title"),
        subtitle: t(
          "result.improvements.waterQuality.waterConservation.subtitle",
        ),
        items: t("result.improvements.waterQuality.waterConservation.items", {
          returnObjects: true,
        }) as string[],
      },
    ],
    wasteManagement: [
      {
        title: t("result.improvements.wasteManagement.wasteStructure.title"),
        subtitle: t(
          "result.improvements.wasteManagement.wasteStructure.subtitle",
        ),
        items: t("result.improvements.wasteManagement.wasteStructure.items", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("result.improvements.wasteManagement.wasteHandling.title"),
        subtitle: t(
          "result.improvements.wasteManagement.wasteHandling.subtitle",
        ),
        items: t("result.improvements.wasteManagement.wasteHandling.items", {
          returnObjects: true,
        }) as string[],
      },
      {
        title: t("result.improvements.wasteManagement.fertilization.title"),
        subtitle: t(
          "result.improvements.wasteManagement.fertilization.subtitle",
        ),
        items: t("result.improvements.wasteManagement.fertilization.items", {
          returnObjects: true,
        }) as string[],
      },
    ],
  };
};
