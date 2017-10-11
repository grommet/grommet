import { describe, PropTypes } from 'react-desc';

export default (Grommet) => {
  const DocumentedGrommet = describe(Grommet)
    .description('This is the top level Grommet container.')
    .usage(
      `import { Grommet } from 'grommet';
      <Grommet>...</Grommet>`
    );

  DocumentedGrommet.propTypes = {
    dir: PropTypes.oneOf(['rtl', 'ltr']).description(
      `Whether text should be rendered right to left or not. Defaults to
      inherit from the document context.`
    ),
    theme: PropTypes.object.description('Custom styles for Grommet app component.'),
  };

  return DocumentedGrommet;
};
