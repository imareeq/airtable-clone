"use client";

import { authClient } from "~/server/better-auth/client";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Sign In
        </h1>
        <div className="flex flex-col items-center gap-2">
          <form>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              formAction={async () => {
                const res = await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/",
                });
              }}
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
