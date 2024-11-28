"use client";
import React, { useState } from "react";
import Header from "../dashboard/_components/Header";
import { userInputContext } from "../_context/userInputContext";

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState([]);

  return (
    <div>
      <userInputContext.Provider
        value={{ userCourseInput, setUserCourseInput }}
      >
        <Header />
        {children}
      </userInputContext.Provider>
    </div>
  );
}

export default CreateCourseLayout;
