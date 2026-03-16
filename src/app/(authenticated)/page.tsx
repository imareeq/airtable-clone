import { getSession } from "~/server/better-auth/server";
import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { auth } from "~/server/better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthenticatedHome() {
  const session = await getSession();

  // Middleware should handle this, but for type safety and double check:
  if (!session) {
    redirect("/login");
  }

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Dashboard
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              Welcome back, {session.user.name}!
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <form>
                <button
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  formAction={async () => {
                    "use server";
                    await auth.api.signOut({
                      headers: await headers(),
                    });
                    redirect("/login");
                  }}
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
