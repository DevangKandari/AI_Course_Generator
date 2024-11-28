import { userInputContext } from "@/app/_context/userInputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(userInputContext);

  const handleInputChange = (field, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="mx-20 lg:mx-44">
      <div className="mt-5">
        <label>
          Write the topic for which you want to generate the course (e.g. ,
          Python Course , Yoga etc.)
        </label>
        <Input
          placeholder={"Topic"}
          onChange={(e) => handleInputChange("topic", e.target.value)}
          defaultValue={userCourseInput?.topic}
        />
      </div>

      <div className="mt-5">
        <label>
          Tell us more about you course, what you want to include in the course
          (Optional)
        </label>
        <Textarea
          placeholder={"About you course"}
          onChange={(e) => handleInputChange("description", e.target.value)}
          defaultValue={userCourseInput?.description}
        />
      </div>
    </div>
  );
}

export default TopicDescription;
