import type { Metadata } from "next";
import Link from "next/link";
import { TEST_CATALOG } from "@/lib/testCatalog";
import { TEST_TYPE_ICONS } from "@/components/icons";

export const metadata: Metadata = {
  title: "심리검사 상세 안내",
  description: "성격검사, 진로적성검사, 정서·스트레스 척도 등 각 심리검사의 목적과 진행 방식을 안내합니다.",
};

export default function TestsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">심리검사 상세 안내</h1>
      <p className="mt-3 text-slate-600">
        각 검사의 목적, 소요시간, 진행 방식을 확인하고 원하시는 검사로 상담을 신청해보세요.
      </p>

      <div className="mt-10 space-y-10">
        {TEST_CATALOG.map((item) => {
          const Icon = TEST_TYPE_ICONS[item.slug];
          return (
          <article
            key={item.slug}
            id={item.slug}
            className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-1 text-sm font-medium text-brand-700">
              {item.tagline}
            </p>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  소요시간
                </dt>
                <dd className="mt-1 text-sm text-slate-700">{item.duration}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  진행 방식
                </dt>
                <dd className="mt-1 text-sm text-slate-700">{item.format}</dd>
              </div>
            </dl>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              {item.description}
            </p>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                이런 분께 추천해요
              </p>
              <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
                {item.goodFor.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>

            <Link
              href={`/apply?testType=${item.slug}`}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              이 검사로 상담 신청하기
            </Link>
          </article>
          );
        })}
      </div>
    </div>
  );
}
