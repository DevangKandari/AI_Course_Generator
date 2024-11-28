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

function EditChapters({ course, ind, refreshData }) {
  const chapter = course?.courseOutput?.chapters;

  const [name, setName] = useState();
  const [about, setAbout] = useState();

  useEffect(() => {
    setName(chapter[ind].chapterName);
    setAbout(chapter[ind].about);
  }, [course, ind, chapter]);

  async function handleClick() {
    chapter[ind].chapterName = name;
    chapter[ind].about = about;
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList.id, course.id))
      .returning({ id: CourseList.id });

    console.log(result);

    refreshData(true);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <HiMiniPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter Name and Description</DialogTitle>
          <DialogDescription>
            <>
              <label>Name</label>
              <Input
                defaultValue={chapter[ind].chapterName}
                onChange={(e) => setName(e.target.value)}
              />
            </>
            <>
              <label>Description</label>
              <Textarea
                className="h-40"
                defaultValue={chapter[ind].about}
                onChange={(e) => setAbout(e.target.value)}
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

export default EditChapters;
