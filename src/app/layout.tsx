import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/style/reset.css';
import '/public/theme.css';
import '@/style/globals.scss';
import '@/style/theme.scss';
import { PropsWithChildren } from 'react';
import { DEFALUT_METADATA } from '@/const/metaData';
import { getCookies } from '@/util/getCookie';
import type { Viewport } from 'next';
import Configs from './_component';
import DefaultHead from './_component/DefaultHead';
import GoogleTagManager from './_component/GoogleTagManager';

const RootLayout = async ({ children }: PropsWithChildren) => {
  const cookies = await getCookies();

  return (
    <html lang="ko" color={cookies.theme}>
      <head>
        <DefaultHead />
      </head>
      <body>
        <Configs cookies={cookies}>{children}</Configs>
        <GoogleTagManager />
      </body>
    </html>
  );
};

export default RootLayout;

/** Default Route Segment Config */
export const dynamicParams = true; //fallback
export const preferredRegion = ['icn1'];
export const metadata = DEFALUT_METADATA;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: 'cover',
};
