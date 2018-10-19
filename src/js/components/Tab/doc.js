import { describe, PropTypes } from 'react-desc';

export const doc = (Tab) => {
  const DocumentedTab = describe(Tab)
    .description('One tab within Tabs.')
    .usage(
      `import { Tab } from 'grommet';
<Tab />`
    );

  DocumentedTab.propTypes = {
    header: PropTypes.node.description(
      'If specified, the entire panel header will be managed by the caller.'
    ),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).description('The title of the tab.'),
  };

  return DocumentedTab;
};
