import { describe, PropTypes } from 'react-desc';

export const doc = Tab => {
  const DocumentedTab = describe(Tab)
    .description('One tab within Tabs.')
    .usage(
      `import { Tab } from 'grommet';
<Tab />`,
    )
    .intrinsicElement('button');

  DocumentedTab.propTypes = {
    plain: PropTypes.bool
      .description('Whether this is a plain tab with no style.')
      .defaultValue(false),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).description(
      'The title of the tab.',
    ),
  };

  return DocumentedTab;
};
