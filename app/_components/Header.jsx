import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-md">
      <Image
        src={"/udemy-wordmark-1.svg"}
        height={150}
        width={100}
        alt={"logo"}
      />
      <Link href={"/dashboard"}><Button>Get Started</Button></Link>
    </div>
  );
}

export default Header;
