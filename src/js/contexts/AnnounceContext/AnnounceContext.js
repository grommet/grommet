import React from 'react';
import { AnnounceContextPropTypes } from './propTypes';

const DEFAULT_MODE = 'polite';

const createAnnouncer = () => {
  const announcer = document.createElement('div');
  announcer.id = 'grommet-announcer';
  announcer.setAttribute('aria-live', DEFAULT_MODE);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.left = '-100%';
  announcer.style.right = '100%';
  announcer.style.position = 'fixed';
  announcer.style['z-index'] = '-1';

  document.body.insertBefore(announcer, document.body.firstChild);

  return announcer;
};

let announceCounter = 0; // Counter to ensure unique announcements

export const AnnounceContext = React.createContext(
  (message, mode = DEFAULT_MODE, timeout = 500) => {
    // we only create a new container if we don't have one already
    // we create a separate node so that grommet does not set aria-hidden to it
    const announcer =
      document.body.querySelector(`#grommet-announcer[aria-live]`) ||
      createAnnouncer();

    announcer.setAttribute('aria-live', mode);
    if (mode === 'polite') {
      // using setTimeout for polite mode pushes to next event loop tick,
      // giving time for the browser to process the change
      setTimeout(() => {
        const invisibleChars = ['\u200B', '\uFEFF', '\u200C', '\u200D'];
        const uniqueChar =
          invisibleChars[announceCounter % invisibleChars.length];
        announceCounter += 1; // Increment the counter for the next call
        // set the message with a unique invisible character to ensure
        // it is registered as different by screen readers
        announcer.textContent = `${message}${uniqueChar}`;
      }, 0);
    } else announcer.textContent = message;
    // clear the message after the specified timeout
    setTimeout(() => {
      announcer.textContent = '';
    }, timeout);
  },
);

AnnounceContext.propTypes = AnnounceContextPropTypes;
