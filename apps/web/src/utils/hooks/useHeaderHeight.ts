import { useWindowSize } from '@react-hookz/web';
import { useEffect, useState } from 'react';

const useHeaderHeight = ({ includeAnnouncementBar }: { includeAnnouncementBar?: boolean } = {}) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const { width } = useWindowSize();

  const calculateHeaderHeight = () => {
    const header = document.querySelector('header');
    const announcementBar = document.getElementById('announcement-bar');

    if (header) {
      const rect = header.getBoundingClientRect();
      const announcementBarRectHeight = includeAnnouncementBar ? announcementBar?.getBoundingClientRect().height : 0;
      setHeaderHeight(rect.height + (announcementBarRectHeight || 0));
    }
  };

  const effect = () => {
    window.addEventListener('scroll', () => calculateHeaderHeight());
    window.addEventListener('resize', () => calculateHeaderHeight());

    return () => {
      window.removeEventListener('scroll', () => calculateHeaderHeight());
      window.removeEventListener('resize', () => calculateHeaderHeight());
    };
  };

  useEffect(() => calculateHeaderHeight(), []);

  useEffect(effect, [width]);

  return headerHeight;
};

export default useHeaderHeight;
