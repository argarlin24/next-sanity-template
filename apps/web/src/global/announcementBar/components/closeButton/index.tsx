'use client';

import { setAnnouncementBarDismissed } from 'global/announcementBar/store';
// import Icon from 'molecules/icon';

import type { FC } from 'react';

const CloseButton: FC = () => (
  <button
    className="absolute top-0 right-0 z-20 flex size-9 cursor-pointer items-center justify-center p-2"
    onClick={setAnnouncementBarDismissed}
  >
    {/* <Icon icon="x-close" size={20} /> */}X {/* Update with icon */}
  </button>
);

export default CloseButton;
