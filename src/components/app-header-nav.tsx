import Link from "next/link";

export default function AppHeaderNav() {
  return (
    <div className="flex h-full w-full max-w-85 basis-1/3 flex-row items-center justify-center gap-5 self-center text-xs text-black/70">
      <Link
        href={"#"}
        className="relative flex h-full items-center opacity-100"
      >
        <p className="py-2 text-black">Data</p>
        <div className="bg-primary absolute right-0 bottom-0 left-0 h-0.5"></div>
      </Link>
      <Link href={"#"}>Automations</Link>
      <Link href={"#"}>Interfaces</Link>
      <Link href={"#"}>Forms</Link>
    </div>
  );
}
