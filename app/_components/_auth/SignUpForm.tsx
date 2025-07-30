"use client";
import SignUpButton from "./SignUpButton";
import { signUpUser } from "../../_actions/signUpUser";
import { FormEvent, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoMdInformationCircle } from "react-icons/io";

type Error = {
  email?: string;
  password?: string;
};

function SignUpForm() {
  const [error, setError] = useState<Error>({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const result = await signUpUser(formData);
      if (result.success) {
        const res = await signIn("credentials", {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          redirect: false,
        });
        if (res.ok) {
          router.push("/onboarding");
        }
      }

      if (result.error) {
        console.error(result.error);
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid">
      <div className="mb-8 space-y-4">
        <div className="grid gap-2">
          <label htmlFor="email" className="text-preset-6-r text-neutral-900">
            Email address
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="name@mail.com"
            className={`text-preset-6-r rounded-[10px] px-4 py-3 ring-1 ${error.email ? "ring-red-700" : "ring-neutral-300"} `}
          />
          {error.email && (
            <p className="flex items-center gap-2">
              <IoMdInformationCircle className="text-red-700" />
              <span className="text-preset-9 text-red-700">{error.email}</span>
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="password"
            className="text-preset-6-r text-neutral-900"
          >
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            className={`text-preset-6-r rounded-[10px] px-4 py-3 ring-1 ${error.password ? "ring-red-700" : "ring-neutral-300"} `}
          />
          {error.password && (
            <p className="flex items-center gap-2">
              <IoMdInformationCircle className="text-red-700" />
              <span className="text-preset-9 text-red-700">
                {error.password}
              </span>
            </p>
          )}
        </div>
      </div>
      <SignUpButton isPending={isPending} />
    </form>
  );
}

export default SignUpForm;
