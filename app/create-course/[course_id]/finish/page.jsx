"use client"
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';

import React, { useCallback, useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { useRouter } from 'next/navigation';
import { HiOutlineDuplicate } from "react-icons/hi";

function FinishScreen({params}){
    const { user } = useUser();
    const [course, setCourse] = useState([]);
    const { course_id } = React.use(params);
  
    const router=useRouter();
  
    const getCourse = useCallback(async () => {
      if (!user) return;
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, course_id),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]);
      console.log(result);
    }, [course_id, user]);
  
    useEffect(() => {
      if (params) getCourse();
    }, [params, getCourse]);
    return (
        <div className='px-10 md:px-20 lg:px-44 my-7'>
            <h2 className='text-center font-bold text=2xl my-3 text-primary'>Congrats! Your course is ready</h2>
            
            
            
            <CourseBasicInfo course={course} refreshData={()=>console.log()}/>
            <h2 className='mt-3'>Course URL:</h2>
            <h2 className='text-center text-grey-400 
            border p-2 round flex gap-5 items-center'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId} <HiOutlineDuplicate className='h-5 w-5 cursor-pointer' onClick={async()=> await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME+"/course/view/"+course?.courseId)} /></h2>
        </div>
    )
     
    }



export default FinishScreen