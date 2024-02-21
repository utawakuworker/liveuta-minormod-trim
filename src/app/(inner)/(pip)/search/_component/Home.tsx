'use client';
import ChannelSection from './ChannelSection';
import ContentSection from './ContentSection';
import SearchSection from './SearchSection';
import SummarySection from './SummarySection';
import useResponsive from '@/hook/useResponsive';
import { useSearch } from '@inner/_lib/getSearch';

export default function Home() {
  const { searchData } = useSearch();
  const { isMobile } = useResponsive();

  return (
    <main id="app">
      <SearchSection />
      <SummarySection />
      <ContentSection contents={searchData.contents} isMobile={isMobile} />
      <ChannelSection channels={searchData.channels} />
    </main>
  );
}
