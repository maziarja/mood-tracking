import SpinnerMini from "../_main/_UI/SpinnerMini";

type SignUpButtonProps = {
  isPending: boolean;
};

function SignUpButton({ isPending }: SignUpButtonProps) {
  return (
    <button
      disabled={isPending}
      className="text-preset-5 text-neutral-0 w-full cursor-pointer rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
    >
      {!isPending ? "Sign Up" : <SpinnerMini />}
    </button>
  );
}

export default SignUpButton;
