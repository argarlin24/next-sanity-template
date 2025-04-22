import announcementBar from '@/schemas/documents/announcementBar';
import blog from '@/schemas/documents/blog';
import blogCategory from '@/schemas/documents/blogTags';
import { company } from '@/schemas/documents/company';
import footer from '@/schemas/documents/footer';
import legal from '@/schemas/documents/legal';
import navigation from '@/schemas/documents/navigation';
import notFound from '@/schemas/documents/notFound';
import page from '@/schemas/documents/page';
import { person } from '@/schemas/documents/person';
import redirect from '@/schemas/documents/redirect';
import siteSettings from '@/schemas/documents/settings';
import symbol from '@/schemas/documents/symbol';
import testimonial from '@/schemas/documents/testimonials';
import video from '@/schemas/documents/video';

const fields = [] as const,
  documents = [
    announcementBar,
    blog,
    blogCategory,
    company,
    footer,
    legal,
    navigation,
    notFound,
    person,
    page,
    redirect,
    siteSettings,
    symbol,
    testimonial,
    video,
  ] as const;

const schemas = [...fields, ...documents];

export default schemas;
