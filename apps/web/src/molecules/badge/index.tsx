import { z } from 'groqd';

import { badgeIconContainerStyles, badgeStyles } from 'molecules/badge/styles';
import Icon from 'molecules/icon';

import { q } from 'lib/client';

import type { IconIds } from '@packages/ui';
import type { VariantProps } from 'class-variance-authority';
import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

type BadgeQuery = Maybify<InferFragmentType<typeof BadgeQuery>>;
export type BadgeVariations = VariantProps<typeof badgeStyles>;

const BadgeIcon: FC<Pick<BadgeQuery, 'icon' | 'color'>> = ({ icon, color }) =>
  icon && (
    <div className={badgeIconContainerStyles({ color })}>
      <Icon icon={icon} size="100%" className="size-2.5 md:size-[14px]" />
    </div>
  );

const Badge: FC<BadgeQuery> = ({ color, label, icon, iconPosition }) => (
  <div className={badgeStyles({ color, iconPosition: icon && iconPosition ? iconPosition : undefined })}>
    {icon && iconPosition === 'start' && <BadgeIcon icon={icon} color={color} />}
    {label}
    {icon && iconPosition === 'end' && <BadgeIcon icon={icon} color={color} />}
  </div>
);

export const BadgeQuery = q.fragment<FragmentAny>().project(badge => ({
  label: z.string().optional(),
  color: badge.field('color').as<BadgeVariations['color']>(),
  icon: badge.field('icon').as<IconIds>(),
  iconPosition: z.union([z.literal('start'), z.literal('end')]),
}));

export default Badge;
