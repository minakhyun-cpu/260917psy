import Link from "next/link";
import type { TestCatalogItem } from "@/lib/testCatalog";
import { TEST_TYPE_ICONS } from "@/components/icons";

export default function TestTypeCard({ item }: { item: TestCatalogItem }) {
  const Icon = TEST_TYPE_ICONS[item.slug];

  return (
    <div className="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
      <p className="mt-1 text-sm text-brand-700">{item.tagline}</p>
      <dl className="mt-4 space-y-1 text-sm text-slate-500">
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-slate-400">소요시간</dt>
          <dd>{item.duration}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-16 shrink-0 text-slate-400">진행방식</dt>
          <dd>{item.format}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {item.description}
      </p>
      {item.subTests && item.subTests.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.subTests.map((subTest) => (
            <span
              key={subTest}
              className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
            >
              {subTest}
            </span>
          ))}
        </div>
      )}
      <div className="flex-1" />
      <Link
        href={`/apply?testType=${item.slug}`}
        className="mt-5 inline-flex items-center justify-center rounded-full border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
      >
        이 검사로 신청하기
      </Link>
    </div>
  );
}
