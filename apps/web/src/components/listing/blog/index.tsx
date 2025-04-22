import { z } from 'groqd';

import ResourceCard, { blogCategoryFragment, resourceCardFragment } from 'organisms/cards/resource';
import Pagination from 'organisms/pagination';

import BlogFilters from 'components/listing/blog/components/filters';
import useFilteredBlogs from 'components/listing/blog/hooks';
import { setBlogPage, useBlogResultCount } from 'components/listing/blog/store';

import { q } from 'lib/client';

import scrollElementIntoView from 'utils/scroll';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

export type BlogListingProps = InferFragmentType<typeof blogListingFragment>;

export const PAGE_SIZE = 12;

const BlogListing: FC<BlogListingProps> = ({ blogs, totalBlogs, blogCategories }) => {
  const cards = useFilteredBlogs(blogs, totalBlogs),
    resultCount = useBlogResultCount();

  const handlePageChange = (pageNumber: number) => {
    scrollElementIntoView('listing-section');
    setBlogPage(pageNumber);
  };

  return (
    <div id="listing-section" className="flex flex-col gap-24 sm:gap-28 lg:gap-32">
      <BlogFilters categories={blogCategories} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
        {cards.map(card => (
          <ResourceCard key={card._id} {...card} />
        ))}
      </div>
      <Pagination count={resultCount} pageSize={PAGE_SIZE} setPage={detail => handlePageChange(detail.page)} />
    </div>
  );
};

export const blogListingFragment = q.fragment<FragmentAny>().project({
  _key: z.string(),
  blogs: q.star
    .filterByType('blog')
    .order('publishedDate desc')
    .slice(0, PAGE_SIZE - 1)
    .project(resourceCardFragment),
  totalBlogs: q.count(q.star.filterByType('blog')),
  blogCategories: q.star.filterByType('blogCategory').project(blogCategoryFragment),
});

export default BlogListing;
