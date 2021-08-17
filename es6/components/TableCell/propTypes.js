import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    plain: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['noPad'])]),
    scope: PropTypes.oneOf(['col', 'row']),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4']), PropTypes.string]),
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
    align: PropTypes.oneOfType([PropTypes.oneOf(['left', 'right', 'center', 'justify', 'inherit', 'start', 'end']), PropTypes.string])
  };
}

export var TableCellPropTypes = PropType;