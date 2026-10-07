import type { Metadata } from "next";
import { listReviews } from "@/lib/reviews";
import AdminReviewDeleteButton from "@/components/AdminReviewDeleteButton";
import AdminNav from "@/components/AdminNav";

export const metadata: Metadata = {
  title: "후기 관리",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  let reviews: Awaited<ReturnType<typeof listReviews>> = [];
  let loadError: string | null = null;

  try {
    reviews = await listReviews(200);
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "후기를 불러오지 못했습니다.";
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <AdminNav />
      <h1 className="mt-6 text-2xl font-semibold text-stone-900">후기 관리</h1>
      <p className="mt-2 text-sm text-stone-600">
        부적절한 후기는 삭제할 수 있습니다. 삭제 후에는 복구할 수 없습니다.
      </p>

      {loadError && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}
        </p>
      )}

      {!loadError && reviews.length === 0 && (
        <p className="mt-6 text-sm text-stone-500">등록된 후기가 없습니다.</p>
      )}

      {!loadError && reviews.length > 0 && (
        <div className="mt-6 space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-stone-200 bg-white p-4"
            >
              <div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-stone-900">
                    {review.name}
                  </span>
                  <span className="text-brand-600">
                    {"★".repeat(review.rating)}
                  </span>
                  <span className="text-stone-400">
                    {new Date(review.createdAt).toLocaleString("ko-KR")}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm text-stone-600">
                  {review.content}
                </p>
              </div>
              <AdminReviewDeleteButton reviewId={review.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
