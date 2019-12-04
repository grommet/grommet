import { describe, PropTypes } from 'react-desc';

import { colorPropType, getAvailableAtBadge } from '../../utils';

export const doc = Diagram => {
  const DocumentedDiagram = describe(Diagram)
    .availableAt(getAvailableAtBadge('Diagram'))
    .description(
      `Graphical connection lines. Diagram is meant to be used with Stack.
      Boxes can be used in the \`guidingChild\` layer of Stack and then
      Diagram can be used to draw lines connecting the Boxes.`,
    )
    .usage("import { Diagram } from 'grommet';\n<Diagram />")
    .intrinsicElement('svg');

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

export const themeDoc = {
  'global.edgeSize': {
    description: 'The possible sizes for the connections thickness and offset.',
    type: 'object',
    defaultValue: `{
        none: '0px',
        hair: '1px',
        xxsmall: '3px',
        xsmall: '6px',
        small: '12px',
        medium: '24px',
        large: '48px',
        xlarge: '96px',
        responsiveBreakpoint: 'small',
    }`,
  },
  'global.graph.colors': {
    description: 'The colors to use when not specified via connections.',
    type: '[string]',
    defaultValue: "['accent-1', 'neutral-1', 'accent-2', 'neutral-2']",
  },
  'diagram.extend': {
    description: 'Any additional style for Diagram.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'diagram.line.color': {
    description: 'The color of the connection line.',
    type: 'string',
    defaultValue: 'accent-1',
  },
}
