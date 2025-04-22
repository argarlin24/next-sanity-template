import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnnouncementBarStore {
  dismissed: boolean;
}

const defaultState: AnnouncementBarStore = {
  dismissed: false,
};

const useAnnouncementBarStore = create<AnnouncementBarStore>()(
  persist(() => defaultState, {
    name: 'announcement-bar',
  }),
);

// Dismissed
export const useAnnouncementBarDismissed = () => useAnnouncementBarStore(state => state.dismissed);
export const setAnnouncementBarDismissed = () => useAnnouncementBarStore.setState(() => ({ dismissed: true }));
