import React from 'react';
import { AnnounceContextPropTypes } from './propTypes';

const createAnnouncer = () => {
  const announcer = document.createElement('div');
  announcer.setAttribute('id', 'grommet-announcer');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.position = 'absolute';
  announcer.style.left = '-9999px';
  announcer.style.height = '1px';
  announcer.style.width = '1px';
  announcer.style.overflow = 'hidden';
  document.body.appendChild(announcer);

  document.body.insertBefore(announcer, document.body.firstChild);

  return announcer;
};

export const AnnounceContext = React.createContext(
  (message, mode = 'polite', timeout = 500) => {
    const announcer =
      document.body.querySelector('#grommet-announcer') || createAnnouncer();

    // Clear any existing timeout
    if (announcer.timeoutId) {
      clearTimeout(announcer.timeoutId);
      delete announcer.timeoutId;
    }
    // Set the aria-live attribute based on the mode
    announcer.setAttribute('aria-live', mode);

    announcer.textContent = '';

    // 2. Use a short delay before setting the new message.
    // This allows screen readers to register the empty state.
    // A 50-100ms delay is often more reliable than 10ms for this.
    setTimeout(() => {
      announcer.textContent = message; // Set the new message

      if (timeout > 0) {
        announcer.timeoutId = setTimeout(() => {
          announcer.textContent = ''; // Clear the message after timeout
          delete announcer.timeoutId;
        }, timeout);
      }
    }, 75); // Increased delay for better reliability
  },
);

AnnounceContext.propTypes = AnnounceContextPropTypes;
