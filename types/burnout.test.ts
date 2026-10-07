import { describe, expect, it } from "vitest";
import { burnoutCheckInSchema, type BurnoutCheckInInput } from "./burnout";

const validInput: BurnoutCheckInInput = {
  apiKey: "AIzaSyTestKeyExample1234567890",
  energyLevel: "2",
  stressors: "업무량이 많고 잠을 잘 못 자요",
  supportType: "immediate_rest",
  note: "",
};

describe("burnoutCheckInSchema", () => {
  it("accepts a fully valid check-in", () => {
    const result = burnoutCheckInSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("accepts a valid check-in without the optional note", () => {
    const { note, ...rest } = validInput;
    void note;
    const result = burnoutCheckInSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("rejects a missing api key", () => {
    const result = burnoutCheckInSchema.safeParse({ ...validInput, apiKey: "" });
    expect(result.success).toBe(false);
  });

  it("rejects an api key that is too short", () => {
    const result = burnoutCheckInSchema.safeParse({ ...validInput, apiKey: "short" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown energy level", () => {
    const result = burnoutCheckInSchema.safeParse({
      ...validInput,
      energyLevel: "0",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty stressors field", () => {
    const result = burnoutCheckInSchema.safeParse({ ...validInput, stressors: " " });
    expect(result.success).toBe(false);
  });

  it("rejects stressors longer than 500 characters", () => {
    const result = burnoutCheckInSchema.safeParse({
      ...validInput,
      stressors: "a".repeat(501),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown support type", () => {
    const result = burnoutCheckInSchema.safeParse({
      ...validInput,
      supportType: "unknown",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a note longer than 300 characters", () => {
    const result = burnoutCheckInSchema.safeParse({
      ...validInput,
      note: "a".repeat(301),
    });
    expect(result.success).toBe(false);
  });
});
