import { cva } from 'class-variance-authority';

import { buttonVariations } from '@packages/ui';

const buttonVariants = cva(
  'flex w-full items-center justify-center whitespace-nowrap focus-outline-primary transition-colors sm:w-fit',
  {
    variants: {
      hierarchy: {
        ...buttonVariations,
      },
      noAnimate: {
        true: '',
      },
    },
    compoundVariants: [
      {
        hierarchy: ['primary'],
        class: '',
      },
      {
        hierarchy: ['outline'],
        class: '',
      },
      {
        hierarchy: ['link'],
        class: '',
      },
    ],
    defaultVariants: {
      hierarchy: 'primary',
    },
  },
);

export default buttonVariants;
