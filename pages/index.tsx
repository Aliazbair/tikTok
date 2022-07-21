import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { NoResults, VideoCard } from '../components';
import styles from '../styles/Home.module.css';
import { Video } from '../types';
import { BASE_URL } from '../utils';

interface IProps {
  video: Video[];
}

const Home = ({ video }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {video.length ? (
        video?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
      ) : (
        <NoResults text={'No videoS'} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  // check if topic search exist
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  // else return all topics
  return {
    props: { video: response.data },
  };
};

export default Home;
