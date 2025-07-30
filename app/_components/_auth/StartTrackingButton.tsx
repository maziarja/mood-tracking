import SpinnerMini from "../_main/_UI/SpinnerMini";

function StartTrackingButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      disabled={isPending}
      className="text-preset-5 text-neutral-0 w-full cursor-pointer rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
    >
      {!isPending ? "Start Tracking" : <SpinnerMini />}
    </button>
  );
}

export default StartTrackingButton;
