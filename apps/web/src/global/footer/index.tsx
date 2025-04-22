// import { z } from 'groqd';

// import Image, { imageFragment } from 'molecules/image';
// import { linkFragment } from 'molecules/link';
// import Section from 'molecules/section';

// import { q, runQuery } from 'lib/client';

// const footerQuery = q.star.filterByType('footer').project(footer => ({
//   menus: footer.field('menus[]').project(menus => ({
//     _key: z.string(),
//     label: z.string().optional(),
//     links: menus.field('links[]').project({
//       _key: z.string(),
//       ...linkFragment,
//     }),
//   })),
//   settings: q.star.filterByType('settings').project(settings => ({
//     logo: settings.field('logo').project(imageFragment),
//   })),
// }));

const Footer = async () => (
  // const query = footerQuery,
  //   data = (await runQuery(query, {}))[0],
  //   { logo } = data.settings[0];

  // return (
  //   <Section as="footer" sectionId="footer" padding={{ top: 'xl', bottom: 'xl' }}>
  //     {logo && <Image {...logo} />}
  //     <div className="flex w-full flex-col gap-6 sm:gap-8">Footer</div>
  //   </Section>
  // );

  <div>Footer</div>
);

export default Footer;
