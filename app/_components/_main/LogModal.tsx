"use client";
import { useModal } from "@/app/contexts/ModalContext";
import { IoClose } from "react-icons/io5";
import LogMoodForm from "./LogMoodForm";

function LogModal() {
  const { isLogModalOpen, setIsLogModalOpen } = useModal();

  if (isLogModalOpen === false) return null;

  return (
    <>
      <div className="fixed inset-0 z-9 h-full bg-neutral-900/80"></div>
      <div className="absolute top-10 z-999 w-full">
        <div className="light-gradient relative mx-auto grid max-w-[600px] rounded-2xl px-5 py-8 md:px-10 md:py-12">
          <button
            onClick={() => setIsLogModalOpen(false)}
            className="cursor-pointer"
          >
            <IoClose className="absolute top-4 right-4 text-xl text-neutral-300" />
          </button>
          <LogMoodForm />
        </div>
      </div>
    </>
  );
}

export default LogModal;
