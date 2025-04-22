import { cva } from 'class-variance-authority';

const DEFAULT_ALIGNMENT = 'center';

export const headingStyles = cva('flex flex-col gap-4', {
  variants: {
    alignment: {
      left: 'items-start',
      center: 'items-center text-center',
    },
  },
  defaultVariants: {
    alignment: DEFAULT_ALIGNMENT,
  },
});

export const headingSizeStyles = cva('', {
  variants: {
    size: {
      sm: 'text-display-xs sm:text-display-sm',
      md: 'text-display-sm sm:text-display-md',
      lg: 'text-display-md sm:text-display-lg',
      xl: 'text-display-md sm:text-display-lg lg:text-display-xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export const bodyStyles = '';

export const buttonContainerStyles = cva('mt-2 flex w-full flex-wrap items-start gap-x-6 gap-y-3 sm:mt-4', {
  variants: {
    alignment: {
      left: 'justify-start',
      center: 'justify-center text-center',
    },
  },
  defaultVariants: {
    alignment: DEFAULT_ALIGNMENT,
  },
});
