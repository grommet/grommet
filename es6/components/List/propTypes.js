function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps, padPropType } from '../../utils/general-prop-types';
var sizes = ['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right', 'start', 'end'];
var padShapeSides = {};
sides.forEach(function (side) {
  padShapeSides[side] = PropTypes.oneOf(sizes);
});
var borderTypes = [PropTypes.bool, PropTypes.oneOf(sides), PropTypes.shape({
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  })]),
  side: PropTypes.oneOf(sides),
  size: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])
})];
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    action: PropTypes.func,
    as: PropTypes.string,
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    border: PropTypes.oneOfType(borderTypes),
    data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    children: PropTypes.func,
    itemProps: PropTypes.shape({}),
    onMore: PropTypes.func,
    onClickItem: PropTypes.func,
    onOrder: PropTypes.func,
    pad: PropTypes.oneOfType([padPropType]),
    paginate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    secondaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    show: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
      page: PropTypes.number
    })]),
    step: PropTypes.number
  });
}

export var ListPropTypes = PropType;