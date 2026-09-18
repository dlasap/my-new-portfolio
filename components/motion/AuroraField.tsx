export function AuroraField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-orb left-[-10%] top-[-15%] h-[36rem] w-[36rem] bg-iris/25 [animation-duration:9s]" />
      <div className="aurora-orb right-[-15%] top-[10%] h-[30rem] w-[30rem] bg-cyan/20 [animation-duration:11s]" />
      <div className="aurora-orb bottom-[-20%] left-[20%] h-[34rem] w-[34rem] bg-fuchsia/15 [animation-duration:13s]" />
    </div>
  );
}