import type { Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Airtable",
  description: "airtable.com",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="h-screen overflow-hidden">{children}</div>;
}
