import { BsArrowsExpand } from 'react-icons/bs';
import { type PortableTextTextBlock, defineField } from 'sanity';

import definePageComponent from '@/schemas/definitions/component';
import accordionItem from '@/schemas/fields/accordion';
import heading from '@/schemas/fields/heading';

const accordion = definePageComponent({
  name: 'accordion',
  title: 'Accordion',
  icon: BsArrowsExpand,
  fields: [
    heading,
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [accordionItem],
    }),
    defineField({
      name: 'includeSchema',
      title: 'Include Schema',
      type: 'boolean',
      initialValue: false,
      description: 'Include FAQ google schema on page',
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }: Record<string, PortableTextTextBlock[]>) => {
      const firstBlock = (title || []).find(block => block._type === 'block');

      return {
        title: 'Accordion',
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

export default accordion;
