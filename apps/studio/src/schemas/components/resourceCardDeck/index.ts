import { PiCards } from 'react-icons/pi';
import { defineField } from 'sanity';

import definePageComponent from '@/schemas/definitions/component';
import heading from '@/schemas/fields/heading';

import type { PortableTextTextBlock } from 'sanity';

const resourceCardDeck = definePageComponent({
  name: 'resourceCardDeck',
  title: 'Resource Card Deck',
  icon: PiCards,
  fields: [
    heading,
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blog' }],
        },
      ],
      validation: Rule => Rule.min(2).max(3),
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }: Record<string, PortableTextTextBlock[]>) => {
      const firstBlock = (title || []).find(block => block._type === 'block');

      return {
        title: 'Resource Card Deck',
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

export default resourceCardDeck;
