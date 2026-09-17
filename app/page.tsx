import Link from "next/link";
import TestTypeCard from "@/components/TestTypeCard";
import FaqAccordion from "@/components/FaqAccordion";
import HeroIllustration from "@/components/illustrations/HeroIllustration";
import { SparkleIcon } from "@/components/icons";
import { TEST_CATALOG } from "@/lib/testCatalog";

const PROCESS_STEPS = [
  {
    title: "상담 신청",
    description: "온라인 신청 폼으로 원하시는 검사와 상담 방식, 희망 일정을 알려주세요.",
  },
  {
    title: "일정 확정 안내",
    description: "담당 상담사가 확인 후 연락드려 검사 및 상담 일정을 확정합니다.",
  },
  {
    title: "심리검사 진행",
    description: "안내받은 방식으로 심리검사를 진행합니다. (검사 응시는 별도 시스템에서 진행)",
  },
  {
    title: "1:1 해석상담",
    description: "전문 상담사와 함께 검사 결과를 해석하고, 필요한 방향을 함께 찾아갑니다.",
  },
];

const COUNSELORS = [
  {
    name: "김서연 상담사",
    role: "임상심리전문가",
    bio: "성격검사 및 정서·스트레스 척도 해석상담을 전문으로 합니다.",
  },
  {
    name: "박도윤 상담사",
    role: "진로상담전문가",
    bio: "진로적성검사 해석과 진로 설계 상담에 다년간의 경험을 가지고 있습니다.",
  },
];

const FAQ_ITEMS = [
  {
    question: "검사는 어디서 응시하나요?",
    answer:
      "심리검사 자체는 별도의 검사 시스템을 통해 온라인으로 응시하며, 상담 신청 후 안내드리는 링크를 통해 진행하실 수 있습니다.",
  },
  {
    question: "비용은 어떻게 되나요?",
    answer:
      "검사·상담 비용은 검사 종류에 따라 다르며, 신청 접수 후 담당 상담사가 안내해드립니다. 본 페이지에서는 결제를 진행하지 않습니다.",
  },
  {
    question: "비대면 상담도 가능한가요?",
    answer:
      "네, 화상 또는 전화를 통한 비대면 상담과 마인드랩 방문 대면 상담 모두 가능합니다. 신청 시 원하시는 방식을 선택해주세요.",
  },
  {
    question: "신청 후 얼마나 기다려야 하나요?",
    answer:
      "영업일 기준 1~2일 이내에 담당 상담사가 입력하신 연락처 또는 이메일로 연락드립니다.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="overflow-hidden bg-gradient-to-b from-brand-50 to-background">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              심리검사 &amp; 해석상담
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              나를 이해하는 첫걸음,
              <br className="hidden sm:block" /> 마지 마인드랩과 함께
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
              성격, 진로적성, 정서·스트레스까지. 표준화된 심리검사와 1:1 해석상담으로
              나를 더 깊이 이해하는 따뜻한 시간을 가져보세요.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/apply"
                className="w-full rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 sm:w-auto"
              >
                상담 신청하기
              </Link>
              <Link
                href="#tests"
                className="w-full rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
              >
                검사 종류 살펴보기
              </Link>
            </div>
          </div>
          <HeroIllustration className="mx-auto h-auto w-full max-w-sm" />
        </div>
      </section>

      <section id="tests" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900">심리검사 종류</h2>
        <p className="mt-2 text-sm text-slate-600">
          목적에 맞는 검사를 선택하시면, 신청 폼에 자동으로 반영됩니다.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {TEST_CATALOG.map((item) => (
            <TestTypeCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link
            href="/tests"
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            검사별 상세 안내 보기 →
          </Link>
        </div>
      </section>

      <section id="process" className="bg-brand-50/50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">해석상담 진행 절차</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-brand-100"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900">상담사 소개</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {COUNSELORS.map((counselor) => (
            <div
              key={counselor.name}
              className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-200 to-brand-600 text-base font-bold text-white">
                {counselor.name.charAt(0)}
              </span>
              <div>
                <p className="font-bold text-slate-900">{counselor.name}</p>
                <p className="mt-1 text-sm text-brand-700">{counselor.role}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {counselor.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-brand-200 bg-brand-50 p-8 sm:flex-row sm:items-center">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white">
              <SparkleIcon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brand-700">
              New
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              AI 번아웃 회복 솔루션
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-600">
              간단한 체크인만 남기면 AI가 지금 바로 실천할 수 있는 회복
              루틴을 제안해드립니다. 본인의 Gemini API 키로 무료로 이용해보세요.
            </p>
          </div>
          <Link
            href="/recovery"
            className="shrink-0 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            AI 회복 플랜 받아보기
          </Link>
        </div>
      </section>

      <section id="faq" className="bg-brand-50/50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">자주 묻는 질문</h2>
          <div className="mt-8">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background to-brand-100">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">
            지금 바로 상담을 신청해보세요
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            신청서는 약 2분이면 작성할 수 있습니다.
          </p>
          <Link
            href="/apply"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
}
