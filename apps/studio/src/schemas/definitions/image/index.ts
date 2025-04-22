import { defineField } from 'sanity';

import type { FieldDefinitionBase, FieldGroup } from 'sanity';

type Options = {
  includeCaption?: boolean;
  includeAlt?: boolean;
  responsive?: boolean;
};

type ImageDefinition = FieldDefinitionBase & Omit<FieldGroup, 'fields'> & Options;

const defineImage = ({
  includeAlt = true,
  includeCaption = false,
  responsive = false,
  ...definition
}: ImageDefinition) =>
  defineField({
    ...definition,
    type: 'image',
    fieldsets: [
      {
        name: 'image',
        title: 'Responsive Images',
        description: 'Optional: customize responsive image settings. Otherwise, the main image settings will be used.',
        hidden: ({ value }) => !value?.responsive,
        options: { columns: 2 },
      },
    ],
    fields: [
      ...(includeAlt
        ? [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: Rule =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Rule.custom((alt, context: any) => {
                  if (alt && !('asset' in context.parent)) {
                    return 'Remove text from alt field if no image is provided';
                  }

                  if (!alt && 'asset' in context.parent) {
                    return 'Alt text is required if image is provided';
                  }

                  return true;
                }),
            }),
          ]
        : []),
      ...(includeCaption
        ? [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ]
        : []),
      ...(responsive
        ? [
            defineField({
              name: 'responsive',
              title: 'Responsive',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'mobile',
              title: 'Mobile',
              type: 'image',
              fieldset: 'image',
            }),
            defineField({
              name: 'tablet',
              title: 'Tablet',
              type: 'image',
              fieldset: 'image',
            }),
          ]
        : []),
    ],
  });

export default defineImage;
