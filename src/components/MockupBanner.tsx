export default function MockupBanner({ leadNom }: { leadNom: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 bg-amber-50 dark:bg-amber-950/80 border-b border-amber-200 dark:border-amber-800 px-4 py-2 text-sm text-amber-800 dark:text-amber-200">
      <span className="inline-flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        Preview · maquette pour {leadNom}
      </span>
      <span className="hidden sm:inline text-amber-600 dark:text-amber-400">
        — ce n&apos;est pas la version finale
      </span>
    </div>
  );
}
