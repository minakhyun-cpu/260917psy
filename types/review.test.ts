import { describe, expect, it } from "vitest";
import { reviewSchema, type ReviewInput } from "./review";

const validInput: ReviewInput = {
  name: "홍길동",
  rating: 5,
  content: "상담이 정말 도움이 되었습니다.",
  website: "",
};

describe("reviewSchema", () => {
  it("accepts a fully valid review", () => {
    expect(reviewSchema.safeParse(validInput).success).toBe(true);
  });

  it("rejects an empty name", () => {
    expect(
      reviewSchema.safeParse({ ...validInput, name: "  " }).success,
    ).toBe(false);
  });

  it("rejects a rating below 1", () => {
    expect(
      reviewSchema.safeParse({ ...validInput, rating: 0 }).success,
    ).toBe(false);
  });

  it("rejects a rating above 5", () => {
    expect(
      reviewSchema.safeParse({ ...validInput, rating: 6 }).success,
    ).toBe(false);
  });

  it("rejects content shorter than 5 characters", () => {
    expect(
      reviewSchema.safeParse({ ...validInput, content: "ok" }).success,
    ).toBe(false);
  });

  it("rejects content longer than 1000 characters", () => {
    expect(
      reviewSchema.safeParse({ ...validInput, content: "a".repeat(1001) })
        .success,
    ).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    expect(
      reviewSchema.safeParse({ ...validInput, website: "http://spam.example" })
        .success,
    ).toBe(false);
  });
});
