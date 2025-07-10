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

    // Set aria-live for the upcoming message, in case it changes mode
    announcer.setAttribute('aria-live', mode);
    announcer.textContent = '';

    announcer.textContent = '\u00A0';

    // Force a DOM reflow. This makes the browser immediately apply the DOM
    // changes which can help screen readers detect the change more reliably.
    // eslint-disable-next-line no-unused-expressions
    announcer.offsetWidth;

    // Set a short delay before placing the actual message.
    const announceDelay = 100;

    const initialAnnounceTimeout = setTimeout(() => {
      announcer.textContent = message;

      // Set a timeout to clear the message after the specified duration
      if (timeout > 0) {
        const clearAnnounceTimeout = setTimeout(() => {
          announcer.textContent = ''; // Clear the message after display
          delete announcer.dataset.timeoutId; // Remove stored timeout ID
        }, timeout);

        // Store the ID of this *clear* timeout. This allows us to cancel it
        // if a new announcement comes in before this one is cleared.
        announcer.dataset.timeoutId = clearAnnounceTimeout.toString();
      } else {
        // If timeout is 0, the message should persist indefinitely until
        // a new announcement occurs. Ensure no stale timeout ID.
        delete announcer.dataset.timeoutId;
      }
      // Clean up the initial timeout ID once the message has been set
      delete announcer.dataset.initialAnnounceTimeoutId;
    }, announceDelay);

    // Store the ID for the initial announce delay, in case it needs to be
    // cancelled if a new message is triggered extremely quickly
    // (e.g., within announceDelay).
    announcer.dataset.initialAnnounceTimeoutId =
      initialAnnounceTimeout.toString();
  },
);

AnnounceContext.propTypes = AnnounceContextPropTypes;
