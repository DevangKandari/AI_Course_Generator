import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen, HiEllipsisVertical } from "react-icons/hi2";
import DropDownOptions from "./DropDownOptions";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { CourseList } from "@/configs/schema";
import Link from "next/link";

function CourseCard({ course, refreshData,displayUser = false}) {
  const handleOnDelete = async () => {
    const res = await db
      .delete(CourseList)
      .where(eq(course?.id, CourseList?.id))
      .returning({ id: CourseList?.id });

    if (res) refreshData(true);
  };
  return (
    <div className="p-2 borded shadow-sm rounded-lg hover:scale-105 transition-all cursor-pointer mt-4">
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={course?.courseBanner}
          width={300}
          height={300}
          className="w-full h-[200px] object-cover rounded-lg"
          alt="courseBanner"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between items-center">
          {course?.courseOutput?.courseName}
         {!displayUser &&<DropDownOptions handleOnDelete={() => handleOnDelete()}>
            <HiEllipsisVertical />
          </DropDownOptions>}
        </h2>
        <p className="text-gray-400 text-sm my-1">{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm">
            <HiOutlineBookOpen />
            {course?.courseOutput?.noOfChapters} Chapters
          </h2>
          <h2 className="text-sm rounded-sm text-primary bg-purple-50 p-1">
            {course?.level} Level
          </h2>
        </div>

       {displayUser&&<div className='flex gap-2 items-center mt-2'>
          <Image alt ={"user Image"}src={course?.userProfileImage} width={35} height={35}
          className='rounded-full'/>
          <h2 className="'text-sm">{course?.userName}</h2>
        </div>}
      </div>
    </div>
  );
}

export default CourseCard;
