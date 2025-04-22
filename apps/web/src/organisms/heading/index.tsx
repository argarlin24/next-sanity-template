import { z } from 'groqd';

import { hasArrayValues } from '@packages/utils/src/arrays';

import Button, { buttonFragment } from 'molecules/button';

import { bodyStyles, buttonContainerStyles, headingSizeStyles, headingStyles } from 'organisms/heading/styles';
import RichText, { richTextFragment } from 'organisms/richText';

import { q } from 'lib/client';

import type { VariantProps } from 'class-variance-authority';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

export type HeadingFragment = InferFragmentType<typeof headingFragment>;
export interface HeadingProps
  extends Maybify<Omit<HeadingFragment, 'heading' | 'body' | 'badge'>>,
    VariantProps<typeof headingSizeStyles> {
  alignment?: 'left' | 'center' | null;
  heading?: string | HeadingFragment['heading'];
  body?: string | HeadingFragment['body'];
  children?: React.ReactNode;
  headingTag?: 'h1' | 'h2' | 'h3';
}

const generateHeadingTag = <T extends StripMaybe<HeadingFragment['heading']>>(
  heading: T,
  style?: 'h1' | 'h2' | 'h3',
) => [{ ...heading[0], style: style || 'h2' }];

const Heading: FC<HeadingProps> = ({ alignment, eyebrow, heading, body, size, buttons, children, headingTag }) =>
  (heading || eyebrow || body) && (
    <div className={headingStyles({ alignment })}>
      {eyebrow && <span className="">{eyebrow}</span>}
      {heading &&
        (typeof heading === 'string' ? (
          <h1 className={headingSizeStyles({ size })}>{heading}</h1>
        ) : (
          <RichText
            blocks={generateHeadingTag(heading, headingTag)}
            customHeaderStyles
            className={headingSizeStyles({ size })}
          />
        ))}
      {body &&
        (typeof body === 'string' ? (
          <p className={bodyStyles}>{body}</p>
        ) : (
          <RichText blocks={body} className={bodyStyles} />
        ))}
      {hasArrayValues(buttons) && (
        <div className={buttonContainerStyles({ alignment })}>
          {buttons.map(button => button._type === 'button' && <Button key={button._key} {...button} />)}
        </div>
      )}
      {children}
    </div>
  );

type HeadingQuery = StripMaybe<ExtractSanityType<Page, 'heading', 'heading'>>;
export const headingFragment = q.fragment<HeadingQuery>().project(heading => ({
  eyebrow: z.string().optional().nullable(),
  heading: heading.field('heading[]').project(richTextFragment),
  body: heading.field('body[]').project(richTextFragment),
  buttons: heading
    .field('buttons[]')
    .project(button => ({
      ...button.conditionalByType({
        button: buttonFragment,
      }),
    }))
    .nullable(true),
}));

export default Heading;
