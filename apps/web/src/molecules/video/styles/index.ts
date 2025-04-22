import { cva } from 'class-variance-authority';

const videoStyles = cva('absolute inset-0 size-full overflow-hidden rounded-lg', {
  variants: {
    noAspect: {
      true: 'h-full object-cover [&_lite-youtube]:h-full [&>div]:h-full!',
      false: 'aspect-video',
    },
  },
  defaultVariants: {
    noAspect: false,
  },
});

export default videoStyles;
