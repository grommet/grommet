export function findScrollParents(element, horizontal) {
  const result = [];
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
  return result;
}

export default {
  findScrollParents,
};
