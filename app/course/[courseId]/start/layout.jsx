import Header from "@/app/dashboard/_components/Header";
import React from "react";

function CourseStartLayout({ children }) {
  return (
    <div>
      <Header classname=" sticky top-0"></Header>
      {children}
    </div>
  );
}

export default CourseStartLayout;
