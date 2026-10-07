import type { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "문의 / 건의하기",
  description: "마지 마인드랩에 궁금한 점이나 건의사항을 남겨주세요.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-stone-900">문의 / 건의하기</h1>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        서비스에 대한 건의사항이나 궁금한 점을 남겨주시면 빠르게 답변드리겠습니다.
        남겨주신 내용은 운영진만 확인할 수 있으며, 외부에 공개되지 않습니다.
      </p>

      <div className="mt-10 rounded-2xl border border-brand-100 bg-white p-6 sm:p-8">
        <InquiryForm />
      </div>
    </div>
  );
}
