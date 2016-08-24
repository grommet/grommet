import CSSClassnames from './CSSClassnames';

const CLASS_ROOT = CSSClassnames.APP;

export function announcePageLoaded (title) {
  announce(`${title} page was loaded`);
}

export function announce (message, mode = 'assertive') {
  const announcer = document.querySelector(`.${CLASS_ROOT}__announcer`);
  announcer.setAttribute('aria-live', mode);
  announcer.innerHTML = message;
}

export default { announce, announcePageLoaded };
