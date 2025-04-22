import { MenuIcon } from '@sanity/icons';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import button from '@/schemas/fields/button';
import icon from '@/schemas/fields/icon';
import link from '@/schemas/fields/links';

const navigationItem = defineField({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    icon,
    link,
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'link.label',
      subtitle: 'description',
    },
  },
});

const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
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
          icon: MenuIcon,
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() }),
            defineField({
              name: 'menu',
              title: 'Menu',
              type: 'array',
              of: [navigationItem],
              validation: rule => rule.min(1).max(6),
            }),
          ],
          preview: {
            select: {
              label: 'label',
              links: 'menu',
            },
            prepare: ({ label, links }) => ({
              title: label,
              subtitle: hasArrayValues(links) ? `${links.length} Links` : 'No Links',
            }),
          },
        }),
        defineField({
          name: 'megaMenu',
          title: 'Mega Menu',
          type: 'object',
          icon: BsFillMenuButtonWideFill,
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() }),
            defineField({
              name: 'menuLabel',
              title: 'Menu Label',
              type: 'string',
            }),
            defineField({
              name: 'menu',
              title: 'Menu',
              type: 'array',
              of: [navigationItem],
              validation: rule => rule.min(1).max(6),
            }),
          ],
          preview: {
            select: {
              label: 'label',
              links: 'menu',
              cards: 'cards',
            },
            prepare: ({ label, links }) => ({
              title: label,
              subtitle: hasArrayValues(links) ? `${links.length} Links` : 'No Links',
            }),
          },
        }),
        link,
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [button],
    }),
  ],
  options: {
    // @ts-expect-error - Singleton is a valid option with a plugin
    singleton: true,
  },
});

export default navigation;
