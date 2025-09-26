import { getImageDimensions } from '@sanity/asset-utils';
import { z } from 'groqd';
import NextImage from 'next/image';
import { twJoin, twMerge } from 'tailwind-merge';

import { q, urlFor } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { ImageProps as NextImageProps } from 'next/image';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page, SanityImageAsset } from 'types/sanity.types';

type ImageFragment = Omit<NonNullable<InferFragmentType<typeof imageFragment>>, '_key' | '_type'>;
export interface ImageProps
  extends ImageFragment,
    Pick<NextImageProps, 'height' | 'width' | 'className' | 'priority' | 'sizes'> {
  /**
   * The `aspectRatio` prop allows you to specify the aspect ratio of the image. The aspect ratio should be provided as a string in the format `"${number}/${number}"`, where the two numbers represent the width and height of the image, respectively.
   */
  aspectRatio?: `${number}/${number}`;
  /**
   * Determines whether the aspect ratio of the image should be unset, allowing the image to fill the container.
   */
  unsetRatio?: boolean;
  /**
   * Determines whether the image should override the default fill behavior and maintain its original aspect ratio.
   */
  noFill?: boolean;
  /**
   * Sets the object-fit property of the image to "cover".
   */
  objectCover?: boolean;
}

const Image: FC<ImageProps> = ({
  asset,
  aspectRatio,
  alt,
  noFill,
  height,
  width,
  objectCover,
  className,
  unsetRatio,
  responsive,
  mobile,
  tablet,
  sizes,
  ...props
}) => {
  const imgWidth = width || getImageDimensions(asset as SanityImageAsset).width,
    imgHeight = height || getImageDimensions(asset as SanityImageAsset).height,
    buildSrc = (image: SanityImageAsset) =>
      image.extension === 'svg' ? urlFor(image).url() : urlFor(image).auto('format').url();

  return (
    <picture
      className={twMerge('relative block', className)}
      style={{
        aspectRatio: unsetRatio
          ? undefined
          : aspectRatio || getImageDimensions(asset as SanityImageAsset).aspectRatio || `${width}/${height}`,
      }}
    >
      {responsive && (
        <>
          {mobile && <source srcSet={buildSrc(mobile.asset)} media="(max-width: calc(40em - 1px))" />}
          {tablet && <source srcSet={buildSrc(tablet.asset)} media="(max-width: calc(64em - 1px))" />}
        </>
      )}
      <NextImage
        src={buildSrc(asset)}
        alt={alt || ''}
        title={alt || ''}
        fill={!noFill}
        width={noFill ? imgWidth : undefined}
        height={noFill ? imgHeight : undefined}
        placeholder={asset?.metadata?.blurHash ? 'blur' : 'empty'}
        blurDataURL={asset?.metadata?.blurHash ?? undefined}
        className={twJoin(objectCover && 'size-full object-cover')}
        sizes={sizes || '(max-width: 64em) 100vw, 1280px'}
        {...props}
      />
    </picture>
  );
};

export type ImageQuery = StripMaybe<ExtractSanityType<Page, 'hero', 'featuredImage'>>
export const imageNoMetaFragment = q.fragment<ImageQuery>().project(image => ({
  asset: image
    .field('asset')
    .deref()
    .validate(
      z.object({
        _id: z.string(),
        _type: z.literal('sanity.imageAsset'),
        _createdAt: z.string(),
        _updatedAt: z.string(),
        _rev: z.string(),
        url: z.string().optional(),
        extension: z.string().optional(),
        metadata: z
          .object({
            _type: z.literal('sanity.imageMetadata'),
            dimensions: z
              .object({
                _type: z.literal('sanity.imageDimensions'),
                aspectRatio: z.number().optional(),
                height: z.number().optional(),
                width: z.number().optional(),
              })
              .optional(),
            blurHash: z.string().optional(),
          })
          .optional(),
      }),
    ),
}));

export const imageFragment = q.fragment<ImageQuery>().project(image => ({
  ...imageNoMetaFragment,
  alt: z.string().optional().nullable(),
  responsive: z.boolean().optional().nullable(),
  mobile: image.field('mobile').project(imageNoMetaFragment).nullable(true),
  tablet: image.field('tablet').project(imageNoMetaFragment).nullable(true),
}));

export default Image;
