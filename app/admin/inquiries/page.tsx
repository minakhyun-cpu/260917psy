import type { Metadata } from "next";
import { listInquiries } from "@/lib/inquiries";
import AdminInquiryActions from "@/components/AdminInquiryActions";
import AdminNav from "@/components/AdminNav";

export const metadata: Metadata = {
  title: "문의/건의 관리",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  let inquiries: Awaited<ReturnType<typeof listInquiries>> = [];
  let loadError: string | null = null;

  try {
    inquiries = await listInquiries();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "문의 목록을 불러오지 못했습니다.";
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <AdminNav />
      <h1 className="mt-6 text-2xl font-semibold text-stone-900">문의/건의 관리</h1>
      <p className="mt-2 text-sm text-stone-600">
        방문자가 남긴 문의와 건의사항입니다. 처리 상태를 표시하거나 삭제할 수 있습니다.
      </p>

      {loadError && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </p>
      )}

      {!loadError && inquiries.length === 0 && (
        <p className="mt-6 text-sm text-stone-500">접수된 문의가 없습니다.</p>
      )}

      {!loadError && inquiries.length > 0 && (
        <div className="mt-6 space-y-3">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4"
            >
              <div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-stone-900">{inquiry.name}</span>
                  <span className="text-stone-400">{inquiry.email}</span>
                  <span className="text-stone-400">
                    {new Date(inquiry.createdAt).toLocaleString("ko-KR")}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm text-stone-600">
                  {inquiry.message}
                </p>
              </div>
              <AdminInquiryActions inquiryId={inquiry.id} resolved={inquiry.resolved} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
