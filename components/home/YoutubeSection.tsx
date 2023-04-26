import { ContentsDataType } from '@/models/sheet/InSheet';
import home from '@/styles/home/Home.module.scss';
import YoutubeContentCard from '@/components/YoutubeContentCard';

interface YoutubeSectionProps {
  contents: ContentsDataType[];
}

const YoutubeSection = ({ contents }: YoutubeSectionProps) => {
  return (
    <section className={home['contents-section']}>
      {contents.map((data) => (
        <YoutubeContentCard key={data.videoId} contents={data} />
      ))}
    </section>
  );
};

export default YoutubeSection;