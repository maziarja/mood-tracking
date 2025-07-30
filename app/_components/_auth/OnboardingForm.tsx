"use client";
import Image from "next/image";
import avatarPlaceholder from "@/app/images/avatar-placeholder.svg";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { onboardingUser } from "@/app/_actions/onbordingUser";
import StartTrackingButton from "./StartTrackingButton";

function OnboardingForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const result = await onboardingUser(formData);
      if (result.error) {
        console.error(result.error);
        setError(result.error);
      }
    });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="grid">
      <div className="mb-8 grid">
        <div className="mb-6 grid gap-2">
          <label htmlFor="name" className="text-preset-6-r text-neutral-900">
            Name
          </label>
          <input
            required
            name="name"
            id="name"
            type="text"
            placeholder="Jane Appleseed"
            className="text-preset-6-r cursor-pointer rounded-[10px] px-4 py-3 ring-1 ring-neutral-600 focus:outline-2 focus:outline-offset-4 focus:outline-blue-600"
          />
        </div>
        <div className="mb-4 flex items-center gap-5">
          <Image
            className="self-start"
            src={image || avatarPlaceholder}
            width={64}
            height={64}
            alt="avatar placeholder"
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
                onChange={handleImageChange}
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
      <StartTrackingButton isPending={isPending} />
    </form>
  );
}

export default OnboardingForm;
