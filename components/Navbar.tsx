import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import {GoogleLogin,googleLogout} from '@react-oauth/google'
import Logo from '../public/tiktik-logo.png';
import Ali from '../public/ali.jpg';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore'
import {IUser} from '../types'


function Navbar() {
  const [user, setUser] = useState<IUser |null>()
  const [searchValue, setSearchValue] = useState('');
  const router=useRouter()
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile]);

  // create handle search function
  const handleSearch = (e:{preventDefault: ()=>void})=>{
    e.preventDefault() 

    // check the search value
    if(searchValue){
      router.push(`/search/${searchValue}`)
    }
  }
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
        <form className='absolute md:static top-10 -left-20 bg-white' onSubmit={handleSearch}>
          <input
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
            type='text'
            placeholder='Search accounts and Videos'
            className='bg-gray-200 p-3 md:text-sm font-medium border-2 border-gray-100 focus:border-gray-300 focus:outline-none focus:border-2 w-[300px] md:w-[350px] rounded-full md:top-0'
          />
          <button onClick={handleSearch} className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
            <BiSearch />
          </button>
        </form>
      </div>

      {/* user info */}

      {user ? (
        <div className='flex gap-5 md:gap-10'>
          <Link href='/upload'>
            <button className='border-2 px-2 md:px-4 text-xs font-semibold flex items-center gap-2'>
              <IoMdAdd className='text-xl' />
              <span className='hidden md:block'>Upload</span>
            </button>
          </Link>

          {user.image && (
            <Link href='/'>
              <div>
                <Image
                  src={user.image}
                  alt='user profile'
                  className='rounded-full cursor-pointer border-2 border-indigo-300 p-2'
                  width={40}
                  height={40}
                />
              </div>
            </Link>
          )}

          <button onClick={()=>{ googleLogout(); removeUser() }} className='border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'>
            <AiOutlineLogout color='red' fontSize={21} />
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(res) => createOrGetUser(res, addUser)}
          onError={() => console.log('error')}
        />
      )}
      
    </nav>
  );
}

export default Navbar;
