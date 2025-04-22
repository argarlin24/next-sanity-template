import { iconIds } from '@packages/ui';

import { useIsDarkMode } from '@/utils/hooks/useIsDarkMode';

import type { IconProps } from '@packages/ui';
import type { FC } from 'react';

const Icon: FC<IconProps> = ({ icon, size, ...props }) => {
  const prefersDark = useIsDarkMode();

  return iconIds.includes(icon) ? (
    <div
      className="bg-red-500 text-white p-4 rounded shadow-lg flex justify-around"
      style={{
        padding: '5px',
        color: prefersDark ? 'white' : 'black',
      }}
    >
      <svg
        width={size || 24}
        height={size || 24}
        style={{
          display: 'flex',
          stroke: 'currentcolor',
          fill: 'currentcolor',
        }}
        role="img"
        aria-label={icon}
        {...props}
      >
        <use href={`/static/icons/sprites.svg#${icon}`} />
      </svg>
    </div>
  ) : null;
};

export default Icon;
