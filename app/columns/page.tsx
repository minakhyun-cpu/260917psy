import type { Metadata } from "next";
import Link from "next/link";
import { listPublishedColumns } from "@/lib/columns";
import { COLUMN_CATEGORIES } from "@/types/column";

export const metadata: Metadata = {
  title: "심리학 & 뇌과학 칼럼",
  description: "심리학과 뇌과학을 주제로 한 마지 마인드랩의 칼럼을 읽어보세요.",
};

export const dynamic = "force-dynamic";

function getCategoryLabel(value: string) {
  return COLUMN_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export default async function ColumnsPage() {
  let columns: Awaited<ReturnType<typeof listPublishedColumns>> = [];
  let loadError: string | null = null;

  try {
    columns = await listPublishedColumns();
  } catch (err) {
    loadError = err instanceof Error ? err.message : "칼럼을 불러오지 못했습니다.";
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-stone-900">심리학 &amp; 뇌과학 칼럼</h1>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        마지 마인드랩이 전하는 심리학과 뇌과학 이야기입니다.
      </p>

      {loadError && (
        <p className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </p>
      )}

      {!loadError && columns.length === 0 && (
        <p className="mt-8 text-sm text-stone-500">아직 등록된 칼럼이 없습니다.</p>
      )}

      {!loadError && columns.length > 0 && (
        <div className="mt-8 space-y-4">
          {columns.map((column) => (
            <Link
              key={column.id}
              href={`/columns/${column.id}`}
              className="block rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
                  {getCategoryLabel(column.category)}
                </span>
                <span>{new Date(column.createdAt).toLocaleDateString("ko-KR")}</span>
                <span>· {column.authorName}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-stone-900">
                {column.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                {column.summary}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
