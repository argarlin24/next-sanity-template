import { sentenceToKebabCase } from '@packages/utils/src/strings';

import DropDown from 'molecules/formInputs/select';

import { setBlogFilter, useBlogFilter } from 'components/listing/blog/store';

import type { BlogListingProps } from 'components/listing/blog';
import type { FC } from 'react';

interface BlogFiltersProps {
  categories: BlogListingProps['blogCategories'];
}

const BlogFilters: FC<BlogFiltersProps> = ({ categories }) => {
  const filter = useBlogFilter();

  return (
    <div>
      <DropDown
        options={[
          { label: 'All Categories', value: 'all-categories' },
          ...categories.map(category => ({ label: category.title, value: sentenceToKebabCase(category.title) })),
        ]}
        placeholder="Filter By Category"
        value={filter ? [filter] : []}
        onChange={v => setBlogFilter(v as string)}
      />
    </div>
  );
};

export default BlogFilters;
