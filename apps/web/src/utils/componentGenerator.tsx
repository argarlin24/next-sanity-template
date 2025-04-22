import dynamic from 'next/dynamic';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Section from 'molecules/section';
import { splitSectionProps } from 'molecules/section/utils';

import { accordionFragment } from 'components/accordion';
import { resourceCardDeckFragment } from 'components/cardDeck/resource';
import { headingComponentFragment } from 'components/heading';
import { heroFragment } from 'components/hero';
import { switchbackFragment } from 'components/switchback';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { Page } from 'types/sanity.types';

const Accordion = dynamic(() => import('components/accordion')),
  Heading = dynamic(() => import('components/heading')),
  Hero = dynamic(() => import('components/hero')),
  ResourceCardDeck = dynamic(() => import('components/cardDeck/resource')),
  Switchback = dynamic(() => import('components/switchback'));

export type ComponentProps = InferFragmentType<typeof componentGeneratorFragment>;
export type ComponentPropsWithSymbols = InferFragmentType<typeof componentGeneratorWithSymbolsFragment>;

interface componentGeneratorProps {
  sections: ComponentPropsWithSymbols[] | null;
}

const getComponent = (component: ComponentProps) => {
  switch (component._type) {
    case 'accordion':
      return <Accordion {...component} />;
    case 'heading':
      return <Heading {...component} />;
    case 'hero':
      return <Hero {...component} />;
    case 'resourceCardDeck':
      return <ResourceCardDeck {...component} />;
    case 'switchback':
      return <Switchback {...component} />;
    default:
      return null;
  }
};

const ComponentGenerator: FC<componentGeneratorProps> = ({ sections }) => {
  if (hasArrayValues(sections))
    return (
      <>
        {hasArrayValues(sections) &&
          sections.map(section => {
            if (!('_key' in section) && !('_id' in section))
              throw new Error(`Invalid section type: ${section._type} or missing _key in query`);

            const { sectionProps, rest } = splitSectionProps(section),
              key = '_key' in section ? section._key : section._id;

            return section._type === 'symbol' ? (
              section.content && <ComponentGenerator key={key} sections={section.content} />
            ) : (
              <Section key={key} {...sectionProps}>
                {getComponent(rest)}
              </Section>
            );
          })}
      </>
    );

  return null;
};

export type PageBody = Page['body'];

export const componentGeneratorCondition = {
  accordion: accordionFragment,
  heading: headingComponentFragment,
  hero: heroFragment,
  resourceCardDeck: resourceCardDeckFragment,
  switchback: switchbackFragment,
};

const symbolFragment = q.fragmentForType<'symbol'>().project(body => ({
  _id: q.string(),
  name: q.string().optional().nullable(),
  content: body.field('content[]').project(content => ({ ...content.conditionalByType(componentGeneratorCondition) })),
}));

export const componentGeneratorConditionWithSymbol = {
  ...componentGeneratorCondition,
  symbol: symbolFragment,
  symbolReference: {
    _type: q.literal('symbolReference'),
    _key: q.string(),
    // @ts-expect-error ts having a hard time with conditional derefs
    symbolReference: q.raw('@->').project(symbolFragment),
  },
};

export const componentGeneratorFragment = q
    .fragment<PageBody>()
    .project(body => ({ ...body.conditionalByType(componentGeneratorCondition) })),
  componentGeneratorWithSymbolsFragment = q
    .fragment<PageBody>()
    .project(body => ({ ...body.conditionalByType(componentGeneratorConditionWithSymbol) }));

export default ComponentGenerator;
