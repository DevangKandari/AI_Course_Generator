import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-md">
      <Image src={"/udemy-3.svg"} width={20} height={20} alt={"header_logo"} />
      <UserButton />
    </div>
  );
}

export default Header;
