import customTwMerge from 'utils/twMerge';

import type { ComponentPropsWithoutRef, FC } from 'react';

export interface CommonFieldProps {
  /**
   * An optional name for the field control.
   */
  name?: string;
  /**
   * An optional placeholder for the field control.
   */
  placeholder?: string;
}

export interface FieldControlProps
  extends Pick<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>,
    CommonFieldProps {
  /**
   * An optional boolean prop that indicates whether the field control has an error.
   */
  error?: boolean;
  /**
   * An optional string error text for the field control.
   */
  errorText?: string;
  /**
   * An optional label for the field control.
   */
  label?: string;
  /**
   * An optional boolean prop that indicates whether the field control is required.
   */
  required?: boolean;
  /**
   * An optional description for the field control.
   */
  description?: string;
}

const FieldControl: FC<FieldControlProps> = ({
  children,
  label,
  required,
  description,
  error,
  errorText,
  className,
}) => (
  <div className={customTwMerge('flex w-full flex-col gap-1.5', className)}>
    {label && (
      <label className="text-sm font-medium text-copy">
        {label}
        {required && <span>*</span>}
      </label>
    )}
    {children}
    {description && !error && <div className="text-sm text-copy">{description}</div>}
    {error && errorText && <div className="text-red-500 text-sm">{errorText}</div>}
  </div>
);

export default FieldControl;
