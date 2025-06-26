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
  announcer.style.clipPath = 'rect(1px, 1px, 1px, 1px)';
  announcer.style['white-space'] = 'nowrap';

  document.body.insertBefore(announcer, document.body.firstChild);
  return announcer;
};

let announcer;

export const AnnounceContext = React.createContext(
  (message, mode = 'polite', timeout = 500) => {
    if (!announcer) {
      announcer =
        document.body.querySelector('#grommet-announcer') || createAnnouncer();
    }

    console.log('Announcing:', message);

    // Clear any existing announcement
    announcer.textContent = '';
    announcer.setAttribute('aria-live', 'off');

    // Force reflow
    void announcer.offsetWidth;

    // Restore aria-live and set the message
    requestAnimationFrame(() => {
      announcer.setAttribute('aria-live', mode);
      requestAnimationFrame(() => {
        announcer.textContent = message;

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
