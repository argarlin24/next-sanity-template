import { defineField, defineType } from 'sanity';

import { BadgeVariations } from '@packages/ui';
import { objectKeys } from '@packages/utils/src/typeUtils';

import { genValuesFromArray } from '@/utils/genValuesFromArray';

const badgeColors = objectKeys(BadgeVariations);

const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: genValuesFromArray(badgeColors),
        layout: 'radio',
      },
      initialValue: badgeColors[0],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'color',
    },
  },
});

export default blogCategory;
