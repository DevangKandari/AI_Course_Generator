"use client";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useContext } from "react";

function AddCourse() {
  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl">
          Hello,<span className="font-bold">{user?.fullName}</span>
        </h2>
        <p className="text-sm text-gray-500">
          Create new course from AI, Share it with friends and earn from it
        </p>
      </div>
      <Link href={"/create-course"}>
        <Button>+ Create AI Course</Button>
      </Link>
    </div>
  );
}

export default AddCourse;
