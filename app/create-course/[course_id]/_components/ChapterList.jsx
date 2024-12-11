import React from "react";
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi2";
import EditChapters from "./EditChapters";

function ChapterList({ course, refreshData,edit =true}) {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.chapters.map((chapter, ind) => (
          <div
            className="border p-5 rounded-lg mb-2 flex items-center justify-between"
            key={ind}
          >
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary h-10 flex-none w-10 rounded-full p-2 text-white text-center">
                {ind + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg">
                  {chapter?.chapterName}{" "}
                  {edit &&<EditChapters
                    course={course}
                    ind={ind}
                    refreshData={() => refreshData(true)}
                  />}
                </h2>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 text-primary items-center">
                  <HiOutlineClock />
                  {chapter?.duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-4xl text-gray-200 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
