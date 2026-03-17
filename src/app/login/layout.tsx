import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign in - Airtable",
  description: "Sign in to Airtable",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full h-dvh flex-row items-center justify-around">
      {children}
    </main>
  );
}
