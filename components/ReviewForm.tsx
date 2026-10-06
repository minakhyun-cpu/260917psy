"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewInput } from "@/types/review";
import { submitReview } from "@/app/reviews/actions";

const inputClasses =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";
const errorTextClasses = "mt-1 text-sm text-red-600";
const labelClasses = "block text-sm font-medium text-stone-700";

export default function ReviewForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", rating: 0, content: "", website: "" },
  });

  const rating = watch("rating");

  const onSubmit = async (data: ReviewInput) => {
    setSubmitError(null);
    const result = await submitReview(data);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    reset();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClasses}>
          이름 / 닉네임 <span className="text-red-600">*</span>
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
        <span className={labelClasses}>
          별점 <span className="text-red-600">*</span>
        </span>
        <div
          className="mt-1 flex gap-1"
          role="radiogroup"
          aria-label="별점"
          aria-describedby={errors.rating ? "rating-error" : undefined}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value}점`}
              onClick={() => setValue("rating", value, { shouldValidate: true })}
              className={`text-2xl leading-none transition-colors ${
                value <= rating ? "text-brand-600" : "text-stone-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        {errors.rating && (
          <p id="rating-error" className={errorTextClasses}>
            {errors.rating.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="content" className={labelClasses}>
          후기 내용 <span className="text-red-600">*</span>
        </label>
        <textarea
          id="content"
          rows={4}
          maxLength={1000}
          className={inputClasses}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? "content-error" : undefined}
          {...register("content")}
        />
        {errors.content && (
          <p id="content-error" className={errorTextClasses}>
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from real visitors via CSS, left blank by them */}
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
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {submitError}
        </p>
      )}

      {submitted && (
        <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-800">
          소중한 후기 감사합니다!
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(217,96,58,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_-6px_rgba(217,96,58,0.55)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "등록 중..." : "후기 남기기"}
      </button>
    </form>
  );
}
