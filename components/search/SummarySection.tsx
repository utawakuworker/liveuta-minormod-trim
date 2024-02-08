import search from '@/components/search/Search.module.scss';
import { useSearchQuery } from '@/queries/search';
import { memo } from 'react';

const SummarySection = () => {
  const searchQuery = useSearchQuery();

  return (
    <>
      {searchQuery !== '' ? (
        <section className={search['result']}>
          <div>
            <p>{`"${searchQuery}" 검색결과`}</p>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default memo(SummarySection);
