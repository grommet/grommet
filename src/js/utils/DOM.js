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
    // last scrollable element will be the document
    // if nothing else is scrollable in the page
    if (result.length === 0) {
      result.push(document);
    } else if (result[0].tagName.toLowerCase() === 'body') {
      result.length = 0;
      result.push(document);
    }
  }
  return result;
};

export const getFirstFocusableDescendant = element => {
  const children = element.getElementsByTagName('*');
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    const tagName = child.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'select') {
      return child;
    }
  }
  return undefined;
};

export const getBodyChildElements = () => {
  const excludeMatch = /^(script|link)$/i;
  const children = [];
  [].forEach.call(document.body.children, node => {
    if (!excludeMatch.test(node.tagName)) {
      children.push(node);
    }
  });
  return children;
};

export const getNewContainer = (rootNode = document.body) => {
  // setup DOM
  const container = document.createElement('div');
  rootNode.appendChild(container);
  return container;
};

export const setFocusWithoutScroll = element => {
  const x = window.scrollX;
  const y = window.scrollY;
  element.focus();
  window.scrollTo(x, y);
};

const TABINDEX = 'tabindex';
const TABINDEX_STATE = 'data-g-tabindex';

export const makeNodeFocusable = node => {
  // do not touch aria live containers so that announcements work
  if (!node.hasAttribute('aria-live')) {
    node.setAttribute('aria-hidden', false);
    // allow children to receive focus again
    const elements = node.getElementsByTagName('*');
    // only reset elements we've changed in makeNodeUnfocusable()
    Array.prototype.filter
      .call(elements || [], element => element.hasAttribute(TABINDEX_STATE))
      .forEach(element => {
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

export const makeNodeUnfocusable = node => {
  // do not touch aria live containers so that announcements work
  if (!node.hasAttribute('aria-live')) {
    node.setAttribute('aria-hidden', true);
    // prevent children to receive focus
    const elements = node.getElementsByTagName('*');
    // first, save off the tabindex of any element with one
    Array.prototype.filter
      .call(elements || [], element => element.getAttribute(TABINDEX) !== null)
      .forEach(element => {
        element.setAttribute(TABINDEX_STATE, element.getAttribute(TABINDEX));
        element.setAttribute(TABINDEX, -1);
      });
    // then, if any element is inherently focusable and not handled above,
    // give it a tabindex of -1 so it can't receive focus
    Array.prototype.filter
      .call(elements || [], element => {
        const currentTag = element.tagName.toLowerCase();
        return (
          currentTag.match(autoFocusingTags) &&
          element.focus &&
          element.getAttribute(TABINDEX_STATE) === null
        );
      })
      .forEach(element => {
        element.setAttribute(TABINDEX_STATE, 'none');
        element.setAttribute(TABINDEX, -1);
      });
  }
};

export const findVisibleParent = element => {
  if (element) {
    return element.offsetParent
      ? element
      : findVisibleParent(element.parentElement) || element;
  }
  return undefined;
};

export const isNodeAfterScroll = (node, target = window) => {
  const { bottom } = node.getBoundingClientRect();
  const { height, top } = target.getBoundingClientRect();
  return bottom >= top + height;
};

export const isNodeBeforeScroll = (node, target = window) => {
  const { top } = node.getBoundingClientRect();
  const { top: targetTop } = target.getBoundingClientRect();
  return top <= targetTop;
};
