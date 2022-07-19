import React, { useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import Ali from '../public/ali.jpg';

function SuggestedAccount() {
  
  return (
    <div className='xl:border-b-2 border-gray-200 pb-4 '>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested accounts
      </p>
      <div>
        <Link href='/'>
          <div>
            <div className='flex gap-3 hover:bg-gray-200 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src={Ali}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>
              <div className='hiddean xl:block'>
                <p className='flex gap-1 items-center text-xl font-bold text-black lowercase'>
                  Ali
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>alzubair</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SuggestedAccount;
