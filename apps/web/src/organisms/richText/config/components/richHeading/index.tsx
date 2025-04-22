import HeadingObserver from 'organisms/richText/config/components/richHeading/components/observer';
import { generateHeadingId } from 'organisms/richText/config/components/richHeading/utils/generateHeadingId';

import type { ElementType, FC, ReactNode } from 'react';

interface HeadingProps {
  level: number;
  className: string;
  children: ReactNode;
  preventObserver?: boolean;
}

interface HeadingWrapperProps {
  children: ReactNode;
  preventObserver?: boolean;
  headingId: string;
}

const Wrapper: FC<HeadingWrapperProps> = ({ children, preventObserver, headingId }) =>
  preventObserver ? children : <HeadingObserver headingId={headingId}>{children}</HeadingObserver>;

const RichHeading: FC<HeadingProps> = ({ level, className, children, preventObserver }) => {
  const Tag = `h${level}` as ElementType,
    headingId = children ? generateHeadingId(children) : '';

  return (
    <Wrapper headingId={headingId} preventObserver={preventObserver}>
      <Tag id={headingId} className={className}>
        {children}
      </Tag>
    </Wrapper>
  );
};

export default RichHeading;
