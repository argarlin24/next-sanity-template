import Breadcrumbs from 'molecules/breadcrumbs';
import Image from 'molecules/image';

import Heading from 'organisms/heading';

import type { HeroFragment } from 'components/hero';
import type { FC } from 'react';

type LeftAlignedHeroProps = Maybify<StripSectionProps<Omit<HeroFragment, 'bgImage' | 'variation'>>>;

const LeftAlignedHero: FC<LeftAlignedHeroProps> = ({ heading, featuredImage, disableBreadcrumbs }) => (
  <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
    {!disableBreadcrumbs && <Breadcrumbs />}
    <div className="flex flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:gap-8">
      <Heading {...heading} size="xl" alignment="left" headingTag="h1" />
      {featuredImage && (
        <Image
          {...featuredImage}
          className="block aspect-video w-full overflow-hidden rounded-lg lg:aspect-square lg:max-w-[50%]"
          objectCover
        />
      )}
    </div>
  </div>
);

export default LeftAlignedHero;
