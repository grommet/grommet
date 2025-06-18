import React from 'react';
import { AnnounceContextPropTypes } from './propTypes';

const createAnnouncer = () => {
  const announcer = document.createElement('div');
  announcer.id = 'grommet-announcer';
  // Add ARIA attributes during creation
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  // Hide visually but keep accessible to screen readers
  announcer.style.position = 'absolute';
  announcer.style.left = '-1px';
  announcer.style.height = '1px';
  announcer.style.width = '1px';
  announcer.style.overflow = 'hidden';
  announcer.style.clip = 'rect(1px, 1px, 1px, 1px)';
  announcer.style['white-space'] = 'nowrap';

  document.body.insertBefore(announcer, document.body.firstChild);
  return announcer;
};

export const AnnounceContext = React.createContext(
  (message, mode = 'polite', timeout = 500) => {
    const announcer =
      document.body.querySelector('#grommet-announcer') || createAnnouncer();

    // Clear any existing announcement
    announcer.textContent = '';

    // Update aria-live before setting content
    announcer.setAttribute('aria-live', mode);

    // Use requestAnimationFrame to ensure DOM updates are complete
    requestAnimationFrame(() => {
      // Set content in next frame
      requestAnimationFrame(() => {
        announcer.textContent = message;

        // Clear after timeout
        if (timeout > 0) {
          setTimeout(() => {
            announcer.textContent = '';
          }, timeout);
        }
      });
    });
  },
);

AnnounceContext.propTypes = AnnounceContextPropTypes;
