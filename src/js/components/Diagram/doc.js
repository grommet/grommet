import { describe, PropTypes } from 'react-desc';

import { colorPropType } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';

const ANIMATION_PROP = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.oneOf(['pulse', 'draw']),
  PropTypes.shape({
    type: PropTypes.oneOf(['pulse', 'draw']),
    delay: PropTypes.number,
    duration: PropTypes.number,
    size: PropTypes.oneOf([
      'xsmall',
      'small',
      'medium',
      'large',
      'xlarge',
    ]).description('Size is only applicable when using "pulse"'),
  }),
]);

export const doc = Diagram => {
  const DocumentedDiagram = describe(Diagram)
    .availableAt(getAvailableAtBadge('Diagram', 'Visualizations'))
    .description(
      `Graphical connection lines. Diagram is meant to be used with Stack.
      Boxes can be used in the \`guidingChild\` layer of Stack and then
      Diagram can be used to draw lines connecting the Boxes.`,
    )
    .usage("import { Diagram } from 'grommet';\n<Diagram />")
    .intrinsicElement('svg');

  DocumentedDiagram.propTypes = {
    animation: ANIMATION_PROP.description(
      'Animation to be used by entire Diagram',
    ),
    connections: PropTypes.arrayOf(
      PropTypes.shape({
        anchor: PropTypes.oneOf(['center', 'vertical', 'horizontal']),
        animation: ANIMATION_PROP,
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
      'animation' can be used to give specific connections their own animation.
      'offset' can be used to shift a bit to reduce the amount of overlap
      with other connection lines to make the lines easier to distinguish.`,
    ).isRequired,
  };

  return DocumentedDiagram;
};

export const themeDoc = {
  'diagram.animation': {
    description: 'The animation configuration for Diagram.',
    type: 'object',
    defaultValue: `{
      duration: '1s',
      pulse: {
        duration: 1000,
      },     
      draw: {
        duration: 2000,
      },
    }`,
  },
  'diagram.extend': {
    description: 'Any additional style for Diagram.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'diagram.line.color': {
    description: 'The color of the connection line.',
    type: 'string | {dark: string, light: string}',
    defaultValue: 'accent-1',
  },
  'global.colors': {
    description: 'Color options.',
    type: 'object',
    defaultValue: `{
      "accent-1": "#6FFFB0",
      "graph-0": "accent-1",
      "graph-1": "neutral-1",
      ...
    }`,
  },
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
};
