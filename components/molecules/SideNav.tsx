'use client';

import React, { ReactNode, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const SideNav = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen((c) => !c)}
        className='fixed top-1/2 -translate-x-1/2 left-0 w-7 h-7 bg-violet-600 rounded-full z-20'
      >
        <ChevronRight className='translate-x-1 text-white' />
      </button>
      <div
        className={`w-full h-full   ${
          isOpen ? 'z-40 bg-black/50 fixed' : 'hidden'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <nav
          className={`bg-[#310f5c] text-white fixed w-[70%] h-[100dvh] transform transition-transform ease-in-out duration-1000 inset-0 z-50 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <h2 className='text-xl pl-5 py-5'>Link Manager</h2>
          <ul className='flex flex-col divide-y divide-violet-400 border-y h-[calc(100%-60px)] border-violet-400'>
            <li className='pl-5 py-2'>Today&apos;s Business</li>
            <li className='py-2 pl-5'>Read Links</li>
            <li className='py-2 pl-5'>notifications</li>
            <li className='py-2 pl-5'>about</li>
            <li className='py-2 pl-5 mt-auto'>{children}</li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideNav;
