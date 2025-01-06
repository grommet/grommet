import React from 'react';
import { AnnounceContextPropTypes } from './propTypes';

const createAnnouncer = () => {
  const announcer = document.createElement('div');
  announcer.id = 'grommet-announcer';
  announcer.style.left = '-100%';
  announcer.style.right = '100%';
  announcer.style.position = 'fixed';
  announcer.style['z-index'] = '-1';
  announcer.setAttribute('aria-live', 'off');

  document.body.insertBefore(announcer, document.body.firstChild);

  return announcer;
};
/*
Prime the live region so that it's registered with the browser
when we first call the announce function.
See https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/
*/
createAnnouncer();

export const AnnounceContext = React.createContext(
  (message, mode = 'polite', timeout = 500) => {
    // we only create a new container if we don't have one already
    // we create a separate node so that grommet does not set aria-hidden to it
    const announcer =
      document.body.querySelector(`#grommet-announcer[aria-live]`) ||
      createAnnouncer();

    announcer.setAttribute('aria-live', 'off');
    announcer.innerHTML = message;
    announcer.setAttribute('aria-live', mode);
    setTimeout(() => {
      announcer.innerHTML = '';
    }, timeout);
  },
);

AnnounceContext.propTypes = AnnounceContextPropTypes;
