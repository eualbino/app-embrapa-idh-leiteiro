// External Libraries

// Components
import { PageWrapper } from "@/src/components/commons/layout";
import ConfirmCodeForgotPassword from "@/src/components/pages/forgot-password/confirm-code";

export default function ConfirmCodePage() {
  return (
    <PageWrapper
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <ConfirmCodeForgotPassword />
    </PageWrapper>
  );
}
