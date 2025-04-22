import { z } from 'groqd';
import { PortableText } from 'next-sanity';

import block from 'organisms/richText/config/blocks';
import HR from 'organisms/richText/config/components/hr';
import RichImage, { richImageFragment } from 'organisms/richText/config/components/richImage';
import listItem from 'organisms/richText/config/listItem';
import list from 'organisms/richText/config/lists';
import marks, { externalRichLinkFragment, internalRichLinkFragment } from 'organisms/richText/config/marks';

import { q } from 'lib/client';

import customTwMerge from 'utils/twMerge';

import type { InferFragmentType } from 'groqd';
import type { PortableTextComponents } from 'next-sanity';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Blog, Page } from 'types/sanity.types';

export type RichTextFragment = InferFragmentType<typeof richTextFragment>;
type ArticleFragment = InferFragmentType<typeof articleFragment>;

interface RichTextProps {
  /**
   * The rich text data to render.
   */
  blocks: RichTextFragment[] | ArticleFragment[];

  /**
   * The class name to apply to the parent element.
   */
  className?: string;

  /**
   * Additional styles to apply to all headings.
   */
  additionalHeadingStyles?: string;

  /**
   * Whether to render headings with custom styles.
   */
  customHeaderStyles?: boolean;
}

const portableTextOptions = (
  additionalHeadingStyles?: string,
  customHeaderStyles?: boolean,
): PortableTextComponents => ({
  types: {
    hr: HR,
    richImage: RichImage,
  },
  block: block(additionalHeadingStyles, customHeaderStyles),
  marks,
  list,
  listItem,
});

const RichText: FC<RichTextProps> = ({ blocks, className, additionalHeadingStyles, customHeaderStyles }) => (
  <div className={customTwMerge('flex flex-col gap-4', className)}>
    <PortableText
      value={blocks as RichTextFragment[]}
      components={portableTextOptions(additionalHeadingStyles, customHeaderStyles)}
      onMissingComponent={(message, options) => {
        throw new Error(
          `Error rendering PortableText: ${message}. Type: ${options.type}. NodeType: ${options.nodeType}`,
        );
      }}
    />
  </div>
);

interface RichTextQuery
  extends Omit<StripArray<StripMaybe<StripMaybe<ExtractSanityType<Page, 'heading', 'heading'>>['body']>>, '_type'> {
  _type: string;
}

export const richTextFragment = q.fragment<RichTextQuery>().project(richText => ({
  _type: z.string(),
  _key: z.string(),
  children: z
    .array(
      z.object({
        _key: z.string(),
        _type: z.string(),
        text: z.string().optional(),
        marks: z.array(z.string()).optional(),
      }),
    )
    .optional()
    .nullable(),
  markDefs: richText
    .field('markDefs[]')
    .project(mark => ({
      ...mark.conditionalByType({
        link: externalRichLinkFragment,
        internalLink: internalRichLinkFragment,
      }),
    }))
    .nullable(true),
  style: z.string().optional().nullable(),
  listItem: z.string().optional().nullable(),
  level: z.number().optional().nullable(),
}));

type ArticleQuery = Blog['content'];

export const articleCondition = {
  block: richTextFragment,
  richImage: richImageFragment,
};

export const articleFragment = q.fragment<ArticleQuery>().project(content => ({
  ...content.conditionalByType(articleCondition),
}));

export default RichText;
