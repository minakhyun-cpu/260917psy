"use client";

import { useState, useTransition } from "react";
import { deleteColumn } from "@/app/admin/columns/actions";

export default function AdminColumnDeleteButton({
  columnId,
}: {
  columnId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    if (!window.confirm("이 칼럼을 삭제하시겠습니까?")) return;

    startTransition(async () => {
      try {
        await deleteColumn(columnId);
      } catch {
        setError("삭제 중 문제가 발생했습니다.");
      }
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-600 hover:bg-stone-50 disabled:opacity-60"
      >
        {isPending ? "삭제 중..." : "삭제"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
