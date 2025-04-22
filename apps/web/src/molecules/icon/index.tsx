import { twMerge } from 'tailwind-merge';

import { iconSet } from '@packages/ui';

import { q } from 'lib/client';

import type { IconIds, IconProps } from '@packages/ui';
import type { FC } from 'react';

const generateIconColorClasses = (iconColor: string) => `fill-${iconColor} stroke-${iconColor}`;

const Icon: FC<IconProps> = ({ icon, size, label, iconColor, className, ...props }) =>
  iconSet.has(icon) && (
    <svg
      width={size || 24}
      height={size || 24}
      aria-label={icon}
      focusable="false"
      role={label ? 'img' : undefined}
      aria-hidden={!label}
      className={twMerge(iconColor ? generateIconColorClasses(iconColor) : 'icon-current', className)}
      {...props}
    >
      {label && <title>{label}</title>}
      <use href={`/icons/sprites.svg#${icon}`} />
    </svg>
  );

export const iconFragment = q.fragment<FragmentAny>().project(icon => ({
  icon: icon.field('icon').as<IconIds>(),
}));

export default Icon;
