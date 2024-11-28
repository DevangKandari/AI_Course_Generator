import { Button } from "@/components/ui/button";
import Image from "next/image";
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
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
