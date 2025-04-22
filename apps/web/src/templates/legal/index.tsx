import { hasArrayValues } from '@packages/utils/src/arrays';

import Section from 'molecules/section';

import RichText, { articleFragment, richTextFragment } from 'organisms/richText';

import CenteredHero from 'components/hero/variations/centered';

import { q } from 'lib/client';

import ComponentGenerator, { componentGeneratorWithSymbolsFragment } from 'utils/componentGenerator';

import type { InferResultType } from 'groqd';
import type { FC } from 'react';

export const legalQuery = q
  .parameters<{ slug: string }>()
  .star.filterByType('legal')
  .filterBy('seo.slug.current == $slug')
  .project(legal => ({
    postTitle: legal.field('postTitle[]').project(richTextFragment),
    subtitle: legal.field('subtitle[]').project(richTextFragment),
    content: legal.field('content[]').project(articleFragment),
    body: legal.field('body[]').project(componentGeneratorWithSymbolsFragment),
  }));

type LegalTemplateProps = StripArray<InferResultType<typeof legalQuery>>;

const LegalTemplate: FC<LegalTemplateProps> = ({ postTitle, subtitle, content, body }) => (
  <>
    <Section padding={{ top: 'lg', bottom: 'md' }}>
      <CenteredHero heading={{ heading: postTitle, body: subtitle }} />
    </Section>
    {hasArrayValues(content) && (
      <Section>
        <RichText
          blocks={content}
          additionalHeadingStyles="text-mud-950 pt-6"
          className="text-mud-800 mx-auto max-w-[800px] font-inter text-rich-body"
        />
      </Section>
    )}
    <ComponentGenerator sections={body} />
  </>
);

export default LegalTemplate;
