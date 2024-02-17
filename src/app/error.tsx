// https://nextjs.org/docs/app/building-your-application/routing/error-handling
//에러 페이지는 클라이언트에서만 렌더링되어야 합니다.
'use client';
import { useEffect } from 'react';
import styles from '@/style/not-found.css';
import { FcHighPriority } from 'react-icons/fc';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; //세그먼트를 다시 렌더링하여 복구 시도
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // 500에러 콘솔은 개발환경에서만 표시됩니다.
      console.error('Error-Boundary', process.env.NODE_ENV, error);
    }
  }, [error]);

  return (
    <div className={styles.wrap}>
      <title>500: Server Error</title>
      <div>
        <FcHighPriority size={200} />
      </div>
      <div className={styles.inner}>
        <div className={styles.innerTop}>
          <h1>500</h1>
          <h2>{error.message}</h2>
        </div>
        <div className={styles.innerBottom}>
          <button onClick={reset}>ReTry</button>
        </div>
      </div>
    </div>
  );
}
