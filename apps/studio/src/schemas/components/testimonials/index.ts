import { MdOutlineRateReview } from 'react-icons/md';
import { defineField } from 'sanity';

import definePageComponent from '@/schemas/definitions/component';
import headingMolecule from '@/schemas/fields/heading';

import type { PortableTextTextBlock } from 'sanity';

const testimonials = definePageComponent({
  name: 'testimonials',
  title: 'Testimonials',
  icon: MdOutlineRateReview,
  fields: [
    headingMolecule,
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      validation: Rule => Rule.min(3).max(12),
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }: Record<string, PortableTextTextBlock[]>) => {
      const firstBlock = (title || []).find(block => block._type === 'block');

      return {
        title: 'Testimonials',
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

export default testimonials;
