import { objectEntries } from '@packages/utils/src/typeUtils';

import accordion from '@/schemas/components/accordion';
import heading from '@/schemas/components/heading';
import hero from '@/schemas/components/hero';
import resourceCardDeck from '@/schemas/components/resourceCardDeck';
import switchback from '@/schemas/components/switchback';
import { symbolReference } from '@/schemas/documents/symbol/reference';

import type { InsertMenuOptions, ObjectDefinition, ReferenceDefinition } from 'sanity';

type ComponentTypes = 'Intro' | 'Block' | 'Deck' | 'Reusable' | 'Singleton';
type MenuGroups = InsertMenuOptions['groups'];

interface ComponentSchema {
  type: ComponentTypes;
  component: ObjectDefinition | ReferenceDefinition;
}

const componentSchemas = {
  accordion: { type: 'Block', component: accordion },
  hero: { type: 'Intro', component: hero },
  heading: { type: 'Block', component: heading },
  // listing: { type: 'Singleton', component: listing },
  resourceCardDeck: { type: 'Deck', component: resourceCardDeck },
  // testimonials: { type: 'Block', component: testimonials },
  switchback: { type: 'Block', component: switchback },
  // table: { type: 'Block', component: table },
  symbol: {
    type: 'Reusable',
    component: symbolReference,
  },
} as Record<string, ComponentSchema>;

export const components = Object.values(componentSchemas).map(({ component }) => component);
export const componentsByType = objectEntries(componentSchemas).reduce(
  (acc, [key, { type }]) => {
    const typeIndex = acc && acc.findIndex(group => group.name === type);

    if (typeIndex >= 0) {
      acc[typeIndex].of?.push(key);

      return acc;
    }

    return [...acc, { name: type, title: type, of: [key] }];
  },
  [] as Exclude<MenuGroups, undefined | null | never>,
);

export default componentSchemas;
