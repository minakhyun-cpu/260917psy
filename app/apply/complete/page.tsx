import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "신청 완료",
  description: "상담 신청이 정상적으로 접수되었습니다.",
};

export default function ApplyCompletePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-2xl text-brand-700">
        ✓
      </div>
      <h1 className="mt-6 text-2xl font-bold text-slate-900">
        신청이 접수되었습니다
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        소중한 신청 감사합니다. 담당 상담사가 입력해주신 연락처 또는
        이메일로 영업일 기준 1~2일 이내에 연락드려 일정을 확정해드립니다.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
