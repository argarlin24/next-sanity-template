import { z } from 'groqd';

import Image, { imageFragment } from 'molecules/image';

import { q } from 'lib/client';

import type { InferFragmentType } from 'groqd';
import type { FC } from 'react';

type AttributionProps = Omit<InferFragmentType<typeof personFragment>, 'company'> & {
  company?: InferFragmentType<typeof companyFragment> | null;
};

const constructName = (firstName?: string | null, lastName?: string | null) =>
  [firstName, lastName].filter(Boolean).join(' ');

const Attribution: FC<AttributionProps> = ({ firstName, lastName, role, company, headshot }) => (
  <div className="flex items-center gap-4">
    {headshot && <Image {...headshot} objectCover className="size-[55px] overflow-hidden rounded-full" />}
    <div className="flex flex-col gap-2">
      {(firstName || lastName) && <div>{constructName(firstName, lastName)}</div>}
      {role && <div>{role}</div>}
      {company?.name && <div>{company?.name}</div>}
    </div>
  </div>
);

export const companyFragment = q.fragmentForType<'company'>().project({
  name: z.string().optional().nullable(),
});

export const personFragment = q.fragmentForType<'person'>().project(person => ({
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  company: person.field('company').deref().project(companyFragment),
  headshot: person.field('headshot').project(imageFragment),
}));

export default Attribution;
