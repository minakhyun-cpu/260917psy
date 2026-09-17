"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME } from "@/lib/adminAuth";
import { getSupabaseServerClient } from "@/lib/supabase";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/types/application";

export type AdminLoginResult = { success: false; error: string } | undefined;

export async function loginAdmin(
  _prevState: AdminLoginResult,
  formData: FormData,
): Promise<AdminLoginResult> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    return { success: false, error: "비밀번호가 올바르지 않습니다." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}

const VALID_STATUSES = APPLICATION_STATUSES.map((s) => s.value);

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("올바르지 않은 상태 값입니다.");
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId);

  if (error) {
    throw new Error("상태 업데이트 중 문제가 발생했습니다.");
  }

  revalidatePath("/admin");
}
