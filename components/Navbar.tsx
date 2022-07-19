import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../public/tiktik-logo.png';
function Navbar() {
  return (
    <nav className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 '>
      {/* logo */}
      <Link href='/'>
        <div className='w-[100px] md:w-[129px] md:h-[30px] h-[38px]'>
          <Image
            src={Logo}
            alt='logo'
            layout='responsive'
            className='cursor-pointer'
          />
        </div>
      </Link>

      {/* search */}
      <div className='relative hidden md:block'>
        <form className='absolute md:static top-10 -left-20 bg-white'>
          <input
            type='text'
            placeholder='Search accounts and Videos'
            className='bg-gray-200 p-3 md:text-sm font-medium border-2 border-gray-100 focus:border-gray-300 focus:outline-none focus:border-2 w-[300px] md:w-[350px] rounded-full md:top-0'
          />
          <button className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
            <BiSearch />
          </button>
        </form>
      </div>

      {/* user info */}
      <div className='flex gap-5 md:gap-10'>
        <Link href='/upload'>
          <button className='border-2 px-2 md:px-4 text-xs font-semibold flex items-center gap-2'>
            <IoMdAdd className='text-xl' />
            <span className='hidden md:block'>Upload</span>
          </button>
        </Link>
        {/* user image */}
        <Link href='/'>
          <div>
            <Image
              src={Logo}
              alt='user profile'
              className='rounded-full cursor-pointer'
              width={40}
              height={40}
            />
          </div>
        </Link>

        <button className='border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'>
          <AiOutlineLogout color='red' fontSize={21} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
