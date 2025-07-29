import avatarPlaceholder from "@/app/images/avatar-placeholder.svg";
import Image from "next/image";
import Logo from "./Logo";
import ArrowDownButton from "./_buttons/ArrowDownButton";

import { auth } from "@/config/auth";

async function Header({ image }: { image: string }) {
  const session = await auth();
  return (
    <div className="flex justify-between">
      <Logo />
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          src={image || avatarPlaceholder}
          width={40}
          height={40}
          alt="profile picture"
        />
        <ArrowDownButton session={session} />
      </div>
    </div>
  );
}

export default Header;
