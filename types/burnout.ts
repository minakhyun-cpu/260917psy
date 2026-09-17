import { z } from "zod";

export const ENERGY_LEVELS = [
  { value: "1", label: "매우 낮음 (거의 탈진 상태)" },
  { value: "2", label: "낮음" },
  { value: "3", label: "보통" },
  { value: "4", label: "높음" },
  { value: "5", label: "매우 높음" },
] as const;

export const SUPPORT_TYPES = [
  { value: "immediate_rest", label: "즉각적인 휴식 루틴" },
  { value: "thought_clarity", label: "생각 정리 및 우선순위 정리" },
  { value: "motivation", label: "다시 시작할 동기 부여" },
  { value: "listening", label: "그냥 이야기를 들어줄 상대" },
] as const;

export const burnoutCheckInSchema = z.object({
  apiKey: z
    .string()
    .trim()
    .min(10, "Gemini API 키를 입력해주세요."),
  energyLevel: z.enum(["1", "2", "3", "4", "5"], {
    message: "현재 에너지 수준을 선택해주세요.",
  }),
  stressors: z
    .string()
    .trim()
    .min(2, "어떤 점이 힘든지 간단히 적어주세요.")
    .max(500, "500자 이내로 입력해주세요."),
  supportType: z.enum(
    ["immediate_rest", "thought_clarity", "motivation", "listening"],
    { message: "원하는 도움 유형을 선택해주세요." },
  ),
  note: z.string().trim().max(300, "300자 이내로 입력해주세요.").optional().or(z.literal("")),
});

export type BurnoutCheckInInput = z.infer<typeof burnoutCheckInSchema>;
