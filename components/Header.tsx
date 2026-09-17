import Link from "next/link";

const NAV_LINKS = [
  { href: "/#tests", label: "심리검사" },
  { href: "/#process", label: "상담 절차" },
  { href: "/recovery", label: "AI 번아웃 회복" },
  { href: "/#faq", label: "자주 묻는 질문" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-slate-900">
          마음결 심리상담센터
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
          className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
        >
          상담 신청
        </Link>
      </div>
    </header>
  );
}
