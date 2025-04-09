import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  // CardTitle,
} from '../ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { BookOpen, /*BookOpenCheck,*/ CirclePlus } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const LinkCard = () => {
  const [categoryName, setCategoryName] = useState('');
  return (
    <div>
      <Card className='!w-fit h-auto !px-0 text-white mx-auto border-none overflow-hidden bg-[#5000ca]'>
        <CardContent className='!p-0 flex flex-col'>
          {/* eslint-disable-next-line */}
          <img
            src='https://picsum.photos/200/300'
            className='overflow-hidden block h-[12rem] w-full object-cover'
            width={300}
            height={50}
            alt='link description'
          />
          <div className='relative'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='absolute -top-[4rem] w-full'
              viewBox='0 0 1440 320'
            >
              <path
                fill='#5000ca'
                fillOpacity='1'
                d='M0,256L21.8,218.7C43.6,181,87,107,131,106.7C174.5,107,218,181,262,224C305.5,267,349,277,393,256C436.4,235,480,181,524,149.3C567.3,117,611,107,655,133.3C698.2,160,742,224,785,240C829.1,256,873,224,916,192C960,160,1004,128,1047,138.7C1090.9,149,1135,203,1178,202.7C1221.8,203,1265,149,1309,133.3C1352.7,117,1396,139,1418,149.3L1440,160L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z'
              ></path>
            </svg>
            <CardDescription className='py-4 px-2 pt-8 text-white'>
              <div className='absolute flex gap-2 right-2 top-2'>
                <Sheet key={'bottom'}>
                  <SheetTrigger asChild>
                    {/* <Button variant='outline'>{side}</Button> */}
                    <button>
                      <CirclePlus className='h-6' />
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    className='bg-[#310f5c] border-none rounded-t-lg text-white'
                    side={'bottom'}
                  >
                    <SheetHeader>
                      <SheetTitle className='text-white'>
                        Edit profile
                      </SheetTitle>
                      <SheetDescription className='text-white'>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                          Name
                        </Label>
                        <Input
                          id='name'
                          onChange={(e) => setCategoryName(e.target.value)}
                          value={categoryName}
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='username' className='text-right'>
                          Username
                        </Label>
                        <Input
                          id='username'
                          onChange={(e) => setCategoryName(e.target.value)}
                          value={categoryName}
                          className='col-span-3'
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button className='bg-white text-black' type='submit'>
                          Save changes
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
                <button
                  onClick={() =>
                    toast('Event has been created', {
                      action: {
                        label: 'Undo',
                        onClick: () => console.log('Undo'),
                      },
                    })
                  }
                >
                  <BookOpen className='h-6' />
                </button>
              </div>
              {/* in the case of liink(or article read) */}
              {/* <BookOpenCheck /> */}
              <div className='text-lg'>TItle of Links</div>
              <p className=''>
                This is some randomly typed description of the application
              </p>
            </CardDescription>
          </div>
          <CardFooter className='!pb-3 pl-2 '>
            <Button className='bg-white py-1 text-black'>Visit Site</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkCard;
