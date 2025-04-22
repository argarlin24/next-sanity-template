import type { ComponentPropsWithoutRef, FC } from 'react';

const Blanket: FC<ComponentPropsWithoutRef<'div'>> = ({ children }) => (
  <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-md data-[state=closed]:animate-hide data-[state=open]:animate-show">
    {children}
  </div>
);

export default Blanket;
