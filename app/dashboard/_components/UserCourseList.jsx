"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function UserCourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState();

  const { userCourseList, setUserCourseList } = useContext(
    UserCourseListContext
  );

  useEffect(() => {
    user && getUserCourse();
  }, [user]);

  const getUserCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setCourseList(result);
    setUserCourseList(result);
    console.log(result);
  };
  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Courses</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.map((course, ind) => (
          <CourseCard
            course={course}
            key={ind}
            refreshData={() => getUserCourse()}
          />
        ))}
      </div>
    </div>
  );
}

export default UserCourseList;
