import { defineType } from 'sanity';

import defineRichText from '@/schemas/definitions/richText';

const announcementBar = defineType({
  name: 'announcementBar',
  title: 'Announcement Bar',
  type: 'document',
  fields: [
    defineRichText({
      name: 'announcement',
      title: 'Announcement',
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'bullet', 'number'],
      annotations: ['link', 'internalLink'],
      decorators: ['strong'],
    }),
  ],
  options: {
    // @ts-expect-error - Singleton is a valid option with a plugin
    singleton: true,
  },
});

export default announcementBar;
