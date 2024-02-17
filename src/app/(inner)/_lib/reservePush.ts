import { PushData } from '@/app/api/push/route';
import axios from 'axios';

interface ReservePushArgs {
  title: string;
  body: string;
  token: string;
  timestamp: string;
  imageUrl: string;
  link: string;
}

const reservePush = async ({ title, body, token, timestamp, imageUrl, link }: ReservePushArgs) => {
  const data: PushData = {
    title,
    body,
    token,
    timestamp,
    imageUrl,
    link,
  };

  const response = await axios<{ message: string }>({
    method: 'POST',
    url: '/api/mongoDBService',
    data,
  });

  return response;
};

export default reservePush;
