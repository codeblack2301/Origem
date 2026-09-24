export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-xl bg-[#C85A32] text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2a6 6 0 0 0-6 6c0 4 6 14 6 14s6-10 6-14a6 6 0 0 0-6-6z" />
              <circle cx="12" cy="8" r="2" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-[#2C221E] block leading-none">
              MANUALI
            </span>
            <span className="text-[8px] uppercase font-bold tracking-widest text-[#C85A32] block">
              Mãos Pernambucanas
            </span>
          </div>
        </div>

        <p className="text-xs text-[#6E6259]">
          © 2026 Mãos Pernambucanas. Todos os direitos reservados. Fomento da cultura pernambucana.
        </p>

        <div className="flex items-center gap-4 text-stone-500">
          <a href="#instagram" aria-label="Instagram" className="hover:text-[#C85A32] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="#youtube" aria-label="YouTube" className="hover:text-[#C85A32] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>
          </a>
          <a href="#facebook" aria-label="Facebook" className="hover:text-[#C85A32] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}