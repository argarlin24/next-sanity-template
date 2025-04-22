import { type InferFragmentType, z } from 'groqd';

import { buttonFragment } from 'molecules/button';
import { linkFragment } from 'molecules/link';

import { q } from 'lib/client';

import type { IconIds } from '@packages/ui';
import type { ExtractSanityType } from 'types/global';
import type { Navigation } from 'types/sanity.types';

type NavItemQuery = StripArray<StripMaybe<ExtractSanityType<Navigation, 'menu', 'menu', 'menus'>>>;
const navItemFragment = q.fragment<NavItemQuery>().project(navItem => ({
  icon: navItem.field('icon').as<IconIds>().nullable(),
  link: navItem.field('link').project(linkFragment).nullable(true),
  description: z.string().optional().nullable(),
}));

type MenuQuery = ExtractSanityType<Navigation, 'menu', undefined, 'menus'>;
const menuFragment = q.fragment<MenuQuery>().project(menu => ({
  _type: z.literal('menu'),
  _key: z.string(),
  label: z.string().optional().nullable(),
  menu: menu
    .field('menu[]')
    .project({ _key: z.string(), ...navItemFragment })
    .nullable(true),
}));

export const navigationFragment = q.fragmentForType<'navigation'>().project(nav => ({
  menus: nav.field('menus[]').project(menus => ({
    ...menus.conditionalByType({
      menu: menuFragment,
      link: { _key: z.string(), _type: z.literal('link'), ...linkFragment },
    }),
  })),
  buttons: nav
    .field('buttons[]')
    .project(button => ({
      ...button.conditionalByType({
        button: buttonFragment,
      }),
    }))
    .nullable(true),
}));

export type NavItemFragment = InferFragmentType<typeof navItemFragment>;
export type MenuFragment = InferFragmentType<typeof menuFragment>;
export type NavigationFragment = InferFragmentType<typeof navigationFragment>;
