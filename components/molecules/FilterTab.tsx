import React from 'react';
import { Book, BookOpen, BookOpenCheck } from 'lucide-react';

const FilterTab = () => {
  return (
    <div className='border-violet-600/40 text-sm mx-auto my-5 flex text-white rounded-md w-fit  bg-violet-300/10'>
      <button className='px-3  gap-1 items-center flex py-2 border-violet-600/40 border-r'>
        <Book className='h-4' />
        <span>Unread</span>
      </button>
      <button className='px-3 gap-1 items-center  py-2 flex  border-violet-600/40 border-r'>
        <BookOpen className='h-4' />
        <span>Reading</span>
      </button>
      <button className='px-3 gap-1 items-center  py-2 flex border-violet-600'>
        <BookOpenCheck className='h-4' />
        <span> Read</span>
      </button>
    </div>
  );
};

export default FilterTab;
