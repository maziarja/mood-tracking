import SpinnerMini from "../_main/_UI/SpinnerMini";

type LoginButtonProps = {
  isPending: boolean;
};

function LoginButton({ isPending }: LoginButtonProps) {
  return (
    <button
      disabled={isPending}
      className="text-preset-5 text-neutral-0 cursor-pointer rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
    >
      {!isPending ? "Log In" : <SpinnerMini />}
    </button>
  );
}

export default LoginButton;
