import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '../styles/globals.css';
import { Navbar, Sidebar } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  if (isSSR) return null;

  return (
    <>
      <GoogleOAuthProvider clientId='729672999669-okpdrirgktvcmn0hvcufgd9ivi4k45p8.apps.googleusercontent.com'>
        <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
          <Navbar />
          <div className='flex gap-6 md:gap-20'>
            <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
              <Sidebar />
            </div>
            <div>
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
