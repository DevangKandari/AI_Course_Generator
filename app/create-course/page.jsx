"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import {
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { userInputContext } from "../_context/userInputContext";
import { GenerateCourseLayout_Ai } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useRouter } from "next/navigation";

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const { userCourseInput } = useContext(userInputContext);

  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const router = useRouter();

  const checkStatus = () => {
    if (activeIndex === 0 && !userCourseInput?.category) return true;
    if (activeIndex === 1 && !userCourseInput?.topic) return true;
    if (
      activeIndex === 2 &&
      (!userCourseInput?.level ||
        !userCourseInput?.duration ||
        userCourseInput?.displayVideo === undefined ||
        !userCourseInput?.noOfChapter)
    )
      return true;
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true);

    try {
      const BASIC_PROMPT =
        "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration;";
      const USER_INPUT_PROMPT = `
        category: ${userCourseInput?.category}, 
        topic: ${userCourseInput?.topic}, 
        description: ${userCourseInput?.description}, 
        level: ${userCourseInput?.level}, 
        duration: ${userCourseInput?.duration}, 
        noOfChapters: ${userCourseInput?.noOfChapter}, 
        in JSON format`;

      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

      const res = await GenerateCourseLayout_Ai.sendMessage(FINAL_PROMPT);
      const responseText = await res.response?.text();
      const courseLayout = JSON.parse(responseText);

      await SaveCourseLayoutInDb(courseLayout);
    } catch (error) {
      console.error("Error generating course layout:", error);
    } finally {
      setLoading(false);
    }
  };

  async function SaveCourseLayoutInDb(courseLayout) {
    console.log(userCourseInput);
    const id = uuid4();
    try {
      await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic,
        category: userCourseInput?.category,
        level: userCourseInput?.level,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress || null,
        userName: user?.fullName || null,
        userProfileImage: user?.imageUrl || null,
        includeVideo: userCourseInput?.displayVideo,
      });
      router.replace("/create-course/" + id);
    } catch (error) {
      console.error("Error saving course layout to the database:", error);
    }
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">CreateCourse</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, ind) => (
            <div className="flex items-center" key={ind}>
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= ind ? "bg-purple-500" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {ind !== StepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full bg-gray-300 ${
                    activeIndex - 1 >= ind ? "bg-purple-500" : ""
                  } `}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Component */}
      {activeIndex === 0 ? (
        <SelectCategory />
      ) : activeIndex === 1 ? (
        <TopicDescription />
      ) : (
        <SelectOption />
      )}

      {/* Buttons */}
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant="outline"
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              onClick={() => setActiveIndex(activeIndex + 1)}
              disabled={checkStatus()}
            >
              Next
            </Button>
          )}
          {activeIndex === 2 && (
            <Button disabled={checkStatus()} onClick={GenerateCourseLayout}>
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading} />
    </div>
  );
}

export default CreateCourse;
