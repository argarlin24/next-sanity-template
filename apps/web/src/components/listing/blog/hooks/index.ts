import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { type ResourceCardQuery, resourceCardFragment } from 'organisms/cards/resource';

import { setBlogResultCount, useBlogFilter, useBlogPage } from 'components/listing/blog/store';

import { q, runQuery } from 'lib/client';

import { PAGE_SIZE } from '..';

const blogQuery = (page: number, category: string | null) =>
  q.star
    .filterByType('blog')
    .filter(category ? `"${category}" in blogTags[]->title` : '')
    .order('publishedDate desc')
    .slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page - 1)
    .project(resourceCardFragment);

const totalBlogCountQuery = (filter: string | null) =>
  q.count(q.star.filterByType('blog').filter(filter ? `"${filter}" in blogTags[]->title` : ''));

const useSetSearchParams = (updatedParams: Record<string, string>[]) => {
  const searchParams = useSearchParams(),
    pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  updatedParams.forEach(v => {
    const key = Object.keys(v)[0],
      value = v[key];

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = pathname;
    url.search = params.toString();
    window.history.replaceState(null, '', url.toString());
  }, [params.toString(), pathname]);
};

const useFilteredBlogs = (initialBlogCards: ResourceCardQuery[], totalBlogs: number) => {
  const [cards, setCards] = useState<ResourceCardQuery[]>(initialBlogCards),
    filter = useBlogFilter(),
    page = useBlogPage();

  useSetSearchParams([{ filter }, { page: page.toString() }]);

  useEffect(() => {
    (async () => {
      setCards(
        page === 1 && (!filter || filter === 'all-categories')
          ? initialBlogCards
          : await runQuery(blogQuery(page, filter === 'all-categories' ? null : filter)),
      );
      setBlogResultCount(
        !filter || filter === 'All Categories' ? totalBlogs : ((await runQuery(totalBlogCountQuery(filter))) as number),
      );
    })();
  }, [page, filter, initialBlogCards, totalBlogs]);

  return cards;
};

export default useFilteredBlogs;
