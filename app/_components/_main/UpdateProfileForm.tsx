"use client";

import { updatingUserProfile } from "@/app/_actions/updatingUserProfile";
import { useModal } from "@/app/contexts/ModalContext";
import Image from "next/image";
import { type FormEvent, useState, useTransition } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import avatarPlaceholder from "@/app/images/avatar-placeholder.svg";
import SpinnerMini from "./_UI/SpinnerMini";

type UpdateProfileProps = {
  image: string;
  name: string;
};

function UpdateProfileForm({ image, name }: UpdateProfileProps) {
  const [isPending, startTransition] = useTransition();
  const { setIsSettingModalOpen } = useModal();
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const imageFile = formData.get("image") as File;
      if (imageFile.size > 250 * 1024) {
        setError("Image must be less than 250KB.");
      } else {
        setError("");
      }
      const result = await updatingUserProfile(formData);
      if (result.error) {
        console.error(result.error);
        // setError(result.error);
      } else {
        setIsSettingModalOpen(false);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 grid">
        <div className="mb-6 grid gap-2">
          <label htmlFor="name" className="text-preset-6-r text-neutral-900">
            Name
          </label>
          <input
            required
            name="name"
            id="name"
            type="text"
            defaultValue={name}
            className="text-preset-6-r cursor-pointer rounded-[10px] px-4 py-3 ring-1 ring-neutral-600 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
          />
        </div>
        <div className="mb-4 flex items-center gap-5">
          <Image
            className="self-start"
            src={image || avatarPlaceholder}
            width={64}
            height={64}
            alt="profile picture"
          />
          <div className="flex flex-col">
            <p className="text-preset-6-r mb-[6px] text-neutral-900">
              Upload Image
            </p>
            <span className="text-preset-7 text-neutral-600">
              Max 250KB, PNG or JPEG
            </span>

            <label
              htmlFor="fileUpload"
              className="text-preset-6 mt-4 mr-auto cursor-pointer rounded-lg px-4 py-2 text-neutral-900 ring-1 ring-neutral-300"
            >
              Upload
              <input
                name="image"
                type="file"
                accept="image/png, image/jpeg"
                id="fileUpload"
                className="hidden"
              />
            </label>

            {error && (
              <p className="mt-2 flex items-center gap-2">
                <IoMdInformationCircle className="text-red-700" />
                <span className="text-preset-9 text-red-700">{error}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <button
        disabled={isPending}
        className="text-preset-5 text-neutral-0 w-full cursor-pointer rounded-[10px] bg-blue-600 px-8 py-3 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
      >
        {!isPending ? "Save changes" : <SpinnerMini />}
      </button>
    </form>
  );
}

export default UpdateProfileForm;
