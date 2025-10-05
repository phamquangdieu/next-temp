'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  return (
    <>
      <div
        className="flex flex-col"
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        {show && (
          <div>
            <Image alt="" width={200} height={200} src="/img-1.jpeg" />
            <Image alt="" width={200} height={200} src="/next.svg" />
          </div>
        )}
        <div className="bg-blue-500">Hover me</div>
      </div>

      <div className="h-[100vh] bg-red-500 w-full"></div>
      <div className="h-[100vh] bg-yellow-500 w-full"></div>
      <div
        className="h-[100vh] bg-green-500 w-full"
        onMouseOver={() => setShow2(true)}
        onMouseOut={() => setShow2(false)}
      >
        {show2 && (
          <div>
            <Image
              alt=""
              width={300}
              height={300}
              src="/img-1.jpeg"
              unoptimized
            />
            <img alt="" width={200} height={200} src="/next.svg" />
          </div>
        )}
      </div>
    </>
  );
}
