import { z } from 'groqd';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Badge from 'molecules/badge';
import Button from 'molecules/button';
import Image, { imageFragment } from 'molecules/image';
import Link from 'molecules/link';

import RichText, { richTextFragment } from 'organisms/richText';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { BadgeVariations } from 'molecules/badge';
import type { FC } from 'react';

export type ResourceCardQuery = InferFragmentType<typeof resourceCardFragment>;

const ResourceCard: FC<ResourceCardQuery> = ({ postTitle, excerpt, featuredImage, blogTags, slug }) => (
  <Link
    href={`/blog/${slug}`}
    className="group relative overflow-hidden rounded-lg shadow-none focus-outline-primary transition-shadow hover:shadow-lg"
  >
    {hasArrayValues(blogTags) && (
      <div className="absolute top-4 z-10 flex w-full flex-wrap justify-end gap-2 px-4">
        {blogTags.map(tag => (
          <Badge key={tag.title} label={tag.title} color={tag.color} />
        ))}
      </div>
    )}
    {featuredImage && <Image {...featuredImage} objectCover className="w-full overflow-hidden rounded-lg" />}
    <div className="relative z-0 flex flex-col gap-4 px-6 py-4">
      {postTitle && <RichText blocks={postTitle} customHeaderStyles className="line-clamp-2" />}
      {excerpt && <RichText blocks={excerpt} className="line-clamp-3" />}
      {slug && (
        <Button label="Learn More" semanticFallback="div" hierarchy="link" iconPosition="end" icon="chevron-right" />
      )}
    </div>
  </Link>
);

export const blogCategoryFragment = q.fragmentForType<'blogCategory'>().project(cat => ({
  title: z.string(),
  color: cat.field('color').as<BadgeVariations['color']>(),
}));

export const resourceCardFragment = q.fragmentForType<'blog'>().project(card => ({
  _id: z.string(),
  postTitle: card.field('postTitle[]').project(richTextFragment).nullable(true),
  excerpt: card.field('excerpt[]').project(richTextFragment).nullable(true),
  featuredImage: card.field('featuredImage').project(imageFragment).nullable(true),
  blogTags: card.field('blogTags[]').deref().project(blogCategoryFragment).nullable(true),
  slug: ['seo.slug.current', z.string().optional().nullable()],
}));

export default ResourceCard;
