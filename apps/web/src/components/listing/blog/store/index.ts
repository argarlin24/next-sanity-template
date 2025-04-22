import { create } from 'zustand';

interface BlogStore {
  filter: string;
  page: number;
  resultCount: number;
}

const defaultState = {
  filter: '',
  page: 1,
  resultCount: 0,
} as const;

const useBlogStore = create<BlogStore>()(() => defaultState);

// Filter
export const useBlogFilter = () => useBlogStore(state => state.filter);
export const setBlogFilter = (filter: string) => useBlogStore.setState(() => ({ filter, page: 1 }));

// Page
export const useBlogPage = () => useBlogStore(state => state.page);
export const setBlogPage = (page: number) => useBlogStore.setState(() => ({ page }));

// Result Count
export const useBlogResultCount = () => useBlogStore(state => state.resultCount);
export const setBlogResultCount = (resultCount: number) => useBlogStore.setState(() => ({ resultCount }));
