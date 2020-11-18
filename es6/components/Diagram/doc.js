import { describe, PropTypes } from 'react-desc';
import { colorPropType } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Diagram) {
  var DocumentedDiagram = describe(Diagram).availableAt(getAvailableAtBadge('Diagram', 'Visualizations')).description("Graphical connection lines. Diagram is meant to be used with Stack.\n      Boxes can be used in the `guidingChild` layer of Stack and then\n      Diagram can be used to draw lines connecting the Boxes.").usage("import { Diagram } from 'grommet';\n<Diagram />").intrinsicElement('svg');
  DocumentedDiagram.propTypes = {
    connections: PropTypes.arrayOf(PropTypes.shape({
      anchor: PropTypes.oneOf(['center', 'vertical', 'horizontal']),
      color: colorPropType,
      fromTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      label: PropTypes.string,
      // for accessibility
      offset: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']), PropTypes.string]),
      thickness: PropTypes.oneOfType([PropTypes.oneOf(['hair', 'xxsmall', 'xsmall', 'small', 'medium', 'large']), PropTypes.string]),
      toTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      type: PropTypes.oneOf(['direct', 'curved', 'rectilinear'])
    })).description("Array of objects describing the connections.\n      The 'fromTarget' and 'toTarget' may be either DOM element ids or\n      React references.\n      'offset' can be used to shift a bit to reduce the amount of overlap\n      with other connection lines to make the lines easier to distinguish.").isRequired
  };
  return DocumentedDiagram;
};
export var themeDoc = {
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