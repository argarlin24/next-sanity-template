import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { defineField } from 'sanity';

import definePageComponent from '@/schemas/definitions/component';
import defineImage from '@/schemas/definitions/image';
import heading from '@/schemas/fields/heading';

import type { PortableTextTextBlock } from 'sanity';

const switchback = definePageComponent({
  name: 'switchback',
  title: 'Switchback',
  icon: HiOutlineSwitchHorizontal,
  fields: [
    heading,
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Media', value: 'media' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineImage({
      name: 'featuredImage',
      title: 'Featured Image',
      hidden: ({ parent }) => parent?.mediaType === 'media',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'reference',
      to: [{ type: 'video' }],
      hidden: ({ parent }) => parent?.mediaType === 'image',
    }),
    defineField({
      name: 'reverse',
      title: 'Reverse',
      type: 'boolean',
      initialValue: false,
      description:
        'Reverse the order of the switchback. If enabled the image will appear on the right on desktop. On Mobile and tablet the image will always appear above the content. ',
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }: Record<string, PortableTextTextBlock[]>) => {
      const firstBlock = (title || []).find(block => block._type === 'block');

      return {
        title: 'Switchback',
        subtitle: firstBlock
          ? firstBlock.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join('')
          : 'No title',
      };
    },
  },
});

export default switchback;
