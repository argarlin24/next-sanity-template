import { hasArrayValues } from '@packages/utils/src/arrays';

import type { KeyboardEvent } from 'react';

/**
 * Handles a keyboard event and calls an action if the event key matches the target key(s).
 *
 * @param event - The keyboard event object.
 * @param action - The function to call when the target key(s) are pressed.
 * @param targetKey - The key(s) that should trigger the action. Defaults to 'Enter' and ' ' (space).
 */
const onKeyDown = (event: KeyboardEvent<HTMLDivElement>, action: () => void, targetKey?: string | string[]) => {
  targetKey = targetKey ?? ['Enter', ' '];

  if (hasArrayValues(targetKey) ? targetKey.includes(event.key) : event.key === targetKey) {
    event.preventDefault();
    action();
  }
};

export default onKeyDown;
