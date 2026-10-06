import { z } from "zod";

export const COLUMN_CATEGORIES = [
  { value: "psychology", label: "심리학" },
  { value: "neuroscience", label: "뇌과학" },
  { value: "other", label: "기타" },
] as const;

export const columnSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "제목을 입력해주세요.")
    .max(100, "100자 이내로 입력해주세요."),
  summary: z
    .string()
    .trim()
    .min(1, "한 줄 요약을 입력해주세요.")
    .max(200, "200자 이내로 입력해주세요."),
  content: z
    .string()
    .trim()
    .min(1, "본문을 입력해주세요.")
    .max(10000, "10000자 이내로 입력해주세요."),
  category: z.enum(["psychology", "neuroscience", "other"], {
    message: "분류를 선택해주세요.",
  }),
  authorName: z
    .string()
    .trim()
    .min(1, "작성자명을 입력해주세요.")
    .max(30, "30자 이내로 입력해주세요."),
  published: z.boolean(),
});

export type ColumnInput = z.infer<typeof columnSchema>;

export type ColumnRecord = {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  authorName: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
