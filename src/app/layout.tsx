import { Toaster } from "sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
