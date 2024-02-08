import { FETCH_REVALIDATE_TIME } from '@/const';

/** @document https://nextjs.org/docs/app/api-reference/functions/fetch */
const FETCHOPTION: RequestInit = {
  next: { revalidate: FETCH_REVALIDATE_TIME },
};

export const customFetchCached = (props: any) => {
  return fetch(props, { cache: 'no-store' });
};

export const customFetchNoCached = (props: any) => {
  //cache: no-store, revalidate: 0 둘중 하나면 설정해야함.
  return fetch(props, { cache: 'no-store' });
};
