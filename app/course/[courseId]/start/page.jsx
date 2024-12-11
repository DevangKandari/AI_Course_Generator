"use client";

import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

function CourseStart({ params }) {
  const [courseData, setCourseData] = useState(null);
  const [selectedChapters, setSelectedChapters] = useState();
  const [chapterContent, setChapterContent] = useState();
  // Unwrap params using React.use
  const resolvedParams = React.use(params);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        if (resolvedParams.courseId) {
          const result = await db
            .select()
            .from(CourseList)
            .where(eq(CourseList.courseId, resolvedParams.courseId));
          if (result.length > 0) {
            setCourseData(result[0]);
            console.log(result);
            GetSelectedChapterContent(0);
          } else {
            console.error("No course found");
          }
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }

    fetchCourseData();
  }, [resolvedParams]);

  const GetSelectedChapterContent = async (Id) => {
    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters?.chapterId, Id),
          eq(Chapters?.courseId, courseData?.courseId)
        )
      );
    setChapterContent(result[0]);
    console.log(result);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className=" fixed md:w-64 hidden md:block h-screen border-r shadow-sm">
        <h2 className="font-medium text-lg bg-primary p-4 text-white">
          {courseData?.courseOutput?.courseName}
        </h2>
        <div>
          {courseData?.courseOutput?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer 
            hover:bg-purple-50
            ${
              selectedChapters?.chapterName == chapter?.chapterName &&
              "bg-purple-100"
            }
            `}
              onClick={() => {
                setSelectedChapters(chapter);
                GetSelectedChapterContent(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      <div className="md:ml-64">
        <ChapterContent chapter={selectedChapters} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
