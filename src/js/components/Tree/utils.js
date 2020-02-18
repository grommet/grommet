export const setupNodes = nodes =>
  nodes.map(node => ({
    name: node.name,
    childs: setupNodes(node.childs || []),
    opened: false,
  }));

export const isSameNode = (node1, node2) => node1 === node2;

export const changeNode = (positions, nodes) => {
  const [currentPosition, ...otherPositions] = positions;
  const currentNode = nodes[currentPosition];

  if (otherPositions.length) {
    return nodes.map(node =>
      isSameNode(node, currentNode)
        ? {
            ...node,
            childs: changeNode(otherPositions, node.childs),
          }
        : { ...node },
    );
  }

  return nodes.map(node =>
    isSameNode(node, currentNode)
      ? {
          ...node,
          opened: !node.opened,
        }
      : { ...node },
  );
};
