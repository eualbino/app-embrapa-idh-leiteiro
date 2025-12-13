// External Libraries

// Components
import { PageWrapper } from "@/src/components/commons/layout";
import ResetPasswordForgotPassword from "@/src/components/pages/forgot-password/reset-password";

export default function ResetPasswordPage() {
  return (
    <PageWrapper
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <ResetPasswordForgotPassword />
    </PageWrapper>
  );
}
