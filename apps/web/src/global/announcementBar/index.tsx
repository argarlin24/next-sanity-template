import RichText, { richTextFragment } from 'organisms/richText';

import CloseButton from 'global/announcementBar/components/closeButton';
import AnnouncementBarContainer from 'global/announcementBar/components/container';

import { q, runQuery } from 'lib/client';

const announcementBarQuery = q.star.filterByType('announcementBar').project(announcementBar => ({
  announcement: announcementBar.field('announcement[]').project(richTextFragment).nullable(true),
}));

const AnnouncementBar = async () => {
  const query = announcementBarQuery,
    data = (await runQuery(query, {}))[0];

  if (!data?.announcement) return null;

  return (
    <AnnouncementBarContainer>
      <RichText
        blocks={data.announcement}
        className="mx-auto w-fit py-4 pr-12 pl-4 text-sm text-black sm:py-2 lg:pr-4 lg:text-center lg:text-md"
      />
      <CloseButton />
    </AnnouncementBarContainer>
  );
};

export default AnnouncementBar;
