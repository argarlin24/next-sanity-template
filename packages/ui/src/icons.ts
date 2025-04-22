import type { SVGProps } from 'react';

export const buttonIds = [] as const;
export type ButtonIds = (typeof buttonIds)[number];

export const miscIds = [] as const;
export type MiscIds = (typeof miscIds)[number];

export const socialIds = [
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'chevron-down',
  'home',
  'info',
  'play',
] as const;
export type SocialIds = (typeof socialIds)[number];

export const iconSet = new Set([...buttonIds, ...miscIds, ...socialIds]);
export const iconIds = Array.from(iconSet);

export type IconIds = (typeof iconIds)[number];

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * Defines the props for an icon component.
   */
  icon: IconIds;
  /**
   * Defines the size and color properties for an icon component.
   */
  size?: number | `${number}%` | null;
  /**
   * Defines an optional label attribute for the icon component.
   */
  label?: string;
  /**
   * Defines the color of the icon component.
   */
  iconColor?: string;
}
