import { z } from "zod";

export const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름 또는 닉네임을 입력해주세요.")
    .max(30, "30자 이내로 입력해주세요."),
  rating: z
    .number()
    .int()
    .min(1, "별점을 선택해주세요.")
    .max(5, "별점을 선택해주세요."),
  content: z
    .string()
    .trim()
    .min(5, "후기 내용을 5자 이상 입력해주세요.")
    .max(1000, "1000자 이내로 입력해주세요."),
  // Honeypot: real users never fill this hidden field, simple bots often do.
  website: z.string().max(0, "제출에 실패했습니다.").optional().or(z.literal("")),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

export type ReviewRecord = {
  id: string;
  name: string;
  rating: number;
  content: string;
  createdAt: string;
};
