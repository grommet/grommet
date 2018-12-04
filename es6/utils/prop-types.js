import { PropTypes } from 'react-desc';
export var a11yTitlePropType = PropTypes.string.description('Custom title to be used by screen readers.');
export var backgroundPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  color: PropTypes.string,
  opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool])
})]).description('Background color');
export var colorPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  dark: PropTypes.string,
  light: PropTypes.string
})]);
var MARGIN_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
export var genericProps = {
  a11yTitle: a11yTitlePropType,
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description("How to align along the cross axis when contained in\n      a Box or along the column axis when contained in a Grid."),
  gridArea: PropTypes.string.description("The name of the area to place\n    this inside a parent Grid."),
  margin: PropTypes.oneOfType([PropTypes.oneOf(['none'].concat(MARGIN_SIZES)), PropTypes.shape({
    bottom: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
    horizontal: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
    left: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
    right: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
    top: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string]),
    vertical: PropTypes.oneOfType([PropTypes.oneOf(MARGIN_SIZES), PropTypes.string])
  }), PropTypes.string]).description("The amount of margin around the component. An object can\n      be specified to distinguish horizontal margin, vertical margin, and\n      margin on a particular side.")
};