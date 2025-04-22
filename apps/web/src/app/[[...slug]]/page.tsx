import { z } from 'groqd';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import LegalTemplate, { legalQuery } from 'templates/legal';

import { q, runQuery } from 'lib/client';

import ComponentGenerator, { componentGeneratorFragment } from 'utils/componentGenerator';
import constructMetadata, { seoFragment } from 'utils/constructMetadata';

import type { Metadata } from 'next';
import type { FC } from 'react';
import type { PageProps } from 'types/global';

const pageQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('page')
    .filterBy('seo.slug.current == $slug')
    .project(page => ({
      body: page.field('body[]').project(componentGeneratorFragment),
    })),
  pagesQuery = q.star.filterByType('page').project(page => ({
    slug: page.field('seo').field('slug.current', z.string().nullable()),
  })),
  pageSeoQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('page')
    .filterBy('seo.slug.current == $slug')
    .project(page => ({
      seo: page.field('seo').project(seoFragment),
    }));

const Page: FC<PageProps> = async ({ params }) => {
  const resolvedParams = await params,
    draft = (await draftMode()).isEnabled,
    slug = (Array.isArray(resolvedParams.slug) && resolvedParams.slug?.join('/')) || '/',
    pageData = (await runQuery(pageQuery, { parameters: { slug }, draft }))[0],
    legalData = (await runQuery(legalQuery, { parameters: { slug }, draft }))[0];

  if (!pageData && !legalData) return notFound();

  switch (true) {
    case Boolean(pageData):
      return <ComponentGenerator sections={pageData.body} />;
    case Boolean(legalData):
      return <LegalTemplate {...legalData} />;
    default:
      return null;
  }
};

export const generateStaticParams = async () => {
  const res = await runQuery(pagesQuery),
    slugs = res.map(page => ({ slug: [page.slug] }));

  return [...slugs, { slug: ['/'] }];
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const resolvedParams = await params,
    slug = (Array.isArray(resolvedParams.slug) && resolvedParams.slug?.join('/')) || '/',
    data = (await runQuery(pageSeoQuery, { parameters: { slug } }))[0];

  if (!data?.seo) return {};

  return constructMetadata(data.seo, slug);
};

export const revalidate = 60;
export const dynamicParams = true;

export default Page;
