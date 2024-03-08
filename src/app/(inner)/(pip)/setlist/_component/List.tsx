'use client';
import { SETLIST_PAGE_SIZE } from '@/const';
import { ChannelDataset } from '@/model/mongoDB/getAllChannel';
import { Setlist } from '@/model/oracleDB/setlist/service';
import Pagination from '@inner/_component/Pagination';
import Loading from '@inner/loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import Row from './Row';
import * as styles from './list.css';

interface ListProps {
  searchParams: {
    query: string;
    page: number;
    order: 'broadcast' | 'create';
  };
  channelDataset: ChannelDataset;
}

export default function List({ searchParams, channelDataset }: ListProps) {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['searchSetlist', searchParams],
    queryFn: async () => {
      const result = await axios.get<{
        total: number;
        list: Setlist[];
      }>(
        `/api/search/setlist?q=${searchParams.query}&r=${
          (searchParams.page - 1) * SETLIST_PAGE_SIZE
        }&o=${searchParams.order}`,
      );
      return result.data;
    },
  });

  const handlePage = (page: number) => {
    router.push(`/setlist?query=${searchParams.query}&page=${page}&order=${searchParams.order}`);
  };

  if (isLoading) return <Loading />;

  if (!data) {
    return (
      <div>
        <div>검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={cx(styles.headerCell)}>썸네일</div>
          <div className={styles.headerCell}>채널명</div>
          <div className={cx(styles.headerCell, 'flex2')}>제목</div>
          <div className={styles.headerCell}>
            {searchParams.order === 'create' ? '작성일' : '방송일'}
          </div>
        </div>
        <div className={styles.body}>
          {data.list.map((data) => (
            <Row
              key={data.videoId}
              setlist={data}
              channel={channelDataset[data.channelId]}
              order={searchParams.order}
            />
          ))}
        </div>
        <div className={styles.pagenationBox}>
          <Pagination
            count={data.total}
            pageSize={SETLIST_PAGE_SIZE}
            sliblingCount={1}
            currentPage={searchParams.page}
            onPageChange={handlePage}
          />
        </div>
      </div>
    </div>
  );
}
