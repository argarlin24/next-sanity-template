import { z } from 'groqd';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

// import { hasArrayValues } from '@packages/utils/src/arrays';

// import { imageFragment } from 'molecules/image';
import Section from 'molecules/section';

// import { blogCategoryFragment } from 'organisms/cards/resource';
import RichText, { articleFragment, richTextFragment } from 'organisms/richText';

// import LeftAlignedHero from 'components/hero/variations/leftAligned';

import { q, runQuery } from 'lib/client';

// import ComponentGenerator, { componentGeneratorWithSymbolsFragment } from 'utils/componentGenerator';
import constructMetadata, { seoFragment } from 'utils/constructMetadata';

import type { Metadata } from 'next';

const pageQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('blog')
    .filterBy('seo.slug.current == $slug')
    .project(blog => ({
      postTitle: blog.field('postTitle[]').project(richTextFragment),
      publishedDate: q.string().optional().nullable(),
      excerpt: blog.field('excerpt[]').project(richTextFragment),
      // featuredImage: blog.field('featuredImage').project(imageFragment),
      content: blog.field('content[]').project(articleFragment),
      // blogTags: blog.field('blogTags[]').deref().project(blogCategoryFragment),
      // body: blog.field('body[]').project(componentGeneratorWithSymbolsFragment),
    })),
  pagesQuery = q.star.filterByType('blog').project(page => ({
    slug: page.field('seo').field('slug.current', z.string().nullable()),
  })),
  pageSeoQuery = q
    .parameters<{ slug: string }>()
    .star.filterByType('blog')
    .filterBy('seo.slug.current == $slug')
    .project(page => ({
      seo: page.field('seo').project(seoFragment),
    }));

const Blog = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params,
    draft = (await draftMode()).isEnabled,
    query = pageQuery,
    data = (await runQuery(query, { parameters: { slug }, draft }))[0];

  if (!data) return notFound();

  return (
    <>
      <Section padding={{ top: 'lg', bottom: 'lg' }}>
        <div>Blog Hero</div>
        {/* <LeftAlignedHero
          heading={{
            heading: data.postTitle,
            body: data.excerpt,
          }}
          featuredImage={data.featuredImage}
        /> */}
      </Section>
      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="h-full lg:col-span-3 lg:col-start-2 lg:row-start-1">Sidebar</div>
          <div className="lg:col-span-7 lg:col-start-5 lg:row-start-1">
            {data.content && <RichText blocks={data.content} className="gap-10" />}
          </div>
        </div>
      </Section>
      {/* {hasArrayValues(data.body) && <ComponentGenerator sections={data.body} />} */}
    </>
  );
};

export const generateStaticParams = async () => {
  const res = await runQuery(pagesQuery, {});

  return res;
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params,
    data = (await runQuery(pageSeoQuery, { parameters: { slug } }))[0];

  if (!data?.seo) return {};

  return constructMetadata(data.seo, slug);
};

export const revalidate = 60;
export const dynamicParams = true;

export default Blog;
