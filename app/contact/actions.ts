"use server";

import { revalidatePath } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";
import { inquirySchema, type InquiryInput } from "@/types/inquiry";
import { getFirestoreDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminAuth";

export type SubmitInquiryResult =
  | { success: true }
  | { success: false; error: string };

export async function submitInquiry(
  input: InquiryInput,
): Promise<SubmitInquiryResult> {
  const parsed = inquirySchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: "입력하신 내용을 다시 확인해주세요." };
  }

  if (parsed.data.website) {
    return { success: false, error: "제출에 실패했습니다." };
  }

  try {
    const db = getFirestoreDb();
    await db.collection("inquiries").add({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      resolved: false,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.error("submitInquiry error", err);
    return {
      success: false,
      error: "문의 등록 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  return { success: true };
}

export async function toggleInquiryResolved(
  inquiryId: string,
  resolved: boolean,
) {
  await requireAdmin();

  const db = getFirestoreDb();
  await db.collection("inquiries").doc(inquiryId).update({ resolved });

  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(inquiryId: string) {
  await requireAdmin();

  const db = getFirestoreDb();
  await db.collection("inquiries").doc(inquiryId).delete();

  revalidatePath("/admin/inquiries");
}
