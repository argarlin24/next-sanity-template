import { cva } from 'class-variance-authority';

import { badgeIconContainerVariations, badgeVariations } from '@packages/ui';

export const badgeStyles = cva('', {
  variants: {
    color: badgeVariations,
    iconPosition: {
      start: 'pl-1',
      end: 'pr-1',
    },
  },
});

export const badgeIconContainerStyles = cva('', {
  variants: {
    color: badgeIconContainerVariations,
  },
});
