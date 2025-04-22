import { z } from 'groqd';

import { hasArrayValues } from '@packages/utils/src/arrays';

import { sectionFragment } from 'molecules/section';

import { resourceCardFragment } from 'organisms/cards/resource';
import Heading, { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type ResourceCardDeckFragment = InferFragmentType<typeof resourceCardDeckFragment>;

const ResourceCardDeck: FC<ResourceCardDeckFragment> = ({ heading, cards }) => (
  <div className="flex flex-col gap-6 sm:gap-12 lg:gap-16">
    <Heading {...heading} alignment="left" size="lg" />
    {hasArrayValues(cards) && (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-col">
        <div className="">Card</div>
      </div>
    )}
  </div>
);

type ResourceCardDeckQuery = ExtractSanityType<Page, 'resourceCardDeck'>;
export const resourceCardDeckFragment = q.fragment<ResourceCardDeckQuery>().project(cardDeck => ({
  _key: z.string(),
  heading: cardDeck.field('heading').project(headingFragment).nullable(true),
  cards: cardDeck.field('cards[]').deref().project(resourceCardFragment).nullable(true),
  ...sectionFragment,
}));

export default ResourceCardDeck;
