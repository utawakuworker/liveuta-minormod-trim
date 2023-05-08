import Iframe, { IframeProps } from '@/components/common/Iframe';
import { SHORT_URL } from '@/consts';
import getENV from '@/utils/getENV';
import { GetStaticProps } from 'next';

interface ShortPageProps extends IframeProps {}

const ShortPage = ({ url }: ShortPageProps) => {
  return (
    <>
      <Iframe url={url} />
    </>
  );
};

export default ShortPage;

export const getStaticProps: GetStaticProps = () => {
  const url = getENV(SHORT_URL);
  return { props: { url } };
};