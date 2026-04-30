import Toast from "react-native-toast-message";
import type { TFunction } from "i18next";

type IndicatorFn = (
  answers: { [key: string]: number | null },
  propertyId: string,
) => Promise<{ data?: { finalScore?: number | null } } | undefined>;

interface Params {
  propertyId: string;
  answers: { [key: string]: number | null };
  createWaterQualityConservation: IndicatorFn;
  translatedGroupName: string;
  t: TFunction;
  onSuccess: (score: number) => void;
}

export async function handleWaterQualityStep({
  propertyId,
  answers,
  createWaterQualityConservation,
  translatedGroupName,
  t,
  onSuccess,
}: Params): Promise<void> {
  const response = await createWaterQualityConservation(answers, propertyId);
  const score = response?.data?.finalScore ?? 0;
  onSuccess(score);

  Toast.show({
    type: "score",
    text1: t("questionnaire.questions.toasts.scoreTitle", {
      groupName: translatedGroupName,
    }),
    text2: score.toFixed(2).replace(".", ","),
    position: "bottom",
    visibilityTime: 5000,
    bottomOffset: 200,
  });
}
