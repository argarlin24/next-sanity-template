'use client';

import Section from 'molecules/section';

import { useAnnouncementBarDismissed } from 'global/announcementBar/store';

import type { FC, ReactNode } from 'react';

interface AnnouncementBarContainerProps {
  children: ReactNode;
}

const AnnouncementBarContainer: FC<AnnouncementBarContainerProps> = ({ children }) => {
  const dismissed = useAnnouncementBarDismissed();

  return (
    <Section
      as="aside"
      sectionId="announcement-bar"
      padding={{ top: 'none', bottom: 'none' }}
      className="data-[dismissed=true]:hidden"
      data-dismissed={dismissed}
    >
      {children}
    </Section>
  );
};

export default AnnouncementBarContainer;
