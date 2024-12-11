import React from 'react'
import { FaRegClock } from "react-icons/fa6";
function  ChapterListCard({chapter,index}){
    return (
        <div className='grid grid-cols-5 p-4 items-center border-b'>

            <div>
                <h2 className='p-2 bg-primary w-8 h-8
                 text-white rounded-full text-center'>{index+1}</h2>
            </div>

            <div className='col-span-4'>
                <h2 className='font-medium'>{chapter?.chapterName}</h2>
                <h2 className='flex item-center gap-2 tex-sm text-primary'> <FaRegClock/>{chapter?.duration}</h2>
            </div>
        </div>
    )
}
export default ChapterListCard