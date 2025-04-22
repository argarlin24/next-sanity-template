import { z } from 'groqd';
import dynamic from 'next/dynamic';

import { imageFragment } from 'molecules/image';
import { sectionFragment } from 'molecules/section';

import { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { HeadingProps } from 'organisms/heading';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

const CenteredHero = dynamic(() => import('components/hero/variations/centered')),
  LeftAlignedHero = dynamic(() => import('components/hero/variations/leftAligned'));

export interface HeroFragment extends Omit<InferFragmentType<typeof heroFragment>, 'heading'> {
  heading: HeadingProps | null;
}

const Hero: FC<HeroFragment> = ({ variation, ...props }) => {
  switch (variation) {
    case 'centered':
      return <CenteredHero {...props} />;
    case 'leftAligned':
      return <LeftAlignedHero {...props} />;
    default:
      return null;
  }
};

type HeroQuery = ExtractSanityType<Page, 'hero'>;
export const heroFragment = q.fragment<HeroQuery>().project(hero => ({
  _key: z.string(),
  variation: z
    .union([z.literal('centered'), z.literal('leftAligned')])
    .optional()
    .nullable(),
  heading: hero.field('heading').project(headingFragment).nullable(true),
  featuredImage: hero.field('featuredImage').project(imageFragment).nullable(true),
  disableBreadcrumbs: z.boolean().optional().nullable(),
  ...sectionFragment,
}));

export default Hero;
