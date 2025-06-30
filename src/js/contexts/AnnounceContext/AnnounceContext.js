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
  document.body.insertBefore(announcer, document.body.firstChild);
  return announcer;
};

const getAnnouncer = () =>
  document.getElementById('grommet-announcer') || createAnnouncer();

export const AnnounceContext = React.createContext(
  (message, mode = 'polite', timeout = 500) => {
    const announcer = getAnnouncer();

    announcer.setAttribute('aria-live', mode);
    announcer.textContent = '\u00A0';

    setTimeout(() => {
      announcer.textContent = message;

      if (timeout > 0) {
        setTimeout(() => {
          announcer.textContent = '';
        }, timeout);
      }
    }, 100);
  },
);
AnnounceContext.propTypes = AnnounceContextPropTypes;
