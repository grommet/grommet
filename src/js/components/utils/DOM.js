export function filterByFocusable(elements) {
  return Array.prototype.filter.call(elements || [], (element) => {
    const currentTag = element.tagName.toLowerCase();
    const validTags = /(svg|a|area|input|select|textarea|button|iframe|div)$/;
    const isValidTag = currentTag.match(validTags) && element.focus;
    if (currentTag === 'a') {
      return isValidTag && element.childNodes.length > 0 &&
        element.getAttribute('href');
    } else if (currentTag === 'svg' || currentTag === 'div') {
      return isValidTag && element.hasAttribute('tabindex');
    }
    return isValidTag;
  });
}

export function findScrollParents(element, horizontal) {
  const result = [];
  if (element) {
    let parent = element.parentNode;
    while (parent && parent.getBoundingClientRect) {
      const rect = parent.getBoundingClientRect();
      // 10px is to account for borders and scrollbars in a lazy way
      if (horizontal) {
        if (rect.width && parent.scrollWidth > (rect.width + 10)) {
          result.push(parent);
        }
      } else if (rect.height && parent.scrollHeight > (rect.height + 10)) {
        result.push(parent);
      }
      parent = parent.parentNode;
    }
    // last scrollable element will be the document 
    // if nothing else is scrollable in the page
    if (result.length === 0) {
      result.push(document);
    }
  }
  return result;
}

export function getBodyNodes() {
  const excludeMatch = /^(script|link)$/i;
  const children = [];
  [].forEach.call(document.body.children, (node) => {
    if (!excludeMatch.test(node.tagName)) {
      children.push(node);
    }
  });
  return children;
}

export function getNewContainer() {
  // setup DOM
  const container = document.createElement('div');
  // prepend in body to avoid browser scroll issues
  document.body.insertBefore(container, document.body.firstChild);
  return container;
}

export default {
  filterByFocusable,
  findScrollParents,
  getBodyNodes,
  getNewContainer,
};
