import type { Metadata } from "next";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";

export const metadata: Metadata = {
  title: "이용 후기",
  description: "마지 마인드랩을 이용하신 분들의 후기를 확인하고 직접 남겨보세요.",
};

export default function ReviewsPage() {
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

      <div className="mt-10">
        <ReviewsList />
      </div>
    </div>
  );
}
