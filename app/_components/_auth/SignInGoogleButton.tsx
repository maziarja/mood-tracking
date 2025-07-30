"use client";
import { googleLogIn } from "@/app/_actions/googleLogIn";
import { useFormStatus } from "react-dom";
import { FaGoogle } from "react-icons/fa";
import SpinnerMini from "../_main/_UI/SpinnerMini";

function SignInGoogleButton() {
  return (
    <form action={googleLogIn}>
      <GoogleBtn />
    </form>
  );
}

function GoogleBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="mx-auto flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 ring-1 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
    >
      {!pending ? (
        <>
          <FaGoogle className="inline text-xl text-neutral-900" />
          <p className="text-preset-6-r text-neutral-900">Google</p>
        </>
      ) : (
        <SpinnerMini />
      )}
    </button>
  );
}

export default SignInGoogleButton;
