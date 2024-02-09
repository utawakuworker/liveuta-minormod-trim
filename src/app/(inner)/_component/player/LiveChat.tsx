'use client';
import popupCenter from '@inner/_lib/popup';
import { useEffect, useRef, useState } from 'react';
import { LiveChatBox, PopButton } from './Style';

const DOMAIN = 'liveuta.vercel.app';

interface LiveChatProp {
  videoId: string;
  isDesktop: boolean;
}

export default function LiveChat({ videoId, isDesktop }: LiveChatProp) {
  const url = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${DOMAIN}&dark_theme=1`;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const resiveMsgFromChild = (event: MessageEvent) => {
    if (event.origin !== url) return;
    console.log('reciveFromChild', event.data);
  };

  const openPopup = () => {
    popupCenter(url, '_blank', 350, 700);
  };

  useEffect(() => {
    if (isLoaded === false || !isDesktop) return;
    console.log('liveChat load');
    window.addEventListener('message', resiveMsgFromChild);
    return () => window.removeEventListener('message', resiveMsgFromChild);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isDesktop) return null;

  return (
    <LiveChatBox>
      <PopButton onClick={openPopup}>POP</PopButton>
      <iframe
        ref={iframeRef}
        className="liveChat"
        src={url}
        // sandbox="allow-scripts allow-same-origin allow-presentation"
        // seamless
        onLoad={() => setIsLoaded(() => true)}
      />
    </LiveChatBox>
  );
}