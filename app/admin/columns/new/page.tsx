import type { Metadata } from "next";
import ColumnForm from "@/components/ColumnForm";
import { createColumn } from "@/app/admin/columns/actions";

export const metadata: Metadata = {
  title: "새 칼럼 작성",
  robots: { index: false, follow: false },
};

export default function NewColumnPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold text-stone-900">새 칼럼 작성</h1>
      <div className="mt-8">
        <ColumnForm action={createColumn} submitLabel="칼럼 등록" />
      </div>
    </div>
  );
}
