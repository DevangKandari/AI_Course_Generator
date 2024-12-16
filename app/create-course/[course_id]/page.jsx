"use client";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq, jaccardDistance } from "drizzle-orm";
import React, { useEffect, useState, useCallback } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDeatil from "./_components/CourseDeatil";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/configs/service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { course_id } = React.use(params);

  const router = useRouter();

  const getCourse = useCallback(async () => {
    if (!user) return;
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, course_id),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
    console.log(result);
  }, [course_id, user]);

  useEffect(() => {
    if (params) getCourse();
  }, [params, getCourse]);

  function GenerateChapterContent() {
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;
    chapters.forEach(async (chapter, ind) => {
      const PROMPT =
        "Explain the concept in detail on the topic:" +
        course?.name +
        ", Chapter:" +
        chapter?.chapterName +
        ", in JSON format with list of array with field as Title , Explanation of given chapter in detail, Code Example(Code Field in <precode> format) if applicable";
      // if (ind == 0) {
      try {
        let videoId = "";
        service
          .getVideos(course?.name + ":" + chapter?.chapterName)
          .then((resp) => {
            console.log(resp);
            videoId = resp[0]?.id?.videoId;
          });
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        console.log(result?.response?.text());
        const content = JSON.parse(result?.response?.text());

        await db.insert(Chapters).values({
          chapterId: ind,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });
        setLoading(false);
        await db.update(CourseList).set({
          publish: true,
        });
        router.replace("/create-course/" + course?.courseId + "/finish");
      } catch (e) {
        console.log(e);
        setLoading(false);
      }

      // }
    });
  }

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <LoadingDialog loading={loading} />

      {/* Basic Info */}

      <CourseBasicInfo
        edit={true}
        course={course}
        refreshData={() => getCourse()}
      />

      {/* course detail */}

      <CourseDeatil course={course} />

      {/* list of chapters */}

      <ChapterList course={course} refreshData={() => getCourse()} />

      <Button className="my-10" onClick={() => GenerateChapterContent()}>
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
