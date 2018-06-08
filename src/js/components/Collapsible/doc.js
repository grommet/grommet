import { describe, PropTypes } from 'react-desc';

export default (Collapsible) => {
  const DocumentedCollapsible = describe(Collapsible)
    .description(
      'A react component that expand/collapse animation.'
    ).usage(
      `import { Collapsible } from 'grommet';
<Collapsible open={true}>test</Collapsible>`
    );

  DocumentedCollapsible.propTypes = {
    open: PropTypes.bool.description(
      'Whether or not the component should be open.'
    ),
  };

  return DocumentedCollapsible;
};
