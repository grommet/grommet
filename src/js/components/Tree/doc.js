import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Tree => {
  const DocumentedTree = describe(Tree)
    .availableAt(getAvailableAtBadge('Tree', 'Controls'))
    .description(`Hierarchical list structure.`)
    .usage(
      `import { Tree } from 'grommet';
<Tree />`,
    );

  DocumentedTree.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).description(
      `The data structure provided to the tree, for nested behavior 
      an object should include a children key.`,
    ),
    mode: PropTypes.oneOf(['nested', 'column'])
      .description(
        `Mode options are nested and column. 
      nested Tree results the classic nested structure of hierarchal nested 
      lists, while column mode provides to display metadata per entry 
      while showing one level at the time with a breadcrumb 
      option to the parent level.`,
      )
      .defaultValue('nested'),
    children: PropTypes.func.description(
      `Function that can be called to render the visual representation 
        of a specific node on the Tree. 
        For example, 'datum' can be passed as an 
        argument that would then return a react element according to a 
        certain Tree node info (provided from data).
        \`<Tree ...>{({ datum }) => <Text> datum.name </Text>}</Tree>`,
    ),
  };

  return DocumentedTree;
};

export const themeDoc = {
  'tree.nested.listProps': {
    description: 'Any valid List property for nested mode Tree.',
    type: 'object',
    defaultValue: `{ border: false }`,
  },
  'tree.column.listProps': {
    description: 'Any valid List property for a column mode Tree.',
    type: 'object',
    defaultValue: `{ border: false }`,
  },
};
