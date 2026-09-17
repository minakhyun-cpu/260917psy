import Link from "next/link";
import type { TestCatalogItem } from "@/lib/testCatalog";

export default function TestTypeCard({ item }: { item: TestCatalogItem }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
      <p className="mt-1 text-sm text-teal-700">{item.tagline}</p>
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
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
        {item.description}
      </p>
      <Link
        href={`/apply?testType=${item.slug}`}
        className="mt-5 inline-flex items-center justify-center rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
      >
        이 검사로 신청하기
      </Link>
    </div>
  );
}
