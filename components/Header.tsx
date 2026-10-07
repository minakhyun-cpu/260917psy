import Link from "next/link";
import LogoMark from "@/components/LogoMark";

const NAV_LINKS = [
  { href: "/#tests", label: "심리검사" },
  { href: "/columns", label: "칼럼" },
  { href: "/reviews", label: "후기" },
  { href: "/recovery", label: "AI 번아웃 회복" },
  { href: "/contact", label: "문의하기" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-stone-900">
          <LogoMark className="h-9 w-9" />
          마지 마인드랩
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/apply"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(217,96,58,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_12px_24px_-6px_rgba(217,96,58,0.55)] active:translate-y-0"
        >
          상담 신청
        </Link>
      </div>
    </header>
  );
}
