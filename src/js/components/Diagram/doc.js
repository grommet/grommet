import { describe, PropTypes } from 'react-desc';

import { colorPropType, getAvailableAtBadge } from '../../utils';

export const doc = Diagram => {
  const DocumentedDiagram = describe(Diagram)
    .availableAt(getAvailableAtBadge('Diagram'))
    .description(
      `Graphical lines between DOM elements.
      Diagram is meant to be used with Stack.`,
    )
    .usage("import { Diagram } from 'grommet';\n<Diagram />");

  DocumentedDiagram.propTypes = {
    connections: PropTypes.arrayOf(
      PropTypes.shape({
        anchor: PropTypes.oneOf(['center', 'vertical', 'horizontal']),
        color: colorPropType,
        fromTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
          .isRequired,
        label: PropTypes.string, // for accessibility
        offset: PropTypes.oneOfType([
          PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
          PropTypes.string,
        ]),
        thickness: PropTypes.oneOfType([
          PropTypes.oneOf([
            'hair',
            'xxsmall',
            'xsmall',
            'small',
            'medium',
            'large',
          ]),
          PropTypes.string,
        ]),
        toTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
          .isRequired,
        type: PropTypes.oneOf(['direct', 'curved', 'rectilinear']),
      }),
    ).description(
      `Array of objects describing the connections.
      The 'fromTarget' and 'toTarget' may be either DOM element ids or
      React references.
      'offset' can be used to shift a bit to reduce the amount of overlap
      with other connection lines to make the lines easier to distinguish.`,
    ).isRequired,
  };

  return DocumentedDiagram;
};
