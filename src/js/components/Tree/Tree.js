import React, { forwardRef, useState } from 'react';
import { CaretNext } from 'grommet-icons';

import {
  StyledTree,
  StyledNode,
  StyledName,
  StyledNodeHeader,
  StyledIcon,
  StyledChilds,
} from './StyledTree';

import { setupNodes, changeNode } from './utils';

const Node = ({ name, childs, onClick, positions, icon, opened }) => (
  <StyledNode positions={positions}>
    <StyledNodeHeader onClick={() => onClick(positions)}>
      {childs.length ? <StyledIcon opened={opened}>{icon}</StyledIcon> : null}
      <StyledName>{name}</StyledName>
    </StyledNodeHeader>
    <StyledChilds opened={opened}>
      {childs.map((child, index) => (
        <Node
          name={child.name}
          childs={child.childs}
          onClick={onClick}
          key={child.name}
          icon={icon}
          positions={[...positions, index]}
          opened={child.opened}
        />
      ))}
    </StyledChilds>
  </StyledNode>
);

const Tree = forwardRef(({ nodes, icon = <CaretNext />, ...rest }, ref) => {
  const [nodesState, setNodes] = useState(setupNodes(nodes));

  const handleChangeNode = positions => {
    const updatedNodes = changeNode(positions, [...nodesState]);

    setNodes(updatedNodes);
  };

  return (
    <StyledTree ref={ref} {...rest}>
      {nodesState.map((node, index) => (
        <Node
          name={node.name}
          childs={node.childs}
          key={node.name}
          onClick={handleChangeNode}
          positions={[index]}
          icon={icon}
          opened={node.opened}
        />
      ))}
    </StyledTree>
  );
});

Tree.displayName = 'Tree';

let TreeDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TreeDoc = require('./doc').doc(Tree);
}
const TreeWrapper = TreeDoc || Tree;

export { TreeWrapper as Tree };
