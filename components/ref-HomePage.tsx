'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Bell, BookOpen, Link, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const HomePage = () => {
  useEffect(() => {
    async function fetchMeta() {
      const req = fetch('/api/fetchMeta', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://medium.com/designly/push-notifications-in-next-js-with-web-push-a-provider-free-solution-67d65f80102a',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = (await req).json();
      console.log(response);
    }
    fetchMeta();
  }, []);

  const [links, setLinks] = useState([
    {
      id: 1,
      url: 'https://example.com/article1',
      title: 'Interesting Article 1',
      read: false,
    },
    {
      id: 2,
      url: 'https://example.com/article2',
      title: 'Fascinating Read 2',
      read: true,
    },
    {
      id: 3,
      url: 'https://example.com/article3',
      title: 'Must-Read Article 3',
      read: false,
    },
  ]);
  const [newLink, setNewLink] = useState('');

  const addLink = () => {
    if (newLink) {
      setLinks([
        ...links,
        {
          id: links.length + 1,
          url: newLink,
          title: `New Link ${links.length + 1}`,
          read: false,
        },
      ]);
      setNewLink('');
    }
  };

  const toggleRead = (id: number) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, read: !link.read } : link
      )
    );
  };

  return (
    <div className='min-h-screen signup-img-shadow text-white p-4 md:p-8'>
      <header className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>LinkMinder</h1>
        <Avatar>
          <AvatarImage src='/placeholder.svg?height=32&width=32' alt='User' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </header>

      <div className='grid gap-8 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Reading List</CardTitle>
            <CardDescription>Your daily dose of knowledge</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className='space-y-4'>
              {links
                .filter((link) => !link.read)
                .slice(0, 3)
                .map((link) => (
                  <li
                    key={link.id}
                    className='flex items-center justify-between'
                  >
                    <a
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white hover:underline'
                    >
                      {link.title}
                    </a>
                    <Button
                      className='!text-white '
                      variant='outline'
                      size='sm'
                      onClick={() => toggleRead(link.id)}
                    >
                      <BookOpen className='w-4 h-4 mr-2' />
                      Mark as Read
                    </Button>
                  </li>
                ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant='outline' className='w-full'>
              <RefreshCw className='w-4 h-4 mr-2' />
              Refresh List
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Link</CardTitle>
            <CardDescription>
              Save interesting articles for later
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex space-x-2'>
              <Input
                type='url'
                placeholder='https://example.com/article'
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
              <Button onClick={addLink}>
                <Plus className='w-4 h-4 mr-2' />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className='mt-8'>
        <CardHeader>
          <CardTitle>Your Link Collection</CardTitle>
          <CardDescription>Track your reading progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {links.map((link) => (
              <div key={link.id} className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Link className='w-4 h-4 text-muted-foreground' />
                  <span
                    className={
                      link.read ? 'line-through text-muted-foreground' : ''
                    }
                  >
                    {link.title}
                  </span>
                </div>
                <Badge variant={link.read ? 'secondary' : 'default'}>
                  {link.read ? 'Read' : 'Unread'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className='w-full space-y-2'>
            <Progress
              value={
                (links.filter((link) => link.read).length / links.length) * 100
              }
            />
            <p className='text-sm text-muted-foreground text-center'>
              {links.filter((link) => link.read).length} of {links.length}{' '}
              articles read
            </p>
          </div>
        </CardFooter>
      </Card>

      <div className='fixed bottom-4 right-4'>
        <Button size='lg' className='rounded-full shadow-lg'>
          <Bell className='w-6 h-6' />
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
