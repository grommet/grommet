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
    // last scrollable element will be the document
    // if nothing else is scrollable in the page
    if (result.length === 0) {
      result.push(document);
    } else if (documentTags.includes(result[0].tagName.toLowerCase())) {
      result.length = 0;
      result.push(document);
    }
  }
  return result;
};

export const containsFocus = node => {
  let element = document.activeElement;
  while (element) {
    if (element === node) break;
    element = element.parentElement;
  }
  return !!element;
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
    // first, save off the tabIndex of any element with one
    Array.prototype.filter
      .call(elements || [], element => element.getAttribute(TABINDEX) !== null)
      .forEach(element => {
        element.setAttribute(TABINDEX_STATE, element.getAttribute(TABINDEX));
        element.setAttribute(TABINDEX, -1);
      });
    // then, if any element is inherently focusable and not handled above,
    // give it a tabIndex of -1 so it can't receive focus
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
// https://svn.apache.org/repos/asf/commons/sandbox/gsoc/2010/scxml-js/trunk/src/javascript/scxml/cgf/util/svg.js
// https://stackoverflow.com/questions/5996005/how-to-use-element-offsetparent-with-html-svg-elements/5996430#5996430
export const getBoundingBoxInArbitrarySpace = (element, matrix) => {
  // Get the smallest rectangle that you can draw around an element,
  // that encloses the entire element -- all its points and edges.
  const boundingBox = element.getBBox();
  console.log('getBBox', boundingBox);

  let cPt1 = element.createSVGPoint();
  cPt1.x = boundingBox.x;
  cPt1.y = boundingBox.y;
  cPt1 = cPt1.matrixTransform(matrix);

  // repeat for other corner points and the new bounding box is
  // simply the minX/minY  to maxX/maxY of the four points.
  let cPt2 = element.createSVGPoint();
  cPt2.x = boundingBox.x + boundingBox.width;
  cPt2.y = boundingBox.y;
  cPt2 = cPt2.matrixTransform(matrix);

  let cPt3 = element.createSVGPoint();
  cPt3.x = boundingBox.x;
  cPt3.y = boundingBox.y + boundingBox.height;
  cPt3 = cPt3.matrixTransform(matrix);

  let cPt4 = element.createSVGPoint();
  cPt4.x = boundingBox.x + boundingBox.width;
  cPt4.y = boundingBox.y + boundingBox.height;
  cPt4 = cPt4.matrixTransform(matrix);

  const points = [cPt1, cPt2, cPt3, cPt4];

  // find minX, minY, maxX, maxY
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = 0;
  let maxY = 0;
  for (let i = 0; i < points.length; i += 1) {
    if (points[i].x < minX) {
      minX = points[i].x;
    }
    if (points[i].y < minY) {
      minY = points[i].y;
    }
    if (points[i].x > maxX) {
      maxX = points[i].x;
    }
    if (points[i].y > maxY) {
      maxY = points[i].y;
    }
  }

  // instantiate new object that is like an SVGRect
  const newBoundingBox = {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
    // Since the SVG doesn't have a position within the viewport
    // we deduce the positioning values
    // TODO consider using containerRect for that positioning
    top: minX,
    left: minY,
    right: minY,
    bottom: minX,
  };
  console.log('newBoundingBox', newBoundingBox);
  return newBoundingBox;
};

// Deprecated on chrome for SVGElement https://www.chromestatus.com/features/5724912467574784
export const findVisibleParent = element => {
  if (element) {
    console.log('NOT an svg');
    console.log('element', element);
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
