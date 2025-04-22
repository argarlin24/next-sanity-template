/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaTable } from 'react-icons/fa6';
import { defineField } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import definePageComponent from '@/schemas/definitions/component';
import heading from '@/schemas/fields/heading';
import link from '@/schemas/fields/links';

import type { PortableTextTextBlock } from 'sanity';

const table = definePageComponent({
  name: 'table',
  title: 'Table',
  icon: FaTable,
  fields: [
    heading,
    defineField({
      name: 'columnHeadings',
      title: 'Column Headings',
      type: 'array',
      of: [
        {
          name: 'columnHeading',
          title: 'Column Heading',
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
            { name: 'isHighlighted', title: 'Highlighted', type: 'boolean' },
            link,
          ],
        },
      ],
      validation: rule =>
        rule.custom((colHeadings, context: any) => {
          const tableColumns = context.parent.table?.rows?.[0].cells;

          if (!hasArrayValues(colHeadings) || colHeadings.length !== tableColumns.length) {
            return 'Must match number of columns';
          }

          return true;
        }),
    }),
    defineField({
      name: 'rowHeadings',
      title: 'Row Headings',
      type: 'array',
      of: [
        {
          name: 'rowHeading',
          title: 'Row Heading',
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'tooltip', title: 'Tooltip', type: 'string' },
          ],
        },
      ],
      validation: rule =>
        rule.custom((rowHeadings, context: any) => {
          const tableRows = context.parent.table?.rows;

          if (!hasArrayValues(rowHeadings) || rowHeadings.length !== tableRows.length) {
            return 'Must match number of rows';
          }

          return true;
        }),
    }),
    defineField({
      name: 'table',
      title: 'Table',
      description: 'Add `!check` to display a check mark icon in the cell',
      type: 'table',
    }),
  ],
  preview: {
    select: {
      title: 'heading.heading',
    },
    prepare: ({ title }: Record<string, PortableTextTextBlock[]>) => {
      const firstBlock = (title || []).find(block => block._type === 'block');

      return {
        title: 'Table',
        subtitle: firstBlock
          ? firstBlock.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join('')
          : 'No title',
      };
    },
  },
});

export default table;
