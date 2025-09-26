import { BlockContentIcon } from '@sanity/icons';
import { defineField } from 'sanity';

import definePageComponent from '@/schemas/definitions/component';
import defineImage from '@/schemas/definitions/image';
import heading from '@/schemas/fields/heading';

import { genValuesFromArray } from '@/utils/genValuesFromArray';

import type { PortableTextTextBlock } from 'sanity';

const hero = definePageComponent({
  name: 'hero',
  title: 'Hero',
  icon: BlockContentIcon,
  fields: [
    heading,
    defineField({
      name: 'variation',
      title: 'Variation',
      type: 'string',
      options: {
        list: genValuesFromArray(['centered', 'leftAligned']),
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
    defineImage({
      name: 'featuredImage',
      title: 'Featured Image',
    }),
    defineField({
      name: 'disableBreadcrumbs',
      title: 'Disable Breadcrumbs',
      type: 'boolean',
      group: 'settings',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
      variation: 'variation',
    },
    prepare: ({ title, variation }: Record<string, PortableTextTextBlock[]>) => {
      const firstBlock = (title || []).find(block => block._type === 'block');

      return {
        title: `Hero - ${variation}`,
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

export default hero;
