import { toHTML } from '@portabletext/to-html';

import type { AccordionItemFragment } from 'organisms/accordion';

export const getFaqSchema = (accordionItems: AccordionItemFragment[], schemaName?: string | null) => {
  const Accordion = accordionItems.map(item => ({
    '@type': 'Question',
    name: item?.label || '',
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.content ? toHTML(item.content) : '',
    },
  }));

  return {
    name: schemaName || 'Frequently Asked Questions',
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [Accordion],
  };
};
