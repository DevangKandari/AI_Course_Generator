import { userInputContext } from "@/app/_context/userInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(userInputContext);

  function handleCategoryChange(categoryO) {
    setUserCourseInput((prev) => ({
      ...prev,
      category: categoryO,
    }));
  }

  return (
    <div className="px-10 md:px-20 mt-10">
      <h2 className="my-5">Select the course category</h2>
      <div className="grid grid-cols-3 gap-10">
        {CategoryList.map((item) => (
          <div
            key={item.name}
            className={`flex flex-col border p-5 items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer ${
              userCourseInput?.category === item.name
                ? "bg-blue-50 border-primary"
                : ""
            }`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image
              src={item.icon}
              alt="category logos"
              height={50}
              width={50}
            />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
