import { describe, expect, it } from "vitest";
import { columnSchema, type ColumnInput } from "./column";

const validInput: ColumnInput = {
  title: "스트레스와 뇌의 관계",
  summary: "만성 스트레스가 뇌에 미치는 영향을 알아봅니다.",
  content: "본문 내용입니다.",
  category: "neuroscience",
  authorName: "김서연",
  published: true,
};

describe("columnSchema", () => {
  it("accepts a fully valid column", () => {
    expect(columnSchema.safeParse(validInput).success).toBe(true);
  });

  it("rejects an empty title", () => {
    expect(
      columnSchema.safeParse({ ...validInput, title: "  " }).success,
    ).toBe(false);
  });

  it("rejects an empty content", () => {
    expect(
      columnSchema.safeParse({ ...validInput, content: "" }).success,
    ).toBe(false);
  });

  it("rejects an unknown category", () => {
    expect(
      columnSchema.safeParse({ ...validInput, category: "unknown" }).success,
    ).toBe(false);
  });

  it("accepts published=false (draft)", () => {
    expect(
      columnSchema.safeParse({ ...validInput, published: false }).success,
    ).toBe(true);
  });

  it("rejects a title longer than 100 characters", () => {
    expect(
      columnSchema.safeParse({ ...validInput, title: "a".repeat(101) })
        .success,
    ).toBe(false);
  });
});
