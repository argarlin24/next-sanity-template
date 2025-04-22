import { z } from 'groqd';

import { q } from 'lib/client';

import parseUrl, { ensureLeadingSlash } from 'utils/parseUrl';
import customTwMerge from 'utils/twMerge';

import type { InferFragmentType } from 'groqd';
import type { ComponentPropsWithoutRef, FC } from 'react';
import type { Settings } from 'types/sanity.types';

export type LinkProps = Omit<ComponentPropsWithoutRef<'a'> & ComponentPropsWithoutRef<'div'>, 'href'> & {
  /**
   * The optional link data for the button component.
   * This can be a string representing a URL or an object with more detailed link properties.
   */
  href?: LinkFragment | string | null;
  /**
   * Indicates whether the link should be disabled and not interactive.
   */
  disableFocus?: boolean;
};
export const getLinkData = (link?: LinkFragment | string | null) => {
  if (!link) return '';

  if (typeof link === 'string') return link;

  switch (link?.type) {
    case 'internalLink':
      return ensureLeadingSlash(link.internalLink?.link || '');
    case 'link':
      return link.link?.href;
  }
};

const Link: FC<LinkProps> = ({ children, href, className, disableFocus, ...props }) => {
  const { as: Component, ...rest } = parseUrl(getLinkData(href) || '');

  return (
    <Component
      {...rest}
      {...props}
      className={customTwMerge(
        disableFocus ? 'outline-none' : 'dark:focus-outline-marine focus-outline-primary',
        className,
      )}
    >
      {children}
    </Component>
  );
};

type LinkQuery = StripMaybe<StripMaybe<StripArray<Settings['socials']>>['link']>;
export type InternalLinkQuery = StripMaybe<LinkQuery['internalLink']>;
export type ExternalLinkQuery = StripMaybe<LinkQuery['link']>;

export const internalLinkFragment = q.fragment<InternalLinkQuery>().project(link => ({
  link: link.field('reference').deref().field('seo').field('slug.current', z.string().nullable()),
  blank: z.boolean().optional().nullable(),
  alt: z.string().optional().nullable(),
}));

export const externalLinkFragment = q.fragment<ExternalLinkQuery>().project({
  href: z.string().optional().nullable(),
  alt: z.string().optional().nullable(),
});

export const linkFragment = q.fragment<LinkQuery>().project(sub => ({
  type: z
    .union([z.literal('link'), z.literal('internalLink')])
    .optional()
    .nullable(),
  label: z.string().optional().nullable(),
  internalLink: sub.field('internalLink').project(internalLinkFragment).nullable(true),
  link: z.object(externalLinkFragment).optional().nullable(),
}));

export type LinkFragment = InferFragmentType<typeof linkFragment>;

export default Link;
