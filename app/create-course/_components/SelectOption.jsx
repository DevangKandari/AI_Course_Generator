import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LandPlot } from "lucide-react";
import { Label } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { userInputContext } from "@/app/_context/userInputContext";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(userInputContext);

  const handleInputChange = (field, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 mt-10">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm">Difficulty Level</label>
          <Select
            onValueChange={(value) => handleInputChange("level", value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">Course Duration</label>
          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More Than 2 Hours">
                More Than 2 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">Add Video</label>
          <Select
            onValueChange={(value) => handleInputChange("displayVideo", value)}
            defaultValue={userCourseInput?.video}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">No. of chapters</label>
          <Input
            type="number"
            onChange={(e) => handleInputChange("noOfChapter", e.target.value)}
            defaultValue={userCourseInput?.chapter_no}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
