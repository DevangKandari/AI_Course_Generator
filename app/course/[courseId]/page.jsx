"use client";
import Header from "@/app/_components/Header";
import ChapterList from "@/app/create-course/[course_id]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[course_id]/_components/CourseBasicInfo";
import CourseDeatil from "@/app/create-course/[course_id]/_components/CourseDeatil";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

function Course({ params: paramsPromise }) {
  const [course, setCourse] = useState();
  const params = React.use(paramsPromise);

  useEffect(() => {
    params && getCourse();
  }, [params]);

  async function getCourse() {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));

    setCourse(result[0]);

    console.log(result);
  }
  return (
    <div>
      <Header />
      <div className="p-10 px-10 md-px-20 lg:px-44">
        <CourseBasicInfo course={course} edit={false} />
        <CourseDeatil course={course} />
        <ChapterList course = {course} edit={false} />
      </div>
    </div>
  );
}

export default Course;
