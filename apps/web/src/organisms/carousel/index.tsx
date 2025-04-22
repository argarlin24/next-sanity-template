'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { createContext, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Button from 'molecules/button';

import onKeyDown from 'utils/onKeyDown';

import type { CarouselApi, CarouselContextProps, CarouselProps } from 'organisms/carousel/types';
import type { ComponentProps, FC, KeyboardEvent } from 'react';

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) throw new Error('useCarousel must be used within a <Carousel />');

  return context;
};

const Carousel: FC<ComponentProps<'div'> & CarouselProps> = ({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) => {
  const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins,
    ),
    [canScrollPrev, setCanScrollPrev] = useState(false),
    [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = (onSelectApi: CarouselApi) => {
      if (!onSelectApi) return;

      setCanScrollPrev(onSelectApi.canScrollPrev());
      setCanScrollNext(onSelectApi.canScrollNext());
    },
    scrollPrev = () => {
      api?.scrollPrev();
    },
    scrollNext = () => {
      api?.scrollNext();
    },
    handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown(event, scrollPrev, ['ArrowLeft']);
      onKeyDown(event, scrollNext, ['ArrowRight']);
    };

  useEffect(() => {
    if (!api || !setApi) return;

    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={twMerge('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};
Carousel.displayName = 'Carousel';

const CarouselContent: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={twMerge('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  );
};
CarouselContent.displayName = 'CarouselContent';

const CarouselItem: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={twMerge(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  );
};
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious: FC<ComponentProps<typeof Button>> = ({
  className,
  hierarchy = 'outline',
  icon = 'arrow-left',
  ...props
}) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      hierarchy={hierarchy}
      icon={icon}
      iconOnly
      label="Previous slide"
      className={className}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    />
  );
};
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext: FC<ComponentProps<typeof Button>> = ({
  className,
  hierarchy = 'outline',
  icon = 'arrow-right',
  ...props
}) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      hierarchy={hierarchy}
      icon={icon}
      iconOnly
      label="Next slide"
      className={className}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    />
  );
};
CarouselNext.displayName = 'CarouselNext';

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
