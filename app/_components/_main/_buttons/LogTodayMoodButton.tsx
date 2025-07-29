"use client";
import { useModal } from "@/app/contexts/ModalContext";

function LogTodayMoodButton() {
  const { setIsLogModalOpen } = useModal();

  return (
    <button
      onClick={() => setIsLogModalOpen(true)}
      className="text-preset-5 text-neutral-0 cursor-pointer self-center rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
    >
      Log today&apos;s mood
    </button>
  );
}

export default LogTodayMoodButton;
