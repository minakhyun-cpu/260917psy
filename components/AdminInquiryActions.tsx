"use client";

import { useState, useTransition } from "react";
import { toggleInquiryResolved, deleteInquiry } from "@/app/contact/actions";

export default function AdminInquiryActions({
  inquiryId,
  resolved,
}: {
  inquiryId: string;
  resolved: boolean;
}) {
  const [isResolved, setIsResolved] = useState(resolved);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleToggle = () => {
    const next = !isResolved;
    setIsResolved(next);
    startTransition(async () => {
      try {
        await toggleInquiryResolved(inquiryId, next);
      } catch {
        setIsResolved(!next);
        setError("상태 변경 중 문제가 발생했습니다.");
      }
    });
  };

  const handleDelete = () => {
    if (!window.confirm("이 문의를 삭제하시겠습니까?")) return;
    startTransition(async () => {
      try {
        await deleteInquiry(inquiryId);
      } catch {
        setError("삭제 중 문제가 발생했습니다.");
      }
    });
  };

  return (
    <div className="flex shrink-0 flex-col items-end gap-1">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          className={`rounded-full border px-3 py-1 text-xs font-medium disabled:opacity-60 ${
            isResolved
              ? "border-brand-600 bg-brand-50 text-brand-700"
              : "border-stone-300 text-stone-600 hover:bg-stone-50"
          }`}
        >
          {isResolved ? "처리완료" : "미처리"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-600 hover:bg-stone-50 disabled:opacity-60"
        >
          삭제
        </button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
