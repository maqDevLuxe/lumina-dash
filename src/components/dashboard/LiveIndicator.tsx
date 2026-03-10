export function LiveIndicator() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neon-green">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
      </span>
      Live
    </span>
  );
}
