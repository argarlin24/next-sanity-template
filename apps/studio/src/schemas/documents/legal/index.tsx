import { EditIcon, HashIcon, WrenchIcon } from '@sanity/icons';
import { defineType } from 'sanity';

import defineImage from '@/schemas/definitions/image';
import defineRichText, { defineSingleLineRichText } from '@/schemas/definitions/richText';
import { pageBody } from '@/schemas/fields/pageBody';
import { seo } from '@/schemas/fields/seo';

import type { PortableTextObject, PortableTextSpan, PortableTextTextBlock } from 'sanity';

const legal = defineType({
  name: 'legal',
  title: 'Legal',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: HashIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fields: [
    seo(),
    defineSingleLineRichText({
      name: 'postTitle',
      title: 'Title',
      decorators: ['em'],
      group: 'content',
    }),
    defineRichText({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'This field will show up underneath the title.',
      group: 'content',
    }),
    defineRichText({
      name: 'content',
      title: 'Content',
      group: 'content',
      decorators: ['strong', 'em', 'underline', 'code'],
      annotations: ['link', 'internalLink'],
      excludedTextStyles: ['h1'],
      includeHorizontalRule: true,
      additionalSchemas: [
        defineImage({
          name: 'richImage',
          title: 'Rich Image',
        }),
      ],
    }),
    pageBody,
  ],
  initialValue: () => ({
    // body: [{ _type: 'symbolReference', _ref: '3f8eb38c-a989-4d6b-bee4-efad841c1113' }],
  }),
  preview: {
    select: {
      title: 'postTitle',
      slug: 'seo.slug.current',
    },
    prepare: ({ title, slug }) => {
      const slugPreview = slug ? `${slug}` : 'Not published',
        firstBlock = ((title as PortableTextTextBlock<PortableTextSpan | PortableTextObject>[]) || []).find(
          block => block._type === 'block',
        );

      return {
        title: firstBlock
          ? firstBlock.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join('')
          : 'No title',
        subtitle: slugPreview,
      };
    },
  },
});

export default legal;
