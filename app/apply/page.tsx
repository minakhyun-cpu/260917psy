import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";
import type { ApplicationInput } from "@/types/application";

export const metadata: Metadata = {
  title: "상담 신청",
  description: "심리검사 해석상담을 온라인으로 신청하세요.",
};

const VALID_TEST_TYPES: ApplicationInput["testType"][] = [
  "personality",
  "child",
  "stress",
  "other",
];

function parseTestType(
  value: string | string[] | undefined,
): ApplicationInput["testType"] | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  return VALID_TEST_TYPES.find((t) => t === candidate);
}

export default async function ApplyPage({
  searchParams,
}: PageProps<"/apply">) {
  const params = await searchParams;
  const defaultTestType = parseTestType(params.testType);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">상담 신청</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        아래 정보를 남겨주시면 담당 상담사가 영업일 기준 1~2일 이내에
        연락드립니다. 결제는 이 단계에서 진행되지 않습니다.
      </p>

      <div className="mt-10">
        <ApplicationForm defaultTestType={defaultTestType} />
      </div>
    </div>
  );
}
