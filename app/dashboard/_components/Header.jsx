import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-md">
      <Link href={"/dashboard"}>
        <Image
          src={"/udemy-3.svg"}
          width={20}
          height={20}
          alt={"header_logo"}
        />
      </Link>
      <UserButton />
    </div>
  );
}

export default Header;
