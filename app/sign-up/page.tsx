import Link from "next/link";
import Logo from "../_components/_main/Logo";
import SignUpForm from "../_components/_auth/SignUpForm";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import SignInGoogleButton from "../_components/_auth/SignInGoogleButton";

async function Page() {
  const session = await auth();
  if (session && session.user) redirect("/");

  return (
    <div className="flex min-h-dvh flex-col items-center gap-8 px-4 md:gap-12">
      <div className="mt-20">
        <Logo />
      </div>
      <div className="bg-neutral-0 grid rounded-2xl px-4 py-10 md:w-[530px] md:px-8">
        <div className="mb-8 space-y-2">
          <p className="text-preset-3 text-neutral-900">Create an account</p>
          <p className="text-preset-6-r text-neutral-600">
            Join to track your daily mood and sleep with ease.
          </p>
        </div>
        <SignUpForm />
        <p className="text-preset-6-r mx-auto my-5 text-neutral-600">
          Already got an account?{" "}
          <Link href={"/log-in"} className="text-blue-600">
            Log in.
          </Link>
        </p>
        <span className="text-preset-6-r mx-auto mb-3 text-neutral-600">
          Or Sign in with{" "}
        </span>
        <SignInGoogleButton />
      </div>
    </div>
  );
}

export default Page;
