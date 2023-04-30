import { ITEMS_PER_PAGE, PAGE_REVALIDATE_TIME } from '@/consts';
import { getYoutubeChannelsByUid } from '@/models/youtube/Channel';
import ChannelsPage, { ChannelsPageProps } from '@/pages/channels';
import getPaginationRange from '@/utils/GetPagenationRange';
import { combineChannelData } from '@/utils/CombineChannelData';
import { parseChannelIDSheet } from '@/utils/ParseChannelSheet';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

const ChannelsWithPage = (props: ChannelsPageProps) => {
  return <ChannelsPage {...props} />;
};

export default ChannelsWithPage;

interface ChannelsWithPageParams extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<ChannelsPageProps, ChannelsWithPageParams> = async ({ params }) => {
  const { page } = params!;

  /** Params */
  const pageQuery = Number(page);
  if (Number.isNaN(pageQuery)) throw new Error('PageQuery is not number');

  /* Google spread sheet API */
  const { totalLength, sheetDataValues } = await parseChannelIDSheet();
  const sliceData = sheetDataValues.slice(...getPaginationRange(pageQuery));

  /* YoutubeData API */
  const callYoubeAPI = sliceData.slice().map(([uid, _channelName, _url]) => {
    return getYoutubeChannelsByUid(uid);
  });

  const youtubeData = await Promise.all(callYoubeAPI);
  const contents = combineChannelData({ youtubeData, sheetData: sliceData });

  return {
    props: {
      totalLength,
      contents,
    },
    revalidate: PAGE_REVALIDATE_TIME,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  /* Google spread sheet API */
  const { totalLength } = await parseChannelIDSheet();
  const numberOfPages = Math.ceil(totalLength / ITEMS_PER_PAGE);
  const paths = Array.from({ length: numberOfPages }, (_, i) => {
    return { params: { page: (i + 1).toString() } };
  });

  return {
    paths,
    fallback: false,
  };
};
