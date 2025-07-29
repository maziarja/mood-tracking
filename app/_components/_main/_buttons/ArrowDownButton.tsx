"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import DropDownMenu from "../DropDownMenu";
import { Session } from "next-auth";

function ArrowDownButton({ session }: { session: Session | null }) {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);

  const close = () => setIsDropDownMenuOpen(false);
  return (
    <div className="sm:relative">
      <button
        className="cursor-pointer"
        onClick={() => setIsDropDownMenuOpen((isOpen) => !isOpen)}
      >
        <IoIosArrowDown />
      </button>
      {isDropDownMenuOpen && <DropDownMenu close={close} session={session} />}
    </div>
  );
}

export default ArrowDownButton;
