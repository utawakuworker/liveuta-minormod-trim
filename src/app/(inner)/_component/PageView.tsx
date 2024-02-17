'use client';
import { PropsWithChildren, useEffect } from 'react';

export default function PageView({ children }: PropsWithChildren) {
  useEffect(() => {
    const location = window.location;
    const pathname = location.pathname;
    const search = location.search;
    gtag('event', 'page_view', { page_path: pathname + search });
  }, []);
  return <>{children}</>;
}
