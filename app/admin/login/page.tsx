"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginResult } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<
    AdminLoginResult,
    FormData
  >(loginAdmin, undefined);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 sm:px-6">
      <h1 className="text-2xl font-semibold text-stone-900">관리자 로그인</h1>
      <p className="mt-2 text-sm text-stone-600">
        신청 접수 목록을 확인하려면 관리자 비밀번호를 입력해주세요.
      </p>

      <form action={formAction} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-stone-700">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          />
        </div>

        {state?.error && (
          <p role="alert" className="text-sm text-red-600">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(217,96,58,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_-6px_rgba(217,96,58,0.55)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "확인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
