import Image, { imageFragment } from 'molecules/image';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { ImageProps } from 'molecules/image';
import type { PortableTextTypeComponentProps } from 'next-sanity';
import type { ExtractSanityType } from 'types/global';
import type { Blog } from 'types/sanity.types';

export type RichImageFragment = InferFragmentType<typeof richImageFragment>;

const RichImage = ({ value }: PortableTextTypeComponentProps<RichImageFragment>) => (
  <figure className="flex flex-col gap-4">
    {value && <Image {...(value as unknown as ImageProps)} className="w-full overflow-hidden rounded-sm" />}
  </figure>
);

type RichImageQuery = ExtractSanityType<Blog, 'richImage', undefined, 'content'>;
export const richImageFragment = q.fragment<RichImageQuery>().project({
  _type: q.literal('richImage'),
  _key: q.string(),
  asset: imageFragment.asset,
  alt: imageFragment.alt,
  responsive: imageFragment.responsive,
  mobile: imageFragment.mobile,
  tablet: imageFragment.tablet,
});

export default RichImage;
