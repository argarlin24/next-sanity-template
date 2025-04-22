import { EditIcon, LinkIcon, UserIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import image from '@/schemas/definitions/image';
import { company } from '@/schemas/documents/company';

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'name',
      title: 'Name',
      options: { columns: 2 },
    },
    {
      name: 'employment',
      title: 'Employment',
    },
    {
      name: 'socialMediaUrls',
      title: 'Social Media Links',
    },
  ],
  groups: [
    { name: 'basics', title: 'Basics', icon: EditIcon, default: true },
    { name: 'social', title: 'Social Links', icon: LinkIcon },
  ],
  fields: [
    defineField({
      name: 'firstName',
      title: 'First',
      type: 'string',
      fieldset: 'name',
      group: 'basics',
      validation: Rule => Rule.required().warning('You must provide a first name for this person.'),
    }),
    defineField({
      name: 'lastName',
      title: 'Last',
      type: 'string',
      fieldset: 'name',
      group: 'basics',
      validation: Rule => Rule.required().warning('You must provide a last name for this person.'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      fieldset: 'employment',
      group: 'basics',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [company],
      fieldset: 'employment',
      group: 'basics',
    }),
    image({ name: 'headshot', title: 'Headshot', group: 'basics' }),

    // Social media URLs
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
    defineField({
      name: 'xUrl',
      title: 'X',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
    defineField({
      name: 'githubUrl',
      title: 'Github',
      type: 'url',
      fieldset: 'socialMediaUrls',
      group: 'social',
    }),
  ],

  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'role',
      companyName: 'company.name',
      media: 'headshot',
    },
    prepare({ firstName, lastName, role, companyName, media }) {
      const title = [firstName, lastName].filter(i => i).join(' ');

      let subtitle: string[] | string = [role, companyName];

      if (role && companyName) {
        subtitle = subtitle.join(' | ');
      } else {
        subtitle = subtitle.filter(i => i).join('');
      }

      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
