import { googleLogIn } from "@/app/_actions/googleLogIn";
import { FaGoogle } from "react-icons/fa";

function SignInGoogleButton() {
  return (
    <form action={googleLogIn}>
      <button className="mx-auto flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1 ring-1 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600">
        <FaGoogle className="inline text-xl text-neutral-900" />
        <p className="text-preset-6-r text-neutral-900">Google</p>
      </button>
    </form>
  );
}

export default SignInGoogleButton;
