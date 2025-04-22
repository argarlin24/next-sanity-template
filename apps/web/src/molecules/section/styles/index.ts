import { cva } from 'class-variance-authority';

import { sectionBgClasses, sectionVariations } from '@packages/ui';
import { objectKeys } from '@packages/utils/src/typeUtils';

const sectionStyles = cva('relative scroll-mt-16', {
  variants: {
    noContain: {
      true: '',
      false: 'contain-content',
    },
    bgColor: sectionBgClasses,
    overrideThemeMode: {
      true: '',
    },
  },
  defaultVariants: {
    noContain: false,
    bgColor: 'light',
  },
});

export const wrapperStyles = cva('mx-auto max-w-(--breakpoint-xl) px-4 sm:px-16 lg:px-8', {
  variants: {
    top: sectionVariations.top,
    bottom: sectionVariations.bottom,
  },
  defaultVariants: {
    top: 'lg',
    bottom: 'lg',
  },
});

export const paddingOptions = objectKeys(sectionVariations.top);

export default sectionStyles;
