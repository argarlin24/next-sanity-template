import { Close, Content, Dialog, Overlay, Portal, Trigger } from '@radix-ui/react-dialog';

import Blanket from 'molecules/blanket';
import drawerStyles from 'molecules/drawer/styles';
// import Icon from 'molecules/icon';

import type { VariantProps } from 'class-variance-authority';
import type { FC, ReactNode } from 'react';
import type { IntRange } from 'types/global';

interface DrawerProps extends VariantProps<typeof drawerStyles> {
  trigger: ReactNode;
  children: ReactNode;
  size?: IntRange<0, 100>;
}

const Drawer: FC<DrawerProps> = ({ children, trigger, position, size }) => (
  <Dialog modal>
    <Trigger asChild>{trigger}</Trigger>
    <Portal>
      <Overlay asChild>
        <Blanket>
          <Content className={drawerStyles({ position })} style={{ '--dialog-size': `${100 - (size || 70)}%` }}>
            <div className="flex w-full items-center justify-end gap-2">
              <Close className="text-navy-900">
                {/* <Icon icon="x-close" size={20} /> */}X {/* Update with icon */}
              </Close>
            </div>
            {children}
          </Content>
        </Blanket>
      </Overlay>
    </Portal>
  </Dialog>
);

export default Drawer;
