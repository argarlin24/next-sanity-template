import { BlockContentIcon } from '@sanity/icons';

import definePageComponent from '@/schemas/definitions/component';
import headingMolecule from '@/schemas/fields/heading';

import type { PortableTextTextBlock } from 'sanity';

const heading = definePageComponent({
  name: 'heading',
  title: 'Heading',
  icon: BlockContentIcon,
  fields: [
    headingMolecule,
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }: Record<string, PortableTextTextBlock[]>) => {
      const firstBlock = (title || []).find(block => block._type === 'block');

      return {
        title: 'Heading',
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

export default heading;
