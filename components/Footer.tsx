export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 text-sm text-slate-500 sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} Piyush Sharma</p>
        <p className="font-mono text-xs uppercase tracking-[0.2em]">AML · KYC · Financial Crime Compliance</p>
      </div>
    </footer>
  );
}
