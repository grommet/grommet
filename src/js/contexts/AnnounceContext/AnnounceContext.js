import React from 'react';
import { AnnounceContextPropTypes } from './propTypes';

/**
 * Creates a hidden announcer element for screen reader accessibility
 * This element is used to announce dynamic content changes to screen readers
 */
const createAnnouncer = () => {
  const announcer = document.createElement('div');
  announcer.id = 'grommet-announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');

  // Position element off-screen to hide it visually
  announcer.style.position = 'absolute';
  announcer.style.left = '-9999px';
  announcer.style.height = '1px';
  announcer.style.width = '1px';
  announcer.style.overflow = 'hidden';

  // Add to DOM at the beginning of body for best screen reader support
  document.body.appendChild(announcer);
  document.body.insertBefore(announcer, document.body.firstChild);

  return announcer;
};

export const AnnounceContext = React.createContext(
  (message, mode = 'polite', timeout = 500) => {
    // Get existing announcer or create a new one
    const announcer =
      document.body.querySelector('#grommet-announcer') || createAnnouncer();

    // Clear any existing timeouts to prevent overlapping announcements
    if (announcer.dataset.initialAnnounceTimeoutId) {
      clearTimeout(Number(announcer.dataset.initialAnnounceTimeoutId));
      delete announcer.dataset.initialAnnounceTimeoutId;
    }
    if (announcer.dataset.timeoutId) {
      clearTimeout(Number(announcer.dataset.timeoutId));
      delete announcer.dataset.timeoutId;
    }

    announcer.setAttribute('aria-live', mode);

    // have to reset the content with something different (non breaking space)
    // to force the screen reader to recognize the change.
    announcer.textContent = '\u00A0';

    // Force DOM reflow to ensure screen readers detect the change
    // eslint-disable-next-line no-unused-expressions
    announcer.offsetWidth;

    // Delay before announcing to ensure screen readers are ready
    const announceDelay = 100;

    const initialAnnounceTimeout = setTimeout(() => {
      // Set the actual message to be announced
      announcer.textContent = message;

      // Set timeout to clear the message (if timeout > 0)
      if (timeout > 0) {
        const clearAnnounceTimeout = setTimeout(() => {
          announcer.textContent = '';
          delete announcer.dataset.timeoutId;
        }, timeout);

        // Store timeout ID for potential cleanup
        announcer.dataset.timeoutId = clearAnnounceTimeout.toString();
      } else {
        // No auto-clear if timeout is 0
        delete announcer.dataset.timeoutId;
      }

      // Clean up initial timeout reference
      delete announcer.dataset.initialAnnounceTimeoutId;
    }, announceDelay);

    // helps avoid multiple announcements stacking up
    announcer.dataset.initialAnnounceTimeoutId =
      initialAnnounceTimeout.toString();
  },
);

AnnounceContext.propTypes = AnnounceContextPropTypes;
