import { Inter } from 'next/font/google';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { twJoin } from 'tailwind-merge';

import AnnouncementBar from 'global/announcementBar';
import Footer from 'global/footer';
import Header from 'global/navigation';
import Scripts from 'global/scripts';

import 'theme/global.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter-dec',
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const draft = await draftMode();

  return (
    <html lang="en" className={twJoin(inter.variable)}>
      <head>
        <Scripts />
      </head>
      <body>
        <AnnouncementBar />
        <Header />
        {children}
        <Footer />
      </body>
      {draft.isEnabled ? <VisualEditing /> : null}
    </html>
  );
};

export default RootLayout;
