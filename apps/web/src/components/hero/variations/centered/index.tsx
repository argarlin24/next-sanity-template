import Breadcrumbs from 'molecules/breadcrumbs';
import Image from 'molecules/image';

import Heading from 'organisms/heading';

import type { HeroFragment } from 'components/hero';
import type { FC } from 'react';

type CenteredHeroProps = Maybify<StripSectionProps<Omit<HeroFragment, 'bgImage' | 'form' | 'variation'>>>;

const CenteredHero: FC<CenteredHeroProps> = ({ heading, featuredImage, disableBreadcrumbs }) => (
  <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
    {!disableBreadcrumbs && <Breadcrumbs />}
    <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-14">
      <Heading {...heading} size="xl" alignment="center" headingTag="h1" />
      {featuredImage && <Image {...featuredImage} objectCover className="w-full overflow-hidden rounded-lg" />}
    </div>
  </div>
);

export default CenteredHero;
