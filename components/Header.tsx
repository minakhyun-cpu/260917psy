import Link from "next/link";
import { LeafIcon } from "@/components/icons";

const NAV_LINKS = [
  { href: "/#tests", label: "심리검사" },
  { href: "/#process", label: "상담 절차" },
  { href: "/recovery", label: "AI 번아웃 회복" },
  { href: "/#faq", label: "자주 묻는 질문" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">
            <LeafIcon className="h-4 w-4" />
          </span>
          마지 마인드랩
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/apply"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          상담 신청
        </Link>
      </div>
    </header>
  );
}
