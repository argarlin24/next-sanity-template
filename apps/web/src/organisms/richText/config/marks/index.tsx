import Link, { externalLinkFragment, internalLinkFragment } from 'molecules/link';

import { q } from 'lib/client';

import type { ExternalLinkQuery, InternalLinkQuery } from 'molecules/link';
import type { PortableTextComponents } from 'next-sanity';

const linkStyles =
  'text-cool-500 underline transition-colors hover:text-creek-950 focus-outline-primary dark:text-cool-200 dark:hover:text-cool-50';

const marks = {
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  underline: ({ children }) => <u>{children}</u>,
  code: ({ children }) => <code>{children}</code>,
  internalLink: ({ children, value }) => {
    const slug = value?.link?.slug || value?.slug;

    return (
      <Link href={`/${slug}`} className="">
        {children}
      </Link>
    );
  },
  link: ({ children, value }) => (
    <Link href={value?.href} className={linkStyles}>
      {children}
    </Link>
  ),
} satisfies PortableTextComponents['marks'];

type InternalRichLinkQuery = InternalLinkQuery & { _key: string };
export const internalRichLinkFragment = q.fragment<InternalRichLinkQuery>().project({
  _key: q.string().optional().nullable(),
  ...internalLinkFragment,
});

type ExternalRichLinkQuery = ExternalLinkQuery & { _key: string };
export const externalRichLinkFragment = q.fragment<ExternalRichLinkQuery>().project({
  _key: q.string().optional().nullable(),
  ...externalLinkFragment,
});

export default marks;
