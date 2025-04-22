import { Content, Item, Root, Trigger } from '@radix-ui/react-accordion';
import { z } from 'groqd';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Icon from 'molecules/icon';

import RichText, { richTextFragment } from 'organisms/richText';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

export type AccordionItemFragment = InferFragmentType<typeof accordionItemFragment>;
export interface AccordionOrganismProps {
  items: AccordionItemFragment[];
}

const AccordionOrganism: FC<AccordionOrganismProps> = ({ items }) => (
  <Root type="single" collapsible className="flex w-full flex-col gap-4">
    {hasArrayValues(items) &&
      items.map(item => (
        <Item key={item._key} value={item._key} className="p-4 focus-outline-primary">
          <Trigger className="group flex w-full items-center justify-between gap-4 outline-hidden">
            <span className="block w-fit px-4 py-2 text-left">{item.label}</span>
            <span className="flex size-8 shrink-0 grow-0 basis-8 items-center justify-center">
              <Icon icon="chevron-down" size={16} className="transition-transform group-data-[state=open]:rotate-180" />
            </span>
          </Trigger>
          <Content className="overflow-hidden data-[state=closed]:animate-accordion-slide-up data-[state=open]:animate-accordion-slide-down">
            <div className="mt-4 px-3 py-2">{item.content && <RichText blocks={item.content} />}</div>
          </Content>
        </Item>
      ))}
  </Root>
);

type AccordionItem = StripMaybe<StripArray<ExtractSanityType<Page, 'accordion', 'items'>>>;
export const accordionItemFragment = q.fragment<AccordionItem>().project(accordionItem => ({
  _key: z.string(),
  _type: z.literal('accordionItem'),
  label: z.string().optional().nullable(),
  content: accordionItem.field('content[]').project(richTextFragment),
}));

export default AccordionOrganism;
