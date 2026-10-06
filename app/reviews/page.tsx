import type { Metadata } from "next";
import ReviewForm from "@/components/ReviewForm";
import ReviewCard from "@/components/ReviewCard";
import { listReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "이용 후기",
  description: "마지 마인드랩을 이용하신 분들의 후기를 확인하고 직접 남겨보세요.",
};

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  let reviews: Awaited<ReturnType<typeof listReviews>> = [];
  let loadError: string | null = null;

  try {
    reviews = await listReviews();
  } catch (err) {
    loadError =
      err instanceof Error ? err.message : "후기를 불러오지 못했습니다.";
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-stone-900">이용 후기</h1>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        마지 마인드랩을 이용하신 분들의 솔직한 후기입니다. 상담을 받으셨다면
        아래에 소중한 후기를 남겨주세요.
      </p>

      <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8">
        <ReviewForm />
      </div>

      <div className="mt-10 space-y-4">
        {loadError && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </p>
        )}
        {!loadError && reviews.length === 0 && (
          <p className="text-sm text-stone-500">
            아직 등록된 후기가 없습니다. 첫 후기를 남겨주세요!
          </p>
        )}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
