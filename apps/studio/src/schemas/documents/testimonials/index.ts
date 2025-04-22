import { defineField, defineType } from 'sanity';

import defineRichText from '@/schemas/definitions/richText';
import { person } from '@/schemas/documents/person';

const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineRichText({
      name: 'testimonial',
      title: 'Testimonial',
      decorators: ['strong', 'em'],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [person],
    }),
  ],
  preview: {
    select: {
      from: 'from',
      to: 'to',
    },
    prepare: ({ from, to }) => ({
      title: `From ${from} to ${to}`,
    }),
  },
});

export default testimonial;
