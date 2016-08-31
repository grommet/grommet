export function findAllByType (component, type) {
  if (!component) {
    return [];
  }

  let matches = [];

  if (component.type === type) {
    matches.push(component);
  }

  if (component.children) {
    component.children.forEach((child) => {
      matches = matches.concat(findAllByType(child, type));
    });
  }

  return matches;
}

export default { findAllByType };
