import { TbListSearch } from 'react-icons/tb';
import { defineField } from 'sanity';

import definePageComponent from '@/schemas/definitions/component';

import { genValuesFromArray } from '@/utils/genValuesFromArray';

const listing = definePageComponent({
  name: 'listing',
  title: 'Listing',
  icon: TbListSearch,
  fields: [
    defineField({
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: genValuesFromArray(['blog']),
      },
    }),
  ],
  preview: {
    select: {
      listingType: 'listingType',
    },
    prepare: ({ listingType }) => ({
      title: 'Listing',
      subtitle: listingType,
    }),
  },
});

export default listing;
