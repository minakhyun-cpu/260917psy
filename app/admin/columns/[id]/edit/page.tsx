import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ColumnForm from "@/components/ColumnForm";
import { updateColumn } from "@/app/admin/columns/actions";
import { getColumnById } from "@/lib/columns";

export const metadata: Metadata = {
  title: "칼럼 수정",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditColumnPage({
  params,
}: PageProps<"/admin/columns/[id]/edit">) {
  const { id } = await params;
  const column = await getColumnById(id);

  if (!column) {
    notFound();
  }

  const action = updateColumn.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold text-stone-900">칼럼 수정</h1>
      <div className="mt-8">
        <ColumnForm action={action} initialValues={column} submitLabel="수정 저장" />
      </div>
    </div>
  );
}
