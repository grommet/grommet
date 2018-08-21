import React from 'react';

const createAnnouncer = () => {
  const announcer = document.createElement('div');
  announcer.style.left = '-100%';
  announcer.style.right = '100%';
  announcer.style.position = 'fixed';
  announcer.style['z-index'] = '-1';

  document.body.insertBefore(announcer, document.body.firstChild);

  return announcer;
};

const AnnounceContext = React.createContext((message, mode = 'polite') => {
  // we only create a new container if we don't have one already
  // we create a separate node so that grommet does not set aria-hidden to it
  const announcer = document.body.querySelector('[aria-live]') || createAnnouncer();

  announcer.setAttribute('aria-live', 'off');
  announcer.innerHTML = message;
  announcer.setAttribute('aria-live', mode);
  setTimeout(() => {
    announcer.innerHTML = '';
  }, 500);
});

export default AnnounceContext;
