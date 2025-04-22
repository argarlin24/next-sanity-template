import { z } from 'groqd';

import Image, { imageFragment } from 'molecules/image';
import { sectionFragment } from 'molecules/section';
import Video from 'molecules/video';
import { videoFragment } from 'molecules/video/query';

import Heading, { headingFragment } from 'organisms/heading';

import { headingContainerStyle, mediaContainerStyle } from 'components/switchback/styles';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';
import type { ExtractSanityType } from 'types/global';
import type { Page } from 'types/sanity.types';

type SwitchbackFragment = InferFragmentType<typeof switchbackFragment>;

const getMedia = (
  mediaType: SwitchbackFragment['mediaType'],
  featuredImage?: SwitchbackFragment['featuredImage'],
  media?: SwitchbackFragment['media'],
) => {
  switch (mediaType) {
    case 'image':
      return (
        featuredImage && (
          <Image
            {...featuredImage}
            noFill
            objectCover
            className="w-full overflow-hidden rounded-sm [&_img]:object-center"
          />
        )
      );
    case 'media':
      switch (media?._type) {
        case 'video':
          return <Video {...media} />;
        default:
          return null;
      }
    default:
      return null;
  }
};

const Switchback: FC<SwitchbackFragment> = ({ heading, featuredImage, reverse, mediaType, media }) => (
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
    <div className={mediaContainerStyle({ reverse })}>{getMedia(mediaType, featuredImage, media)}</div>
    <div className={headingContainerStyle({ reverse })}>
      <Heading {...heading} size="md" alignment="left" />
    </div>
  </div>
);

type SwitchbackQuery = ExtractSanityType<Page, 'switchback'>;
export const switchbackFragment = q.fragment<SwitchbackQuery>().project(switchback => ({
  _key: z.string(),
  heading: switchback.field('heading').project(headingFragment).nullable(true),
  featuredImage: switchback.field('featuredImage').project(imageFragment).nullable(true),
  mediaType: q
    .union([q.literal('image'), q.literal('media')])
    .optional()
    .nullable(),
  media: switchback
    .field('media')
    .deref()
    .project(media => ({
      ...media.conditionalByType({
        video: videoFragment,
      }),
    }))
    .nullable(true),
  reverse: z.boolean().optional().nullable(),
  ...sectionFragment,
}));

export default Switchback;
