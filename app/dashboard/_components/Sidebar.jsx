"use client";

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {
  HiMiniArrowRightStartOnRectangle,
  HiHome,
  HiMiniSquare3Stack3D,
  HiShieldCheck,
} from "react-icons/hi2";

function Sidebar() {
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  const Menu = [
    { id: 1, name: "Home", icon: <HiHome />, path: "/dashboard" },
    {
      id: 2,
      name: "Explore",
      icon: <HiMiniSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    // {
    //   id: 2,
    //   name: "Upgrade",
    //   icon: <HiShieldCheck />,
    //   path: "/dashboard/upgrade",
    // },
    // {
    //   id: 1,
    //   name: "Logout",
    //   icon: <HiMiniArrowRightStartOnRectangle />,
    //   path: "/dashboard/logout",
    // },
  ];

  const path = usePathname();

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image
        src={"/udemy-wordmark-1.svg"}
        width={160}
        height={100}
        alt={"Sidebar_logo"}
      />
      <hr className="my-5" />

      <ul>
        {Menu.map((item, index) => (
          <li key={index}>
            <Link
              href={item.path}
              className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 mb-3 hover:text-black rounded-lg ${
                item.path === path ? "bg-gray-100 text-black" : ""
              }`}
            >
              <div className="text-3xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </Link>
          </li>
        ))}
      </ul>

      {/* <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList?.length / 5) * 100} />
        <h2 className="text-sm my-2">
          {userCourseList?.length} out of 5 course created
        </h2>
        <h2 className="text-xs text-gray-500">
          upgrade your profile for unlimited course generation
        </h2>
      </div> */}
    </div>
  );
}

export default Sidebar;
