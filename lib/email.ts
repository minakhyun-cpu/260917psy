import "server-only";

import { Resend } from "resend";
import { TEST_TYPES, CONSULT_METHODS } from "@/types/application";
import type { ApplicationInput } from "@/types/application";

function getLabel(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((o) => o.value === value)?.label ?? value;
}

// Notifies the operator by email that a new counseling application arrived.
// Silently no-ops when RESEND_API_KEY isn't configured so form submission
// still succeeds (the record is saved in Supabase either way) in local/dev.
export async function sendApplicationNotification(application: ApplicationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyTo) {
    console.warn(
      "RESEND_API_KEY 또는 ADMIN_NOTIFICATION_EMAIL이 설정되어 있지 않아 이메일 알림을 건너뜁니다.",
    );
    return;
  }

  const resend = new Resend(apiKey);

  const testTypeLabel = getLabel(TEST_TYPES, application.testType);
  const consultMethodLabel = getLabel(CONSULT_METHODS, application.consultMethod);

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
    to: notifyTo,
    subject: `[신청 접수] ${application.name}님 - ${testTypeLabel}`,
    text: [
      "새로운 상담 신청이 접수되었습니다.",
      "",
      `이름: ${application.name}`,
      `연락처: ${application.phone}`,
      `이메일: ${application.email}`,
      `희망 검사: ${testTypeLabel}`,
      `상담 방식: ${consultMethodLabel}`,
      `희망 일정: ${application.preferredDate}`,
      application.message ? `남기신 메시지: ${application.message}` : undefined,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
