"use client";

import LoginFormSide from "~/components/login-form-side";
import { useIsMobile } from "~/hooks/use-is-mobile";

export default function LoginPage() {
  const isMobile = useIsMobile();

  return (
    <>
      <div className="mx-[10vw] flex h-full w-full items-center justify-center">
        <LoginFormSide />
        {!isMobile && (
          <div
            id="login-hero"
            className="flex h-full w-1/2 items-center justify-center"
          >
            <img src="/login-hero.png" className="w-98.75" />
          </div>
        )}
      </div>
    </>
  );
}
