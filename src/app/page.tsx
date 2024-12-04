import { auth } from "@/auth";
import AuthButtonSeparator from "@/components/auth/AuthButtonSeparator";
import OAuthButtons from "@/components/auth/OAuthButtons";
import AppLogo from "@/components/common/AppLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) return redirect("/decks");

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="hidden h-full w-1/2 lg:block">
        <div className="h-full w-full bg-[url('/aaron-burden-QJDzYT_K8Xg-unsplash.jpg')] bg-cover"></div>
      </div>
      <div className="h-full w-full lg:w-1/2">
        <div className="flex h-full justify-center p-4">
          <div className="flex w-full min-w-[430px] max-w-[760px] flex-col p-5">
            <div className="flex justify-center lg:hidden">
              <AppLogo size={60} />
            </div>

            <div className="flex h-full flex-col justify-center">
              <div className="my-12 text-center text-6xl font-bold lg:text-left">
                Remembering things becomes much easier
              </div>
              <div className="mb-8 text-center text-3xl font-bold lg:text-left">
                Join Deckly today.
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-full max-w-[360px]">
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-blue-400 hover:bg-blue-500/90"
                    asChild
                  >
                    <Link href="/signup">Create account</Link>
                  </Button>
                  <AuthButtonSeparator />
                  <OAuthButtons mode="signup" />
                </div>
                <div className="mb-5 mt-10 text-lg font-semibold">
                  Already have an account?
                </div>
                <div className="w-full max-w-[360px]">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full"
                    asChild
                  >
                    <Link href="/login">Sign in</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
