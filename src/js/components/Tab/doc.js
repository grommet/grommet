import { describe, PropTypes } from 'react-desc';

export const doc = (Tab) => {
  const DocumentedTab = describe(Tab)
    .description('One tab within Tabs.'
    ).usage(
      `import { Tab } from 'grommet';
<Tab />`
    );

  DocumentedTab.propTypes = {
    title: PropTypes.string
      .description('The title of the tab.'),
  };

  return DocumentedTab;
};
