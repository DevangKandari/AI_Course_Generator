"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { HiMiniPuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { CldUploadWidget } from "next-cloudinary";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [url, setUrl] = useState("/creative.jpg");

  async function handleClick() {
    console.log(url);
    const result = await db
      .update(CourseList)
      .set({
        courseBanner: url,
      })
      .where(eq(CourseList?.id, course?.id));
    console.log(result);
  }

  return (
    <div>
      <div className="p-10 border rounded-xl shadow-sm mt-10">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="font-bol text-3xl">
              {course?.courseOutput?.courseName}{" "}
              {edit && (
                <EditCourseBasicInfo
                  course={course}
                  refreshData={() => refreshData(true)}
                />
              )}
            </h2>
            <p className="text-sm text-gray-400 mt-3">
              {course?.courseOutput?.description}
            </p>
            <h2 className="flex items-center font-medium mt-2 gap-2 text-primary">
              <HiMiniPuzzlePiece />
              {course?.category}
            </h2>
            {!edit && (
              <Link href={"/course/" + course?.courseId + "/start"}>
                <Button className="mt-10 w-full">Start</Button>
              </Link>
            )}
          </div>
          <div>
            <Image
              src={url}
              alt={"course logo"}
              height={300}
              width={300}
              className="w-full rounded-xl h-[250px] object-cover"
              onClick={() => open()}
            />
            <CldUploadWidget
              uploadPreset="my_uploads"
              onSuccess={({ event, info }) => {
                if (event == "success") {
                  setUrl(info.secure_url);

                  handleClick();
                }
              }}
            >
              {({ open }) => <Button onClick={open}>Edit Image</Button>}
            </CldUploadWidget>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
