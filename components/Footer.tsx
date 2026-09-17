import Link from "next/link";
import { LeafIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-brand-50/40">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm text-slate-500 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-semibold text-slate-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
                <LeafIcon className="h-3.5 w-3.5" />
              </span>
              마지 마인드랩
            </p>
            <p className="mt-2">
              본 서비스는 심리검사 해석상담 신청 접수를 위한 안내 페이지이며,
              결제 및 온라인 검사 응시는 별도 절차로 진행됩니다.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-700">
              개인정보처리방침
            </Link>
            <Link href="/apply" className="hover:text-brand-700">
              상담 신청
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} 마지 마인드랩. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
