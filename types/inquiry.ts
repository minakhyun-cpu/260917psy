import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해주세요.")
    .max(30, "30자 이내로 입력해주세요."),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 주소를 입력해주세요."),
  message: z
    .string()
    .trim()
    .min(5, "내용을 5자 이상 입력해주세요.")
    .max(2000, "2000자 이내로 입력해주세요."),
  website: z.string().max(0, "제출에 실패했습니다.").optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type InquiryRecord = {
  id: string;
  name: string;
  email: string;
  message: string;
  resolved: boolean;
  createdAt: string;
};
