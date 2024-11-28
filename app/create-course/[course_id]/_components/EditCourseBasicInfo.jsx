import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(course?.courseOutput?.courseName);
    setDescription(course?.courseOutput?.description);
  }, [course]);

  async function handleClick() {
    course.courseOutput = {
      ...course.courseOutput,
      courseName: name,
      description: description,
    };
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList.id, course.id))
      .returning({ id: CourseList.id });

    refreshData(true);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <HiMiniPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title and Description</DialogTitle>
          <DialogDescription>
            <>
              <label>Title</label>
              <Input
                defaultValue={course?.courseOutput?.courseName}
                onChange={(e) => setName(e.target.value)}
              />
            </>
            <>
              <label>Description</label>
              <Textarea
                className="h-40"
                defaultValue={course?.courseOutput?.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <span
              className="bg-primary rounded-md p-2"
              onClick={() => handleClick()}
            >
              Update
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;
