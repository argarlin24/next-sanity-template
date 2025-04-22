import { z } from 'groqd';

import { sectionFragment } from 'molecules/section';

import HeadingOrganism, { headingFragment } from 'organisms/heading';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type HeadingFragment = InferFragmentType<typeof headingComponentFragment>;

const Heading: FC<HeadingFragment> = ({ heading, alignment }) => <HeadingOrganism alignment={alignment} {...heading} />;

type HeadingQuery = ExtractSanityType<Page, 'heading'>;
export const headingComponentFragment = q.fragment<HeadingQuery>().project(heading => ({
  _key: z.string(),
  heading: heading.field('heading').project(headingFragment).nullable(true),
  alignment: z
    .union([z.literal('left'), z.literal('center')])
    .optional()
    .nullable(),
  ...sectionFragment,
}));

export default Heading;
