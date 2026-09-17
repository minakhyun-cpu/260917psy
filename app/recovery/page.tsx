import type { Metadata } from "next";
import Link from "next/link";
import BurnoutRecoveryTool from "@/components/BurnoutRecoveryTool";

export const metadata: Metadata = {
  title: "AI 번아웃 회복 솔루션",
  description:
    "Gemini AI를 활용해 지금 상태에 맞는 번아웃 회복 플랜을 받아보세요. 본인의 Gemini API 키로 직접 이용할 수 있습니다.",
};

export default function RecoveryPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">AI 번아웃 회복 솔루션</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        간단한 체크인을 남기면 AI가 오늘 바로 실천할 수 있는 회복 행동을
        제안해드립니다. 본인의 Gemini API 키를 입력해 바로 사용해보세요.
        보다 깊은 대화가 필요하다면{" "}
        <Link href="/apply" className="font-medium text-teal-700 underline underline-offset-2">
          전문 상담사와의 해석상담
        </Link>
        도 신청할 수 있습니다.
      </p>

      <div className="mt-10">
        <BurnoutRecoveryTool />
      </div>
    </div>
  );
}
