import { describe, expect, it } from "vitest";
import { inquirySchema, type InquiryInput } from "./inquiry";

const validInput: InquiryInput = {
  name: "홍길동",
  email: "test@example.com",
  message: "이용 시간대를 늘려주실 수 있을까요?",
  website: "",
};

describe("inquirySchema", () => {
  it("accepts a fully valid inquiry", () => {
    expect(inquirySchema.safeParse(validInput).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(
      inquirySchema.safeParse({ ...validInput, email: "not-an-email" })
        .success,
    ).toBe(false);
  });

  it("rejects a message shorter than 5 characters", () => {
    expect(
      inquirySchema.safeParse({ ...validInput, message: "hi" }).success,
    ).toBe(false);
  });

  it("rejects a message longer than 2000 characters", () => {
    expect(
      inquirySchema.safeParse({ ...validInput, message: "a".repeat(2001) })
        .success,
    ).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    expect(
      inquirySchema.safeParse({
        ...validInput,
        website: "http://spam.example",
      }).success,
    ).toBe(false);
  });
});
