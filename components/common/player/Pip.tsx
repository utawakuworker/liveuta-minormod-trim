/** @jsxImportSource @emotion/react */
import Player from '@/components/common/player/Player';
import { PipBase } from '@/components/common/player/Style';
import useResponsive from '@/hooks/useResponsive';
import clientOnly from '@/models/clientOnly';

const Pip = () => {
  const { isMobile } = useResponsive();

  if (isMobile) return null;

  return (
    <div css={PipBase}>
      <Player isShow={false} />
    </div>
  );
};

export default clientOnly(Pip);
