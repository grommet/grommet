import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Breadcrumb => {
  const DocumentedBreadcrumb = describe(Breadcrumb)
    .availableAt(getAvailableAtBadge('Breadcrumb'))
    .description(
      'A control to select values, with customized radiobutton group.')
    .usage(
      `import { Breadcrumb } from 'mnet-ui-base';
      <Breadcrumb />`,
    );
  // We don't include svg due to a collision on the values property
  // .intrinsicElement('select');

  DocumentedBreadcrumb.propTypes = {
    ...genericProps,
    data: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
      }),
    ])).description(`Data for breadcrumb`),
    icon: PropTypes.node.description(
      `Icon for separator between two breadcrumb item`,
    ),
    onValueSelect: PropTypes.func.description(`On breadcrumb selection`),
  };

  return DocumentedBreadcrumb;
};
