'use client';
import React, { useEffect, useRef, useState } from 'react';
import LinkCard from './molecules/LinkCard';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import FilterTab from './molecules/FilterTab';
import { Input } from './ui/input';
// import { Plus } from 'lucide-react';
import { Button } from './ui/button';

const categories = [
  'frontend',
  'electronics',
  'calculus',
  'arduino',
  'machine learning',
];

const HomePage = () => {
  const [newLink, setNewLink] = useState('');
  const addLink = () => {};
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputNearTop, setInputNearTop] = useState(false);
  const [isBurning, setIsBurning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const rect = inputRef.current?.getBoundingClientRect() as DOMRect;
      console.log(rect);
      if (rect) {
        setInputNearTop(rect.top == 56);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    console.log(inputNearTop);
  }, [inputNearTop]);

  return (
    <div className=''>
      <header className='fixed z-10 bg-signup top-0 left-0 w-full h-auto signunp-img-shadow p-3 text-white flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>LinkMinder</h1>
        <Avatar>
          <AvatarImage src='/placeholder.svg?height=32&width=32' alt='User' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </header>
      <div className='px-3 relative top-[6rem]'>
        <div
          ref={inputRef}
          className={`flex w-full  gap-2 py-4 sticky top-[4rem] ${
            inputNearTop ? 'bg-[#310f5c]' : 'bg-transparent'
          }`}
        >
          <Input
            type='url'
            className='text-white'
            placeholder='https://example.com/article'
            value={newLink}
            onChange={(e) => {
              setNewLink(e.target.value);
              if (e.target.value?.length > 0) setIsBurning(true);
              else setIsBurning(false);
            }}
          />
          <Button
            onClick={addLink}
            className='w-10 bg-transparent relative  h-10 rounded-full'
          >
            <img
              src='/fire_image.png'
              className={`h-full w-full absolute -z-20 ${
                isBurning ? 'flame burn' : 'flame'
              }`}
            />
            {/* <Plus className='h-5 text-signup' /> */}
          </Button>
        </div>
        <section className='flex gap-4 justify-center flex-wrap'>
          {categories?.map((category, i) => (
            <button
              key={i}
              className='px-4 py-1 text-[2.2vh] rounded-full bg-white'
            >
              {category}
            </button>
          ))}
        </section>
        <FilterTab />
        <div className='py-4'>
          <LinkCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
