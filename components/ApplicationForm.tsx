"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicationSchema,
  TEST_TYPES,
  CONSULT_METHODS,
  type ApplicationInput,
} from "@/types/application";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { submitApplication } from "@/app/apply/actions";

const inputClasses =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";
const errorTextClasses = "mt-1 text-sm text-red-600";
const labelClasses = "block text-sm font-medium text-slate-700";

export default function ApplicationForm({
  defaultTestType,
}: {
  defaultTestType?: ApplicationInput["testType"];
}) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      testType: defaultTestType,
      subTests: [],
      consultMethod: undefined,
      preferredDate: "",
      message: "",
      privacyConsent: undefined,
    },
  });

  const selectedTestType = watch("testType");
  const availableSubTests = TEST_CATALOG.find(
    (t) => t.slug === selectedTestType,
  )?.subTests;

  const onSubmit = async (data: ApplicationInput) => {
    setSubmitError(null);
    const result = await submitApplication(data);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    router.push("/apply/complete");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      aria-describedby={submitError ? "form-submit-error" : undefined}
    >
      <div>
        <label htmlFor="name" className={labelClasses}>
          이름 <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            연락처 <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="010-1234-5678"
            className={inputClasses}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className={errorTextClasses}>
              {errors.phone.message}
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
            autoComplete="email"
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="testType" className={labelClasses}>
            희망 검사 종류 <span className="text-red-600">*</span>
          </label>
          <select
            id="testType"
            className={inputClasses}
            defaultValue={defaultTestType ?? ""}
            aria-invalid={!!errors.testType}
            aria-describedby={errors.testType ? "testType-error" : undefined}
            {...register("testType", {
              onChange: () => setValue("subTests", []),
            })}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {TEST_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.testType && (
            <p id="testType-error" className={errorTextClasses}>
              {errors.testType.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="consultMethod" className={labelClasses}>
            희망 상담 방식 <span className="text-red-600">*</span>
          </label>
          <select
            id="consultMethod"
            className={inputClasses}
            defaultValue=""
            aria-invalid={!!errors.consultMethod}
            aria-describedby={
              errors.consultMethod ? "consultMethod-error" : undefined
            }
            {...register("consultMethod")}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {CONSULT_METHODS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {errors.consultMethod && (
            <p id="consultMethod-error" className={errorTextClasses}>
              {errors.consultMethod.message}
            </p>
          )}
        </div>
      </div>

      {availableSubTests && availableSubTests.length > 0 && (
        <div>
          <span className={labelClasses}>
            하위 검사 <span className="text-red-600">*</span>{" "}
            <span className="font-normal text-slate-400">(중복 선택 가능)</span>
          </span>
          <div
            className="mt-2 flex flex-wrap gap-x-5 gap-y-2"
            role="group"
            aria-describedby={errors.subTests ? "subTests-error" : undefined}
          >
            {availableSubTests.map((subTest) => (
              <label
                key={subTest}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  value={subTest}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
                  {...register("subTests")}
                />
                {subTest}
              </label>
            ))}
          </div>
          {errors.subTests && (
            <p id="subTests-error" className={errorTextClasses}>
              {errors.subTests.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="preferredDate" className={labelClasses}>
          희망 일정 <span className="text-red-600">*</span>
        </label>
        <input
          id="preferredDate"
          type="date"
          className={inputClasses}
          aria-invalid={!!errors.preferredDate}
          aria-describedby={
            errors.preferredDate ? "preferredDate-error" : undefined
          }
          {...register("preferredDate")}
        />
        {errors.preferredDate && (
          <p id="preferredDate-error" className={errorTextClasses}>
            {errors.preferredDate.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          남기고 싶은 말 (선택)
        </label>
        <textarea
          id="message"
          rows={4}
          maxLength={500}
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

      <div className="rounded-lg border border-brand-100 bg-brand-50/40 p-4">
        <div className="flex items-start gap-3">
          <input
            id="privacyConsent"
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
            aria-invalid={!!errors.privacyConsent}
            aria-describedby={
              errors.privacyConsent ? "privacyConsent-error" : undefined
            }
            {...register("privacyConsent")}
          />
          <label htmlFor="privacyConsent" className="text-sm text-slate-700">
            (필수) 상담 신청 접수 및 연락을 위한 개인정보 수집·이용에
            동의합니다. 자세한 내용은{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              개인정보처리방침
            </a>
            을 확인해주세요.
          </label>
        </div>
        {errors.privacyConsent && (
          <p id="privacyConsent-error" className={errorTextClasses}>
            {errors.privacyConsent.message}
          </p>
        )}
      </div>

      {submitError && (
        <p
          id="form-submit-error"
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "제출 중..." : "상담 신청하기"}
      </button>
    </form>
  );
}
