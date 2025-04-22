import { EditIcon, HashIcon, TagsIcon, WrenchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import defineImage from '@/schemas/definitions/image';
import defineRichText, { defineSingleLineRichText } from '@/schemas/definitions/richText';
import { pageBody } from '@/schemas/fields/pageBody';
import { seo } from '@/schemas/fields/seo';

import type { PortableTextObject, PortableTextSpan, PortableTextTextBlock } from 'sanity';

const blog = defineType({
  name: 'blog',
  title: 'Blog',
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
      name: 'tags',
      title: 'Tags',
      icon: TagsIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fields: [
    {
      ...seo(),
      options: {
        slugPrefix: 'blog',
        includeSlugPrefixInStoredValue: false,
      },
    },
    defineSingleLineRichText({
      name: 'postTitle',
      title: 'Title',
      decorators: ['em'],
      group: 'content',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: Rule => Rule.required().error('You must provide a published date for this blog post.'),
      group: 'content',
    }),
    defineRichText({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'This field will show up on resource cards.',
      group: 'content',
    }),
    defineImage({
      name: 'featuredImage',
      title: 'Featured Image',
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
    defineField({
      name: 'blogTags',
      title: 'Blog Tags',
      type: 'array',
      group: 'tags',
      of: [
        {
          type: 'reference',
          to: { type: 'blogCategory' },
          options: {
            disableNew: true,
          },
        },
      ],
    }),
  ],
  initialValue: () => ({
    publishedDate: new Date(),
    // Add in common components here
    // body: [
    //   { _type: 'symbolReference', _ref: '970505b8-173f-441f-8968-606aa6592760' },
    //   { _type: 'symbolReference', _ref: '3f8eb38c-a989-4d6b-bee4-efad841c1113' },
    // ],
  }),
  preview: {
    select: {
      title: 'postTitle',
      slug: 'seo.slug.current',
      media: 'featuredImage',
      published: 'publishedDate',
    },
    prepare: ({ title, slug, media, published }) => {
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
        subtitle: published || slugPreview,
        media,
      };
    },
  },
});

export default blog;
