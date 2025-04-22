import { DotIcon } from '@sanity/icons';

import type { BlockListDefinition } from 'sanity';

const listOptions = [
  { title: 'Bullet', value: 'bullet', icon: <DotIcon /> },
  { title: 'Numbered', value: 'number' },
] as BlockListDefinition[];

export type ListOptions = (typeof listOptions)[number]['value'];

export default listOptions;
