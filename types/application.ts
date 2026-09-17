import { z } from "zod";
import { TEST_CATALOG } from "@/lib/testCatalog";

export const TEST_TYPES = [
  { value: "personality", label: "성격검사" },
  { value: "child", label: "자녀 검사" },
  { value: "stress", label: "정서·스트레스 척도" },
  { value: "other", label: "기타" },
] as const;

export const CONSULT_METHODS = [
  { value: "online", label: "비대면 (화상/전화)" },
  { value: "offline", label: "대면" },
] as const;

export const APPLICATION_STATUSES = [
  { value: "received", label: "접수" },
  { value: "confirmed", label: "확인" },
  { value: "completed", label: "완료" },
] as const;

export const applicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해주세요.")
    .max(50, "이름은 50자 이내로 입력해주세요."),
  phone: z
    .string()
    .trim()
    .min(9, "연락처를 정확히 입력해주세요.")
    .max(20, "연락처를 정확히 입력해주세요.")
    .regex(/^[0-9-]+$/, "숫자와 '-'만 입력해주세요."),
  email: z.string().trim().min(1, "이메일을 입력해주세요.").email("올바른 이메일 주소를 입력해주세요."),
  testType: z.enum(["personality", "child", "stress", "other"], {
    message: "희망 검사 종류를 선택해주세요.",
  }),
  subTests: z.array(z.string()),
  consultMethod: z.enum(["online", "offline"], {
    message: "희망 상담 방식을 선택해주세요.",
  }),
  preferredDate: z
    .string()
    .min(1, "희망 일정을 선택해주세요.")
    .refine((v) => !Number.isNaN(Date.parse(v)), {
      message: "올바른 날짜를 선택해주세요.",
    })
    .refine(
      (v) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(v) >= today;
      },
      { message: "오늘 이후의 날짜를 선택해주세요." },
    ),
  message: z
    .string()
    .trim()
    .max(500, "500자 이내로 입력해주세요.")
    .optional()
    .or(z.literal("")),
  privacyConsent: z.literal(true, {
    message: "개인정보 수집·이용에 동의해주세요.",
  }),
}).superRefine((data, ctx) => {
  const availableSubTests = TEST_CATALOG.find((t) => t.slug === data.testType)?.subTests;
  if (availableSubTests && availableSubTests.length > 0 && data.subTests.length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["subTests"],
      message: "하위 검사를 1개 이상 선택해주세요.",
    });
  }
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number]["value"];

export type ApplicationRecord = {
  id: string;
  name: string;
  phone: string;
  email: string;
  test_type: string;
  sub_tests: string[] | null;
  consult_method: string;
  preferred_date: string;
  message: string | null;
  status: ApplicationStatus;
  created_at: string;
};
