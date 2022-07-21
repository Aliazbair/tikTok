import React from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md';

interface IProps{text:string}
function NoResults({text}:IProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p className='text-8xl'>
        <MdOutlineVideocamOff/>
      </p>
       <p className="text-2xl text-center">
        {text}
       </p>
    </div>
  )
}

export default NoResults