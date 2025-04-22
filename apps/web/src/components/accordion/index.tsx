import { z } from 'groqd';

import { hasArrayValues } from '@packages/utils/src/arrays';

import { sectionFragment } from 'molecules/section';

import AccordionOrganism, { accordionItemFragment } from 'organisms/accordion';
import Heading, { headingFragment } from 'organisms/heading';

import { getFaqSchema } from 'components/accordion/utils/getFaqSchema';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type AccordionFragment = InferFragmentType<typeof accordionFragment>;

const Accordion: FC<AccordionFragment> = ({ heading, items }) => {
  const faqSchema = hasArrayValues(items) && getFaqSchema(items);

  return (
    <>
      {faqSchema && Object.keys(faqSchema).length && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      <div className="flex w-full flex-col gap-12">
        <Heading {...heading} alignment="left" />
        {hasArrayValues(items) && <AccordionOrganism items={items} />}
      </div>
    </>
  );
};

type AccordionQuery = ExtractSanityType<Page, 'accordion'>;
export const accordionFragment = q.fragment<AccordionQuery>().project(accordion => ({
  _key: z.string(),
  heading: accordion.field('heading').project(headingFragment).nullable(true),
  items: accordion.field('items[]').project(accordionItemFragment).nullable(true),
  includeSchema: z.boolean().nullable(),
  ...sectionFragment,
}));

export default Accordion;
