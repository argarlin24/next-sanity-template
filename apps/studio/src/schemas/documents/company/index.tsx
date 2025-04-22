import { CaseIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import defineImage from '@/schemas/definitions/image';

export const company = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().error('You must provide a name for this company.'),
    }),
    defineImage({
      name: 'logo',
      title: 'Logo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
});
