import { defineField } from 'sanity';

import { BadgeVariations } from '@packages/ui';
import { objectKeys } from '@packages/utils/src/typeUtils';

import icon from '@/schemas/fields/icon';

import { genValuesFromArray } from '@/utils/genValuesFromArray';

const badgeColors = objectKeys(BadgeVariations);

const badge = defineField({
  name: 'badge',
  title: 'Badge',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: genValuesFromArray(badgeColors),
      },
      initialValue: badgeColors[0],
    }),
    icon,
    defineField({
      name: 'iconPosition',
      title: 'Icon Position',
      type: 'string',
      options: {
        list: genValuesFromArray(['start', 'end']),
      },
      initialValue: 'start',
      hidden: ({ parent }) => parent?.icon !== 'none',
    }),
  ],
});

export default badge;
