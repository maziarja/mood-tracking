import Image from "next/image";
import logo from "@/app/images/logo.svg";

function Logo() {
  return <Image src={logo} width={0} height={0} alt="Mood tracker logo" />;
}

export default Logo;
