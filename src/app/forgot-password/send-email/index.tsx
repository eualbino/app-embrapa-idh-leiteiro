// External Libraries

// Components
import { PageWrapper } from "@/src/components/commons/layout";
import SendEmailForgotPassword from "@/src/components/pages/forgot-password/send-email";

export default function ForgotPasswordPage() {
  return (
    <PageWrapper>
      <SendEmailForgotPassword />
    </PageWrapper>
  );
}
