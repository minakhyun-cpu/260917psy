"use client";

import { useActionState } from "react";
import { COLUMN_CATEGORIES } from "@/types/column";
import type { ColumnRecord } from "@/types/column";
import type { ColumnFormResult } from "@/app/admin/columns/actions";

const inputClasses =
  "w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";
const labelClasses = "block text-sm font-medium text-stone-700";

// Default byline for new columns — the site operator.
const DEFAULT_AUTHOR_NAME = "minakhyun";

export default function ColumnForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (
    prevState: ColumnFormResult,
    formData: FormData,
  ) => Promise<ColumnFormResult>;
  initialValues?: ColumnRecord;
  submitLabel: string;
}) {
  const [state, formAction, isPending] = useActionState<
    ColumnFormResult,
    FormData
  >(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className={labelClasses}>
          제목 *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={100}
          defaultValue={initialValues?.title}
          className={inputClasses}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClasses}>
            분류 *
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={initialValues?.category ?? ""}
            className={inputClasses}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {COLUMN_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="authorName" className={labelClasses}>
            작성자 *
          </label>
          <input
            id="authorName"
            name="authorName"
            type="text"
            required
            maxLength={30}
            defaultValue={initialValues?.authorName ?? DEFAULT_AUTHOR_NAME}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClasses}>
          한 줄 요약 *
        </label>
        <input
          id="summary"
          name="summary"
          type="text"
          required
          maxLength={200}
          defaultValue={initialValues?.summary}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="content" className={labelClasses}>
          본문 *
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={14}
          maxLength={10000}
          defaultValue={initialValues?.content}
          className={inputClasses}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={initialValues?.published ?? false}
          className="h-4 w-4 rounded border-stone-300 text-brand-600 focus:ring-brand-600"
        />
        <label htmlFor="published" className="text-sm text-stone-700">
          공개 (체크 해제 시 비공개 임시저장)
        </label>
      </div>

      {state?.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "저장 중..." : submitLabel}
      </button>
    </form>
  );
}
