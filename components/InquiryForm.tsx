"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquiryInput } from "@/types/inquiry";
import { submitInquiryClient } from "@/lib/inquiriesClient";

const inputClasses =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";
const errorTextClasses = "mt-1 text-sm text-red-600";
const labelClasses = "block text-sm font-medium text-stone-700";

export default function InquiryForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const onSubmit = async (data: InquiryInput) => {
    setSubmitError(null);
    const result = await submitInquiryClient(data);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    reset();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 text-sm text-brand-800">
        문의가 접수되었습니다. 남겨주신 이메일로 답변드리겠습니다.
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="ml-2 font-medium underline underline-offset-2"
        >
          다른 문의 남기기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            이름 <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            maxLength={30}
            className={inputClasses}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className={errorTextClasses}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            이메일 <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className={errorTextClasses}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          건의사항 / 문의 내용 <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          maxLength={2000}
          className={inputClasses}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className={errorTextClasses}>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">웹사이트</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {submitError && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(217,96,58,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_-6px_rgba(217,96,58,0.55)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "제출 중..." : "문의 보내기"}
      </button>
    </form>
  );
}
