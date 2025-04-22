import { defineField } from 'sanity';

import defineRichText, { defineSingleLineRichText } from '@/schemas/definitions/richText';
import button from '@/schemas/fields/button';

const heading = defineField({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),

    defineSingleLineRichText({
      name: 'heading',
      title: 'Heading',
      decorators: ['em'],
    }),

    defineRichText({
      name: 'body',
      title: 'Body',
      annotations: ['link', 'internalLink'],
      excludedTextStyles: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'],
      decorators: ['strong', 'em', 'underline', 'code'],
    }),

    // this field can be buttons, app downloads, or images ( can we restrict the images to logos? )
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [button],
    }),
  ],
});

export default heading;
