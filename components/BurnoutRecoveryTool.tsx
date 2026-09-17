"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  burnoutCheckInSchema,
  ENERGY_LEVELS,
  SUPPORT_TYPES,
  type BurnoutCheckInInput,
} from "@/types/burnout";
import { generateBurnoutPlan } from "@/lib/gemini";

const STORAGE_KEY = "gemini_api_key";

const inputClasses =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";
const errorTextClasses = "mt-1 text-sm text-red-600";
const labelClasses = "block text-sm font-medium text-slate-700";

export default function BurnoutRecoveryTool() {
  const [rememberKey, setRememberKey] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BurnoutCheckInInput>({
    resolver: zodResolver(burnoutCheckInSchema),
    defaultValues: {
      apiKey: "",
      energyLevel: undefined,
      stressors: "",
      supportType: undefined,
      note: "",
    },
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setValue("apiKey", saved);
        // Syncing from an external store (localStorage) that isn't readable
        // during SSR, so this can't be computed at render time.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRememberKey(true);
      }
    } catch {
      // localStorage may be unavailable (private browsing); ignore silently.
    }
  }, [setValue]);

  const onSubmit = async (data: BurnoutCheckInInput) => {
    setRequestError(null);
    setResult(null);
    setIsGenerating(true);

    try {
      if (rememberKey) {
        window.localStorage.setItem(STORAGE_KEY, data.apiKey);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Best-effort only; not critical to the feature working.
    }

    try {
      const plan = await generateBurnoutPlan(data);
      setResult(plan);
    } catch (err) {
      setRequestError(
        err instanceof Error
          ? err.message
          : "AI 응답을 받아오는 중 문제가 발생했습니다.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        이 기능은 참고용 AI 코칭이며, 의학적 진단이나 전문 상담을 대신할 수
        없습니다. 상태가 심각하거나 위기감을 느끼신다면 정신건강 위기상담전화
        1577-0199, 자살예방상담전화 1393으로 즉시 연락해주세요.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div>
          <label htmlFor="apiKey" className={labelClasses}>
            Gemini API 키 <span className="text-red-600">*</span>
          </label>
          <input
            id="apiKey"
            type="password"
            autoComplete="off"
            placeholder="AIza..."
            className={inputClasses}
            aria-invalid={!!errors.apiKey}
            aria-describedby={errors.apiKey ? "apiKey-error" : "apiKey-help"}
            {...register("apiKey")}
          />
          <p id="apiKey-help" className="mt-1 text-xs text-slate-500">
            키는 서버로 전송되지 않고 이 브라우저에서 Google API로 직접
            전달됩니다.{" "}
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              Google AI Studio에서 무료로 키 발급받기
            </a>
          </p>
          {errors.apiKey && (
            <p id="apiKey-error" className={errorTextClasses}>
              {errors.apiKey.message}
            </p>
          )}

          <div className="mt-2 flex items-center gap-2">
            <input
              id="rememberKey"
              type="checkbox"
              checked={rememberKey}
              onChange={(e) => setRememberKey(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
            />
            <label htmlFor="rememberKey" className="text-sm text-slate-600">
              이 브라우저에 API 키 저장 (공용 기기에서는 권장하지 않습니다)
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="energyLevel" className={labelClasses}>
            현재 에너지 수준 <span className="text-red-600">*</span>
          </label>
          <select
            id="energyLevel"
            defaultValue=""
            className={inputClasses}
            aria-invalid={!!errors.energyLevel}
            aria-describedby={
              errors.energyLevel ? "energyLevel-error" : undefined
            }
            {...register("energyLevel")}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {ENERGY_LEVELS.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
          {errors.energyLevel && (
            <p id="energyLevel-error" className={errorTextClasses}>
              {errors.energyLevel.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="stressors" className={labelClasses}>
            요즘 나를 힘들게 하는 것 <span className="text-red-600">*</span>
          </label>
          <textarea
            id="stressors"
            rows={3}
            maxLength={500}
            placeholder="예: 업무량이 많고 잠을 잘 못 자요"
            className={inputClasses}
            aria-invalid={!!errors.stressors}
            aria-describedby={
              errors.stressors ? "stressors-error" : undefined
            }
            {...register("stressors")}
          />
          {errors.stressors && (
            <p id="stressors-error" className={errorTextClasses}>
              {errors.stressors.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="supportType" className={labelClasses}>
            지금 가장 필요한 도움 <span className="text-red-600">*</span>
          </label>
          <select
            id="supportType"
            defaultValue=""
            className={inputClasses}
            aria-invalid={!!errors.supportType}
            aria-describedby={
              errors.supportType ? "supportType-error" : undefined
            }
            {...register("supportType")}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {SUPPORT_TYPES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {errors.supportType && (
            <p id="supportType-error" className={errorTextClasses}>
              {errors.supportType.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="note" className={labelClasses}>
            더 남기고 싶은 말 (선택)
          </label>
          <textarea
            id="note"
            rows={2}
            maxLength={300}
            className={inputClasses}
            aria-invalid={!!errors.note}
            aria-describedby={errors.note ? "note-error" : undefined}
            {...register("note")}
          />
          {errors.note && (
            <p id="note-error" className={errorTextClasses}>
              {errors.note.message}
            </p>
          )}
        </div>

        {requestError && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {requestError}
          </p>
        )}

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating ? "회복 플랜 생성 중..." : "AI 회복 플랜 받기"}
        </button>
      </form>

      {result && (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-sm font-semibold text-brand-800">
            AI가 제안하는 회복 플랜
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}
