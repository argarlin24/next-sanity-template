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
    {value && <Image {...(value as ImageProps)} className="w-full overflow-hidden rounded-sm" />}
    {value.caption && <figcaption className="">{value.caption}</figcaption>}
  </figure>
);

type RichImageQuery = ExtractSanityType<Blog, 'richImage', undefined, 'content'>;
export const richImageFragment = q.fragment<RichImageQuery>().project({
  _type: q.literal('richImage'),
  _key: q.string(),
  ...imageFragment,
});

export default RichImage;
