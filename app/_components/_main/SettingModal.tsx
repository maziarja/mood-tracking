"use client";
import { useModal } from "@/app/contexts/ModalContext";
import UpdateProfileForm from "./UpdateProfileForm";
import { IoClose } from "react-icons/io5";

type SettingModalProps = {
  image: string;
  name: string;
};

function SettingModal({ image, name }: SettingModalProps) {
  const { setIsSettingModalOpen, isSettingModalOpen } = useModal();

  if (isSettingModalOpen === false) return null;

  return (
    <div className="flex justify-center">
      <div className="fixed inset-0 z-9 h-full bg-neutral-900/80"></div>
      <div className="absolute top-10 z-999">
        <div className="bg-neutral-0 relative grid rounded-2xl px-4 py-10 md:w-[530px] md:px-8">
          <button
            onClick={() => setIsSettingModalOpen(false)}
            className="cursor-pointer"
          >
            <IoClose className="absolute top-4 right-4 text-xl text-neutral-300" />
          </button>

          <div className="mb-6 space-y-2">
            <p className="text-preset-3 text-neutral-900">
              Update your profile
            </p>
            <p className="text-preset-6-r text-neutral-600">
              Personalize your account with your name and photo.
            </p>
          </div>
          <UpdateProfileForm image={image} name={name} />
        </div>
      </div>
    </div>
  );
}

export default SettingModal;
