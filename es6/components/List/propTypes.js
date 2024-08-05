function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { backgroundDoc, genericProps, padPropType } from '../../utils/general-prop-types';
import { BoxPropTypes } from '../Box/propTypes';
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
    defaultItemProps: PropTypes.shape(BoxPropTypes),
    disabled: PropTypes.arrayOf(PropTypes.string),
    showIndex: PropTypes.bool,
    itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    itemProps: PropTypes.shape({}),
    onActive: PropTypes.func,
    onClickItem: PropTypes.func,
    onMore: PropTypes.func,
    onOrder: PropTypes.func,
    pad: PropTypes.oneOfType([padPropType]),
    paginate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    pinned: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      background: backgroundDoc,
      color: PropTypes.string,
      icon: PropTypes.element
    })]),
    primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    secondaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    show: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
      page: PropTypes.number
    })]),
    step: PropTypes.number
  });
}
export var ListPropTypes = PropType;