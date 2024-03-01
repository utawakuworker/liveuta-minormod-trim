'use client';
import { usePlayerAtom } from '@/app/(inner)/_lib/atom';
import useToast from '@/hook/useToast';
import { forwardRef, useEffect, useState } from 'react';
import { ImYoutube } from 'react-icons/im';
import ReactPlayer from 'react-player';
import * as styles from './player.css';
import cx from 'classnames';
import { FaHotjar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { generateVideoUrl } from '@/model/youtube/url';

interface PlayerProps {
  isShow: boolean;
  isLive: boolean;
}

export default forwardRef(function Player(
  { isLive, isShow }: PlayerProps,
  ref: React.Ref<ReactPlayer>,
) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [playerValue, setPlayerValue] = usePlayerAtom();
  const toast = useToast();

  const keyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target === null) return;
    const tagName = target.tagName;
    const classList = target.classList;
    if (tagName === 'BODY' || classList.contains('imageLink')) {
      if (e.key === ' ') {
        e.preventDefault();
        // 스페이스바 이벤트 방지
        setPlayerValue((pre) => {
          toast.info({ text: `플레이어 ${pre.isPlaying ? '정지' : '재생'}`, duration: 2 });
          return { ...pre, isPlaying: !pre.isPlaying };
        });
      }
      if (e.key === 'Escape') {
        setPlayerValue((pre) => {
          toast.info({ text: `플레이어 ${pre.hide ? '보이기' : '숨기기'}`, duration: 2 });
          return { ...pre, hide: !pre.hide };
        });
      }
    }
  };

  const handlePlay = (isPlaying: boolean) => {
    setPlayerValue((pre) => ({ ...pre, isPlaying }));
  };

  const toggleLeft = () => {
    setPlayerValue((pre) => ({ ...pre, hide: !pre.hide }));
  };

  const navigateLive = () => router.push('/live');

  useEffect(() => {
    if (isReady === false) return;
    document.addEventListener('keydown', keyDown);
    return () => document.removeEventListener('keydown', keyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const left = isShow === false && playerValue.hide;
  const url = generateVideoUrl(playerValue.videoId);

  return (
    <div className={cx(isShow === false && styles.pipBase, styles.playerDiv, left && 'left')}>
      <ReactPlayer
        className={cx(styles.playerBase, 'reactPlayer')}
        width={'100%'}
        height={'auto'}
        ref={ref}
        url={url}
        muted={playerValue.isMutted}
        autoPlay={playerValue.isPlaying}
        playing={playerValue.isPlaying}
        onPlay={() => handlePlay(true)}
        onPause={() => handlePlay(false)}
        config={{ youtube: { playerVars: { suggestedQuality: 'hd720' } } }}
        controls={true}
        onReady={() => setIsReady(() => true)}
        fallback={<div className={styles.playerPlaceholder} />}
      />
      <button className={cx(styles.pipButton, isShow === false && 'hide')} onClick={toggleLeft}>
        <ImYoutube size={28} />
      </button>
      <button
        disabled={isLive}
        className={cx(styles.liveButton, isShow === false && 'hide')}
        onClick={navigateLive}
      >
        <FaHotjar size={28} />
      </button>
    </div>
  );
});
