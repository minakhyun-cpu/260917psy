import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getColumnById } from "@/lib/columns";
import { COLUMN_CATEGORIES } from "@/types/column";

export const dynamic = "force-dynamic";

function getCategoryLabel(value: string) {
  return COLUMN_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export async function generateMetadata({
  params,
}: PageProps<"/columns/[id]">): Promise<Metadata> {
  const { id } = await params;
  const column = await getColumnById(id);

  if (!column || !column.published) {
    return { title: "칼럼" };
  }

  return { title: column.title, description: column.summary };
}

export default async function ColumnDetailPage({
  params,
}: PageProps<"/columns/[id]">) {
  const { id } = await params;
  const column = await getColumnById(id);

  if (!column || !column.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Link href="/columns" className="text-sm font-medium text-brand-700 hover:underline">
        ← 칼럼 목록으로
      </Link>

      <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
        <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
          {getCategoryLabel(column.category)}
        </span>
        <span>{new Date(column.createdAt).toLocaleDateString("ko-KR")}</span>
        <span>· {column.authorName}</span>
      </div>

      <h1 className="mt-3 text-3xl font-semibold text-stone-900">{column.title}</h1>
      <p className="mt-3 text-base text-stone-600">{column.summary}</p>

      <div className="prose prose-stone mt-8 whitespace-pre-wrap text-sm leading-7 text-stone-700">
        {column.content}
      </div>
    </article>
  );
}
