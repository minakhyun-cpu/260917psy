import { describe, expect, it } from "vitest";
import { applicationSchema, type ApplicationInput } from "./application";

const validInput: ApplicationInput = {
  name: "홍길동",
  phone: "010-1234-5678",
  email: "test@example.com",
  testType: "personality",
  consultMethod: "online",
  preferredDate: "2099-01-01",
  message: "잘 부탁드립니다.",
  privacyConsent: true,
};

describe("applicationSchema", () => {
  it("accepts a fully valid application", () => {
    const result = applicationSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("accepts a valid application without the optional message", () => {
    const { message, ...rest } = validInput;
    void message;
    const result = applicationSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = applicationSchema.safeParse({ ...validInput, name: "  " });
    expect(result.success).toBe(false);
  });

  it("rejects a phone number with letters", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      phone: "010-abcd-5678",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a phone number that is too short", () => {
    const result = applicationSchema.safeParse({ ...validInput, phone: "123" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email address", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown test type", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      testType: "unknown",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown consult method", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      consultMethod: "unknown",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a preferred date in the past", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      preferredDate: "2000-01-01",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing preferred date", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      preferredDate: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a message longer than 500 characters", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      message: "a".repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it("rejects when privacy consent is false", () => {
    const result = applicationSchema.safeParse({
      ...validInput,
      privacyConsent: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects when privacy consent is missing", () => {
    const { privacyConsent, ...rest } = validInput;
    void privacyConsent;
    const result = applicationSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});
