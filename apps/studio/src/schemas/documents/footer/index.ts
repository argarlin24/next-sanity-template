import { defineField, defineType } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import link from '@/schemas/fields/links';

const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [
        defineField({
          name: 'menu',
          title: 'Menu',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'links', title: 'Links', type: 'array', of: [link] }),
          ],
          preview: {
            select: {
              label: 'label',
              links: 'links',
            },
            prepare: ({ label, links }) => ({
              title: label,
              subtitle: hasArrayValues(links) ? `${links.length} Links` : 'No Links',
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'legalMenu',
      title: 'Legal Menu',
      type: 'array',
      of: [link],
    }),
  ],
  options: {
    // @ts-expect-error - Singleton is a valid option with a plugin
    singleton: true,
  },
});

export default footer;
