"use client";

import { deleteAccount } from "@/app/_actions/deleteAccount";
import { useModal } from "@/app/contexts/ModalContext";
import { signOut } from "next-auth/react";
import { FormEvent, useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

function DeleteAccountModal() {
  type Error = {
    email?: string;
    verifyDelete?: string;
  };

  const [error, setError] = useState<Error>({});
  const { isDeleteAccountModalOpen, setIsDeleteAccountModalOpen } = useModal();

  if (isDeleteAccountModalOpen === false) return null;

  async function handleDeleteAccount(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await deleteAccount(formData);
    if (result.error?.email) setError(result.error);
    if (result.error?.verifyDelete) setError(result.error);
    if (result.success) signOut({ callbackUrl: "/" });
  }

  return (
    <form onSubmit={handleDeleteAccount} className="flex justify-center">
      <div className="fixed inset-0 z-9 h-full bg-neutral-900/80"></div>
      <div className="absolute top-10 z-999">
        <div className="bg-neutral-0 relative grid rounded-2xl px-4 py-10 md:w-[530px] md:px-8">
          <button
            onClick={() => setIsDeleteAccountModalOpen(false)}
            className="cursor-pointer"
          >
            <IoClose className="absolute top-4 right-4 text-xl text-neutral-300" />
          </button>

          <div className="mb-6 space-y-4">
            <p className="text-preset-3 text-neutral-900">
              Delete your account
            </p>
            <p className="text-preset-6-r rounded-lg bg-red-100 p-4 text-red-700">
              <span className="font-bold">Warning:</span> This action is not
              reversible. Please be certain.
            </p>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="email" className="text-preset-6-r text-neutral-700">
              Enter your email to continue:
            </label>
            <input
              required
              name="email"
              id="email"
              type="email"
              placeholder="name@mail.com"
              className={`text-preset-6-r w-full rounded-[10px] px-4 py-2 ring-1 ${"ring-neutral-400"} `}
            />
            {error.email && (
              <p className="flex items-center gap-2">
                <IoMdInformationCircle className="text-red-700" />
                <span className="text-preset-9 text-red-700">
                  {error.email}
                </span>
              </p>
            )}
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <label
              htmlFor="verifyDelete"
              className="text-preset-6-r text-neutral-700"
            >
              To verify, type{" "}
              <span className="font-bold">delete my account</span> below:
            </label>
            <input
              required
              name="verifyDelete"
              id="verifyDelete"
              type="text"
              className={`text-preset-6-r w-full rounded-[10px] px-4 py-2 ring-1 ${"ring-neutral-400"} `}
            />
            {error.verifyDelete && (
              <p className="flex items-center gap-2">
                <IoMdInformationCircle className="text-red-700" />
                <span className="text-preset-9 text-red-700">
                  {error.verifyDelete}
                </span>
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setIsDeleteAccountModalOpen(false)}
              className="bg-neutral-0 text-preset-6-r cursor-pointer rounded-lg px-3 py-2 ring-1 ring-neutral-600"
            >
              Cancel
            </button>
            <button className="text-neutral-0 text-preset-6-r cursor-pointer rounded-lg bg-red-700 px-3 py-2">
              Delete
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default DeleteAccountModal;
