import { describe, PropTypes } from 'react-desc';
import { colorPropType } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
var animationPropType = PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['pulse', 'draw']), PropTypes.shape({
  type: PropTypes.oneOf(['pulse', 'draw']),
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']).description('Size is only applicable when using "pulse"')
})]);
export var doc = function doc(Diagram) {
  var DocumentedDiagram = describe(Diagram).availableAt(getAvailableAtBadge('Diagram', 'Visualizations')).description("Graphical connection lines. Diagram is meant to be used with Stack.\n      Boxes can be used in the `guidingChild` layer of Stack and then\n      Diagram can be used to draw lines connecting the Boxes.").usage("import { Diagram } from 'grommet';\n<Diagram />").intrinsicElement('svg');
  DocumentedDiagram.propTypes = {
    animation: animationPropType.description('Animation to be used by entire Diagram'),
    connections: PropTypes.arrayOf(PropTypes.shape({
      anchor: PropTypes.oneOf(['center', 'vertical', 'horizontal']),
      animation: animationPropType,
      color: colorPropType,
      fromTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      label: PropTypes.string,
      // for accessibility
      offset: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']), PropTypes.string]),
      thickness: PropTypes.oneOfType([PropTypes.oneOf(['hair', 'xxsmall', 'xsmall', 'small', 'medium', 'large']), PropTypes.string]),
      toTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      type: PropTypes.oneOf(['direct', 'curved', 'rectilinear'])
    })).description("Array of objects describing the connections.\n      The 'fromTarget' and 'toTarget' may be either DOM element ids or\n      React references.\n      'animation' can be used to give specific connections their own animation.\n      'offset' can be used to shift a bit to reduce the amount of overlap\n      with other connection lines to make the lines easier to distinguish.").isRequired
  };
  return DocumentedDiagram;
};
export var themeDoc = {
  'diagram.animation': {
    description: 'Configuration for draw and pulse animations in Diagram.',
    type: 'object',
    defaultValue: "{      \n      pulse: {\n        duration: 1000,\n      },     \n      draw: {\n        duration: 2000,\n      },\n    }"
  },
  'diagram.extend': {
    description: 'Any additional style for Diagram.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'diagram.line.color': {
    description: 'The color of the connection line.',
    type: 'string | {dark: string, light: string}',
    defaultValue: 'accent-1'
  },
  'global.animation': {
    description: 'The animation configuration for Diagram.',
    type: 'object',
    defaultValue: "{\n      duration: '1s'\n    }"
  },
  'global.colors': {
    description: 'Color options.',
    type: 'object',
    defaultValue: "{\n      \"accent-1\": \"#6FFFB0\",\n      \"graph-0\": \"accent-1\",\n      \"graph-1\": \"neutral-1\",\n      ...\n    }"
  },
  'global.edgeSize': {
    description: 'The possible sizes for the connections thickness and offset.',
    type: 'object',
    defaultValue: "{\n        none: '0px',\n        hair: '1px',\n        xxsmall: '3px',\n        xsmall: '6px',\n        small: '12px',\n        medium: '24px',\n        large: '48px',\n        xlarge: '96px',\n        responsiveBreakpoint: 'small',\n    }"
  }
};