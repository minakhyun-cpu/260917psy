"use server";

import { applicationSchema, type ApplicationInput } from "@/types/application";
import { getSupabaseServerClient } from "@/lib/supabase";
import { sendApplicationNotification } from "@/lib/email";

export type SubmitApplicationResult =
  | { success: true }
  | { success: false; error: string };

// Re-validates on the server (never trust client input) before writing to
// Supabase and notifying the operator. Client-side Zod validation via
// react-hook-form only improves UX; it is not a security boundary.
export async function submitApplication(
  input: ApplicationInput,
): Promise<SubmitApplicationResult> {
  const parsed = applicationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: "입력하신 내용을 다시 확인해주세요.",
    };
  }

  const data = parsed.data;

  try {
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.from("applications").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      test_type: data.testType,
      sub_tests: data.subTests,
      consult_method: data.consultMethod,
      preferred_date: data.preferredDate,
      message: data.message || null,
      privacy_consent: data.privacyConsent,
    });

    if (error) {
      console.error("Supabase insert error", error);
      return {
        success: false,
        error: "신청 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }
  } catch (err) {
    console.error("submitApplication error", err);
    return {
      success: false,
      error: "신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  try {
    await sendApplicationNotification(data);
  } catch (err) {
    // The application is already saved; a notification failure shouldn't
    // block the user from seeing the completion page.
    console.error("sendApplicationNotification error", err);
  }

  return { success: true };
}
