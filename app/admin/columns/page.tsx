import type { Metadata } from "next";
import Link from "next/link";
import { listAllColumns } from "@/lib/columns";
import { COLUMN_CATEGORIES } from "@/types/column";
import AdminColumnDeleteButton from "@/components/AdminColumnDeleteButton";
import AdminNav from "@/components/AdminNav";

export const metadata: Metadata = {
  title: "칼럼 관리",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function getCategoryLabel(value: string) {
  return COLUMN_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export default async function AdminColumnsPage() {
  let columns: Awaited<ReturnType<typeof listAllColumns>> = [];
  let loadError: string | null = null;

  try {
    columns = await listAllColumns();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "칼럼을 불러오지 못했습니다.";
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <AdminNav />
      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">칼럼 관리</h1>
        <Link
          href="/admin/columns/new"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          새 칼럼 작성
        </Link>
      </div>

      {loadError && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </p>
      )}

      {!loadError && columns.length === 0 && (
        <p className="mt-6 text-sm text-stone-500">작성된 칼럼이 없습니다.</p>
      )}

      {!loadError && columns.length > 0 && (
        <div className="mt-6 space-y-3">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
                    {getCategoryLabel(column.category)}
                  </span>
                  <span>{column.published ? "공개" : "비공개"}</span>
                  <span>{new Date(column.createdAt).toLocaleDateString("ko-KR")}</span>
                </div>
                <p className="mt-1 font-semibold text-stone-900">{column.title}</p>
                <p className="mt-0.5 text-sm text-stone-500">{column.summary}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/columns/${column.id}/edit`}
                  className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-600 hover:bg-stone-50"
                >
                  수정
                </Link>
                <AdminColumnDeleteButton columnId={column.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
