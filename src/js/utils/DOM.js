export const findScrollParent = (element, horizontal) => {
  let result;
  if (element) {
    let parent = element.parentNode;
    while (!result && parent && parent.getBoundingClientRect) {
      const rect = parent.getBoundingClientRect();
      // 10px is to account for borders and scrollbars in a lazy way
      if (horizontal) {
        if (rect.width && parent.scrollWidth > rect.width + 10) {
          result = parent;
        }
      } else if (rect.height && parent.scrollHeight > rect.height + 10) {
        result = parent;
      }
      parent = parent.parentNode;
    }
    // last scrollable element will be the document
    // if nothing else is scrollable in the page
    if (!result) {
      result = document;
    } else if (result.tagName.toLowerCase() === 'body') {
      result = document;
    }
  }
  return result;
};

const documentTags = ['html', 'body'];

export const findScrollParents = (element, horizontal) => {
  const result = [];
  if (element) {
    let parent = element.parentNode;
    while (parent && parent.getBoundingClientRect) {
      const rect = parent.getBoundingClientRect();
      // 10px is to account for borders and scrollbars in a lazy way
      if (horizontal) {
        if (rect.width && parent.scrollWidth > rect.width + 10) {
          result.push(parent);
        }
      } else if (rect.height && parent.scrollHeight > rect.height + 10) {
        result.push(parent);
      }
      parent = parent.parentNode;
    }
    if (
      result.length &&
      documentTags.includes(result[0].tagName.toLowerCase())
    ) {
      result.length = 0;
    }
    // last scrollable element will be the document
    result.push(document);
  }
  return result;
};

export const containsFocus = (node) => {
  const root = node.getRootNode();
  let element = root.activeElement;
  while (element) {
    if (element === node) break;
    element = element.parentElement;
  }
  return !!element;
};

export const withinDropPortal = (node, portalContext) => {
  const root = node?.getRootNode();
  let element = node;
  let portalId;
  while (element && element !== root) {
    if (element.hasAttribute('data-g-portal-id')) {
      portalId = element.getAttribute('data-g-portal-id');
      element = root;
    } else {
      element = element.parentElement;
    }
  }
  // if portalContext doesn't contain the portalId then the
  // portal is new and node is within a drop that just opened
  if (
    portalId === undefined ||
    portalContext.indexOf(parseInt(portalId, 10)) !== -1
  )
    return false;
  return true;
};

// Check if the element.tagName is an input, select or textarea
export const isFocusable = (element) => {
  const tagName = element.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'select' || tagName === 'textarea';
};

// Get the first element that can receive focus
export const getFirstFocusableDescendant = (element) => {
  const children = element.getElementsByTagName('*');
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (isFocusable(child)) {
      return child;
    }
  }
  return undefined;
};

export const shouldKeepFocus = (root) => {
  const element = root.activeElement;
  if (isFocusable(element)) return true;
  return !!getFirstFocusableDescendant(element);
};

export const getNewContainer = (
  target = document.body,
  targetChildPosition,
) => {
  // setup DOM
  const container = document.createElement('div');
  if (targetChildPosition === 'first') {
    // for SkipLinks
    target.prepend(container);
  } else {
    target.appendChild(container);
  }
  return container;
};

export const setFocusWithoutScroll = (element) => {
  const x = window.scrollX;
  const y = window.scrollY;
  element.focus();
  window.scrollTo(x, y);
};

const TABINDEX = 'tabindex';
const TABINDEX_STATE = 'data-g-tabindex';

export const makeNodeFocusable = (node) => {
  // do not touch aria live containers so that announcements work
  if (!node.hasAttribute('aria-live')) {
    node.removeAttribute('aria-hidden');
    // allow children to receive focus again
    const elements = node.getElementsByTagName('*');
    // only reset elements we've changed in makeNodeUnfocusable()
    Array.prototype.filter
      .call(elements || [], (element) => element.hasAttribute(TABINDEX_STATE))
      .forEach((element) => {
        const prior = element.getAttribute(TABINDEX_STATE);
        if (prior >= 0) {
          element.setAttribute(TABINDEX, element.getAttribute(TABINDEX_STATE));
        } else if (prior === 'none') {
          element.removeAttribute(TABINDEX);
        }
        element.removeAttribute(TABINDEX_STATE);
      });
  }
};

const autoFocusingTags = /(a|area|input|select|textarea|button|iframe)$/;

export const makeNodeUnfocusable = (node) => {
  // do not touch aria live containers so that announcements work
  if (!node.hasAttribute('aria-live')) {
    node.setAttribute('aria-hidden', true);
    // prevent children to receive focus
    const elements = node.getElementsByTagName('*');
    // first, save off the tabIndex of any element with one
    Array.prototype.filter
      .call(
        elements || [],
        (element) => element.getAttribute(TABINDEX) !== null,
      )
      .forEach((element) => {
        element.setAttribute(TABINDEX_STATE, element.getAttribute(TABINDEX));
        element.setAttribute(TABINDEX, -1);
      });
    // then, if any element is inherently focusable and not handled above,
    // give it a tabIndex of -1 so it can't receive focus
    Array.prototype.filter
      .call(elements || [], (element) => {
        const currentTag = element.tagName.toLowerCase();
        return (
          currentTag.match(autoFocusingTags) &&
          element.focus &&
          element.getAttribute(TABINDEX_STATE) === null
        );
      })
      .forEach((element) => {
        element.setAttribute(TABINDEX_STATE, 'none');
        element.setAttribute(TABINDEX, -1);
      });
  }
};

export const findVisibleParent = (element) => {
  if (element) {
    // Get the closest ancestor element that is positioned.
    return element.offsetParent
      ? element
      : findVisibleParent(element.parentElement) || element;
  }
  return undefined;
};

export const isNodeAfterScroll = (node, target) => {
  const { bottom } = node.getBoundingClientRect();
  // target will be the document from findScrollParent()
  const { height, top } = target.getBoundingClientRect
    ? target.getBoundingClientRect()
    : { height: 0, top: 0 };
  return bottom >= top + height;
};

export const isNodeBeforeScroll = (node, target) => {
  const { top } = node.getBoundingClientRect();
  // target will be the document from findScrollParent()
  const { top: targetTop } = target.getBoundingClientRect
    ? target.getBoundingClientRect()
    : { top: 0 };
  return top <= targetTop;
};

export const findButtonParent = (element) => {
  if (element && element.nodeName !== 'BUTTON' && element.nodeName !== 'A')
    return findButtonParent(element.parentElement);
  return element;
};
