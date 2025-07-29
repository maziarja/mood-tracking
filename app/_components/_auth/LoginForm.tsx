"use client";
import { useState, type FormEvent } from "react";
import LoginButton from "./LoginButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoMdInformationCircle } from "react-icons/io";

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
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
            className={`text-preset-6-r rounded-[10px] px-4 py-3 ring-1 ${error ? "ring-red-700" : "ring-neutral-600"} `}
          />
          {error && (
            <p className="flex items-center gap-2">
              <IoMdInformationCircle className="text-red-700" />
              <span className="text-preset-9 text-red-700">{error}</span>
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
            className={`text-preset-6-r rounded-[10px] px-4 py-3 ring-1 ${error ? "ring-red-700" : "ring-neutral-600"} `}
          />
          {error && (
            <p className="flex items-center gap-2">
              <IoMdInformationCircle className="text-red-700" />
              <span className="text-preset-9 text-red-700">{error}</span>
            </p>
          )}
        </div>
      </div>
      <LoginButton />
    </form>
  );
}

export default LoginForm;
