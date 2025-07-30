"use client";
import { MdOutlineSettings } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useRef, useTransition } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useModal } from "@/app/contexts/ModalContext";
import { AiOutlineUserDelete } from "react-icons/ai";
import SpinnerMini from "./_UI/SpinnerMini";

type DropDownMenuProps = {
  close: () => void;
  session: Session | null;
};

function DropDownMenu({ close, session }: DropDownMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setIsSettingModalOpen, setIsDeleteAccountModalOpen } = useModal();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    function handleClick(e: Event) {
      const target = e.target as HTMLElement;
      if (
        ref.current &&
        ref.current !== null &&
        !ref.current.contains(target)
      ) {
        close();
      }
    }
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [close]);

  return (
    <div
      ref={ref}
      className="bg-neutral-0 absolute top-14 left-1/2 w-full -translate-x-1/2 transform rounded-lg px-4 py-3 shadow-xl sm:-left-23 sm:w-[200px]"
    >
      <div>
        <p className="text-preset-6 mb-0.5 text-neutral-900">
          {session?.user?.name}
        </p>
        <span className="text-preset-7 text-neutral-300">
          {session?.user?.email}
        </span>
      </div>
      <div className="my-3 border-b-1 border-blue-100"></div>

      <button
        onClick={() => {
          close();
          setIsSettingModalOpen(true);
        }}
        className="mb-3 flex cursor-pointer items-center gap-2"
      >
        <MdOutlineSettings />
        <p className="text-preset-7 text-neutral-900">Setting</p>
      </button>
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            signOut();
          })
        }
        className="mb-3 flex cursor-pointer items-center gap-2"
      >
        {!isPending ? (
          <>
            <FiLogOut />
            <p className="text-preset-7 text-neutral-900">Logout</p>
          </>
        ) : (
          <SpinnerMini />
        )}
      </button>
      <button
        onClick={() => {
          close();
          setIsDeleteAccountModalOpen(true);
        }}
        className="flex cursor-pointer items-center gap-2"
      >
        <AiOutlineUserDelete />
        <p className="text-preset-7 text-neutral-900">Delete account</p>
      </button>
    </div>
  );
}

export default DropDownMenu;
