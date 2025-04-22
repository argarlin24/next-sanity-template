import { z } from 'groqd';
import { twMerge } from 'tailwind-merge';

import buttonVariants from 'molecules/button/styles';
import Icon, { iconFragment } from 'molecules/icon';
import { linkFragment } from 'molecules/link';

import { q } from 'lib/client';

import parseUrl, { ensureLeadingSlash } from 'utils/parseUrl';

import type { IconIds } from '@packages/ui';
import type { VariantProps } from 'class-variance-authority';
import type { InferFragmentType } from 'groqd';
import type { LinkFragment } from 'molecules/link';
import type { ElementType, FC, MouseEventHandler } from 'react';
import type { Navigation } from 'types/sanity.types';

type ButtonFragment = InferFragmentType<typeof buttonFragment>;
type ButtonVariations = VariantProps<typeof buttonVariants>;
export interface ButtonProps extends StripMetaProps<Omit<ButtonFragment, 'link' | 'hierarchy'>> {
  /**
   * An optional CSS class name to apply to the button component.
   */
  className?: string;
  /**
   * The optional hierarchy of the button, which determines its visual style. Can be a key from the `buttonVariations` object or the string `'primaryNoDark'`.
   */
  hierarchy?: ButtonFragment['hierarchy'];
  /**
   * The optional fallback element type to use for the button, if no link is provided.
   */
  semanticFallback?: ElementType;
  /**
   * The optional label for the button.
   */
  label?: string;
  /**
   * Indicates whether the button should be disabled and not interactive.
   */
  disabled?: boolean;
  /**
   * An optional click event handler for the button component.
   */
  onClick?: MouseEventHandler<HTMLElement>;
  /**
   * The optional link data for the button component.
   * This can be a string representing a URL or an object with more detailed link properties.
   */
  link?: LinkFragment | null;
  /**
   * The `type` prop specifies the type of the button element. It can be one of the following values:
   * - `'button'`: Renders a standard button element.
   * - `'submit'`: Renders a button that submits a form when clicked.
   * - `'reset'`: Renders a button that resets the form when clicked.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Indicates whether the button should not animate when clicked.
   */
  noAnimate?: boolean;
  /**
   * An optional unique identifier for the button component.
   */
  id?: string;
  /**
   * Indicates whether the button should only display an icon and no text.
   */
  iconOnly?: boolean;
}

export const getLinkData = (link?: LinkFragment | null) => {
  if (!link) return '';

  if (typeof link === 'string') return link;

  switch (link?.type) {
    case 'internalLink':
      return ensureLeadingSlash(link.internalLink?.link || '');
    case 'link':
      return link.link?.href;
  }
};

export const ButtonIcon: FC<{ icon: IconIds }> = ({ icon }) =>
  icon && <Icon icon={icon} className="transition-transform" size={24} />;

const Button: FC<Maybify<ButtonProps>> = ({
  link,
  label,
  hierarchy,
  icon,
  iconPosition,
  iconOnly,
  className,
  semanticFallback,
  type,
  noAnimate,
  ...props
}) => {
  const { as: Component, ...urlProps } = parseUrl(getLinkData(link) || '', semanticFallback || 'button');

  return (
    <Component
      className={twMerge(buttonVariants({ hierarchy, noAnimate: !!noAnimate }), className)}
      type={type}
      {...urlProps}
      {...props}
    >
      {icon && iconPosition === 'start' && <ButtonIcon icon={icon} />}
      <span className={iconOnly ? 'sr-only' : ''}>{label || (typeof link !== 'string' && link?.label)}</span>
      {icon && iconPosition === 'end' && <ButtonIcon icon={icon} />}
    </Component>
  );
};

type ButtonQuery = StripMaybe<StripArray<Navigation['buttons']>>;
export const buttonFragment = q.fragment<ButtonQuery>().project(button => ({
  _type: z.literal('button'),
  _key: z.string().optional(),
  ...iconFragment,
  iconPosition: z
    .union([z.literal('start'), z.literal('end')])
    .optional()
    .nullable(),
  hierarchy: button.field('hierarchy').as<ButtonVariations['hierarchy']>(),
  link: button.field('link').project(linkFragment),
}));

export default Button;
