import type { ReviewRecord } from "@/types/review";

export default function ReviewCard({ review }: { review: ReviewRecord }) {
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-stone-900">{review.name}</p>
        <p className="text-sm text-stone-400">
          {new Date(review.createdAt).toLocaleDateString("ko-KR")}
        </p>
      </div>
      <div className="mt-1 text-brand-600" aria-label={`별점 ${review.rating}점`}>
        {"★".repeat(review.rating)}
        <span className="text-stone-200">{"★".repeat(5 - review.rating)}</span>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-stone-600">
        {review.content}
      </p>
    </div>
  );
}
