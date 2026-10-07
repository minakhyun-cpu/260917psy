import {
  ENERGY_LEVELS,
  SUPPORT_TYPES,
  type BurnoutCheckInInput,
} from "@/types/burnout";

// This module only ever runs in the browser (imported from a "use client"
// component). The user's API key is sent directly from their browser to
// Google's API and never touches our server or Supabase.
export const GEMINI_MODEL = "gemini-3.5-flash-lite";

const SYSTEM_PROMPT = `당신은 번아웃 회복을 돕는 다정하고 신중한 웰빙 코치입니다.
사용자가 남긴 현재 상태와 스트레스 요인을 읽고 아래 순서로 답하세요.
1) 공감하는 한두 문장 요약
2) 오늘 바로 실천할 수 있는 회복 행동 3가지 ("- "로 시작하는 목록)
3) 이번 주에 시도해볼 습관 1~2가지 ("- "로 시작하는 목록)
의학적 진단이나 약물을 권하지 마세요. 증상이 심각해 보이면 전문가 상담이나
정신건강 위기상담전화(1577-0199), 자살예방상담전화(1393) 이용을 안내하세요.
답변은 한국어 평문으로 작성하고, #·*·** 같은 마크다운 기호는 쓰지 말고
줄바꿈과 "- " 기호만 사용해 간결하게 작성하세요.`;

function buildUserPrompt(input: BurnoutCheckInInput) {
  const energyLabel =
    ENERGY_LEVELS.find((l) => l.value === input.energyLevel)?.label ??
    input.energyLevel;
  const supportLabel =
    SUPPORT_TYPES.find((s) => s.value === input.supportType)?.label ??
    input.supportType;

  return [
    `현재 에너지 수준: ${energyLabel}`,
    `주된 스트레스 요인: ${input.stressors}`,
    `원하는 도움 유형: ${supportLabel}`,
    input.note ? `추가로 남기고 싶은 말: ${input.note}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function generateBurnoutPlan(
  input: BurnoutCheckInInput,
): Promise<string> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${encodeURIComponent(input.apiKey)}`;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          { role: "user", parts: [{ text: buildUserPrompt(input) }] },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
      }),
    });
  } catch {
    throw new Error(
      "AI 서버에 연결하지 못했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.",
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message: string | undefined = data?.error?.message;

    if (response.status === 400 || response.status === 403) {
      throw new Error(
        "API 키가 올바르지 않거나 권한이 없습니다. 키를 다시 확인해주세요.",
      );
    }
    if (response.status === 429) {
      throw new Error("요청이 많아 잠시 후 다시 시도해주세요.");
    }
    throw new Error(message ?? "AI 응답을 받아오는 중 문제가 발생했습니다.");
  }

  const text: string | undefined = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? "")
    .join("");

  if (!text?.trim()) {
    throw new Error(
      "AI가 안전상의 이유로 답변을 만들지 못했습니다. 표현을 조금 바꿔 다시 시도해주세요.",
    );
  }

  return text.trim();
}
