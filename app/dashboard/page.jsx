import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddCourse from "./_components/AddCourse";
import UserCourseList from "./_components/UserCourseList";

function Dashboard() {
  return (
    <div>
      <AddCourse />

      {/* list of courses */}

      <UserCourseList />
    </div>
  );
}

export default Dashboard;
