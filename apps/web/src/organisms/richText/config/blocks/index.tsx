import { twJoin } from 'tailwind-merge';

import RichHeading from 'organisms/richText/config/components/richHeading';

import type { PortableTextComponents } from 'next-sanity';

const block = (additionalHeadingStyles?: string, customHeaderStyles?: boolean): PortableTextComponents['block'] => ({
  h1: ({ children }) => (
    <RichHeading
      level={1}
      className={twJoin(!customHeaderStyles && 'text-rich-h1 font-bold', additionalHeadingStyles)}
      preventObserver
    >
      {children}
    </RichHeading>
  ),
  h2: ({ children }) => (
    <RichHeading level={2} className={twJoin(!customHeaderStyles && 'text-rich-h2 font-bold', additionalHeadingStyles)}>
      {children}
    </RichHeading>
  ),
  h3: ({ children }) => (
    <RichHeading level={3} className={twJoin(!customHeaderStyles && 'text-rich-h3 font-bold', additionalHeadingStyles)}>
      {children}
    </RichHeading>
  ),
  h4: ({ children }) => (
    <RichHeading
      level={4}
      className={twJoin(!customHeaderStyles && 'text-rich-h4 font-bold', additionalHeadingStyles)}
      preventObserver
    >
      {children}
    </RichHeading>
  ),
  h5: ({ children }) => (
    <RichHeading
      level={5}
      className={twJoin(!customHeaderStyles && 'text-rich-h5 font-bold', additionalHeadingStyles)}
      preventObserver
    >
      {children}
    </RichHeading>
  ),
  h6: ({ children }) => (
    <RichHeading
      level={6}
      className={twJoin(!customHeaderStyles && 'text-rich-h6 font-bold', additionalHeadingStyles)}
      preventObserver
    >
      {children}
    </RichHeading>
  ),
  blockquote: ({ children }) => <blockquote className="">{children}</blockquote>,
  normal: ({ children }) => <p className="">{children}</p>,
});

export default block;
