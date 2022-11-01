import PropTypes from 'prop-types';
var BORDER_SHAPE = PropTypes.shape({
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  })]),
  side: PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']),
  size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
  style: PropTypes.oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'])
});
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    border: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all']), BORDER_SHAPE, PropTypes.arrayOf(BORDER_SHAPE)]),
    plain: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['noPad'])]),
    scope: PropTypes.oneOf(['col', 'row']),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4']), PropTypes.string]),
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    align: PropTypes.oneOfType([PropTypes.oneOf(['left', 'right', 'center', 'justify', 'inherit', 'start', 'end']), PropTypes.string])
  };
}
export var TableCellPropTypes = PropType;