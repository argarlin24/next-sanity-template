import { cva } from 'class-variance-authority';

export const mediaContainerStyle = cva('relative col-span-1 flex h-full items-center lg:col-span-6 lg:row-start-1', {
  variants: {
    reverse: {
      true: 'lg:col-start-7',
      false: 'lg:col-start-1',
    },
  },
  defaultVariants: {
    reverse: false,
  },
});

export const headingContainerStyle = cva('col-span-1 row-start-1 flex h-full items-center lg:col-span-6', {
  variants: {
    reverse: {
      true: 'lg:col-start-1',
      false: 'lg:col-start-7',
    },
  },
  defaultVariants: {
    reverse: false,
  },
});
