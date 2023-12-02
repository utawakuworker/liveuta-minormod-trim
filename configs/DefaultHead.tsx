import GoogleAnalytics from '@/configs/Analytics';
import { DEFAULT_ICON, DEFAULT_SITE_URL } from '@/consts/metaData';

const DefaultHead = () => {
  return (
    <>
      <GoogleAnalytics />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="shortcut icon" href={DEFAULT_ICON} />
      <link rel="apple-touch-icon" href={DEFAULT_ICON} />
      <link rel="assets" href={`${DEFAULT_SITE_URL}/assets`} />
    </>
  );
};

export default DefaultHead;
