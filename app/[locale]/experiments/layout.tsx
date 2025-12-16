'use client';
import Sidebar from '@/shared/components/Menu/Sidebar';
import clsx from 'clsx';

export default function ExperimentsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-[100dvh] max-w-[100dvw] flex'>
      <Sidebar />
      <div className={clsx('flex flex-col w-full lg:w-4/5 px-4 md:px-8 pb-20')}>
        {children}
      </div>
    </div>
  );
}
