// External Libraries
import Toast from "react-native-toast-message";
import type { TFunction } from "i18next";

// Services
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";

// Utils
import { validateCaracterizacaoForm } from "../validation";

// Types
import type { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

interface Params {
  formData: FormData | null;
  formDataOverride?: FormData | null;
  createProperty: (data: FormData) => Promise<{ property?: { id?: string } } | undefined>;
  t: TFunction;
  language: string;
  onSuccess: (propertyId: string, data: FormData) => void;
}

export async function handleCharacterizacaoStep({
  formData,
  formDataOverride,
  createProperty,
  t,
  language,
  onSuccess,
}: Params): Promise<void> {
  const data = formDataOverride ?? formData;

  if (!data) {
    Toast.show({
      type: "error",
      text1: t("questionnaire.questions.toasts.missingFormDataTitle"),
      text2: t("questionnaire.questions.toasts.missingFormDataMessage"),
      visibilityTime: 5000,
    });
    return;
  }

  const errors = validateCaracterizacaoForm(data, t, language);
  if (errors.length > 0) {
    Toast.show({
      type: "error",
      text1: t("questionnaire.questions.toasts.requiredFieldsTitle"),
      text2: `${t("questionnaire.questions.toasts.fillFieldsPrefix")}\n\n• ${errors.join("\n• ")}`,
      visibilityTime: 20000,
      autoHide: true,
    });
    return;
  }

  // useProperty.createProperty já lida com online/offline internamente
  const response = await createProperty(data);
  const pid = response?.property?.id;
  if (pid) {
    await OfflineSyncService.saveOfflinePropertyId(pid);
    onSuccess(pid, data);
  }
}
