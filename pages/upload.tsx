import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import { useRouter } from 'next/router';

function Upload() {
  // setup all state
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [WrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [SavingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();

  const router = useRouter();

  // get user profile

  // create  upload video function
  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    // create file types
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setIsLoading(true);
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  // create handle post function
  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const decoument = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      };
      await axios.post('http://localhost:3000/api/post', decoument);
      router.push('/');
    }
  };

  // create handle Discord function

  return (
    <div className='w-full flex h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-white justify-center'>
      <div className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap items-center justify-between p-14 pt-6 w-[60%]'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload video</p>
            <p className='text-sm text-gray-400 mt-2'>
              Post a video to your account
            </p>
          </div>

          {/* dash border */}
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 transition ease-in duration-300'>
            {isLoading ? (
              <p>Uploading..</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className='rounded-xl h-[450px] mt-16 bg-black'
                    ></video>
                  </div>
                ) : (
                  <label htmlFor=''>
                    <div className='flex flex-col items-center justify-center w-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p>
                          <FaCloudUploadAlt className='text-gray-300 text-6xl' />
                        </p>
                        <p className='text-xl font-semibold'>Video Upload</p>
                      </div>
                      <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                        Mp4 or Webm or ogg
                        <br />
                        720x 1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className='bg-[#f51997] text-center mt-10 rounded text-white text-xl font-medium p-2 w-52 outline-none'>
                        Select File
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload'
                      onChange={(e) => uploadVideo(e)}
                      id='upload'
                      className=''
                    />
                  </label>
                )}

                {WrongFileType && (
                  <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>
                    Please select a video file
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {/* form */}
        <div className='flex flex-col gap-3 pb-10'>
          <label htmlFor='' className='text-sm font-medium'>
            Caption
          </label>
          <input
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='rounded outline-none text-xl border-2 border-gray-200 p-2'
          />

          <label htmlFor='' className='text-sm font-medium'>
            Choose Category
          </label>
          <select
            className='outline-none border-2 border-gray-200 text-sm capitalize lg:p-4 p-2 rounded cursor-pointer'
            onChange={(e) => setCategory(e.target.value)}
          >
            {topics.map((t) => (
              <option
                value={t.name}
                key={t.name}
                className='outline-none capitalize bg-white text-gray-700 text-xl p-2 hover:bg-slate-300'
              >
                {t.name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
              onClick={() => {}}
              className='border-2 border-gray-300 text-lg font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discord
            </button>
            <button
              onClick={handlePost}
              className='bg-[#f51997] text-lg font-medium p-2 rounded w-28 lg:w-44 outline-none text-white'
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
