import Link from "next/link";
import LoginForm from "../_components/_auth/LoginForm";
import Logo from "../_components/_main/Logo";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";

async function Page() {
  const session = await auth();
  if (session && session.user) redirect("/");

  return (
    <div className="flex min-h-dvh flex-col items-center gap-8 px-4 py-20 md:gap-12">
      <div>
        <Logo />
      </div>
      <div className="bg-neutral-0 grid rounded-2xl px-4 py-10 md:w-[530px] md:px-8">
        <div className="mb-8 space-y-2">
          <p className="text-preset-3 text-neutral-900">Welcome back!</p>
          <p className="text-preset-6-r text-neutral-600">
            Log in to continue tracking your mood and sleep.
          </p>
        </div>
        <LoginForm />
        <p className="text-preset-6-r mx-auto mt-5 text-neutral-600">
          Haven&apos;t got an account?{" "}
          <Link href={"/sign-up"} className="text-blue-600">
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
