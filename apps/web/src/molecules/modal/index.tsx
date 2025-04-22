import { Close, Content, Description, Dialog, Overlay, Portal, Title, Trigger } from '@radix-ui/react-dialog';

import Blanket from 'molecules/blanket';

// import Icon from 'molecules/icon';

import type { ComponentPropsWithoutRef, Dispatch, FC, ReactNode, SetStateAction } from 'react';

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * The trigger element that opens the modal.
   */
  trigger?: ReactNode;
  /**
   * An accessible title to be announced when the dialog is opened.
   */
  title: string;
  /**
   * An optional accessible description to be announced when the dialog is opened.
   */
  description?: string;
  /**
   * An optional flag to trigger dialog open from parent element.
   */
  isOpen?: boolean;
  /**
   * An optional flag to trigger dialog close from parent element.
   */
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ trigger, title, description, children, isOpen, setIsOpen }) => (
  <Dialog open={isOpen} onOpenChange={e => setIsOpen?.(e)} modal>
    {trigger && <Trigger>{trigger}</Trigger>}
    <Portal>
      <Overlay asChild>
        <Blanket>
          <Content
            className="relative max-h-[90dvh] w-[90dvw] max-w-[800px] data-[state=open]:animate-modal-show sm:max-h-[80dvh] sm:w-[80dvw]"
            aria-describedby={!description ? undefined : 'modal-description'}
          >
            {title && <Title className="sr-only">{title}</Title>}
            {description && <Description className="sr-only">{description}</Description>}
            {children}
            <Close className="absolute -top-8 right-[-34px] text-white">
              {/* <Icon icon="x-close" size={20} /> */}X {/* Update with icon */}
            </Close>
          </Content>
        </Blanket>
      </Overlay>
    </Portal>
  </Dialog>
);

export default Modal;
