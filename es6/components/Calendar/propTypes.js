function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    activeDate: PropTypes.oneOf(['start', 'end']),
    animate: PropTypes.bool,
    bounds: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.func,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]))]),
    dates: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
    disabled: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])),
    daysOfWeek: PropTypes.bool,
    fill: PropTypes.bool,
    firstDayOfWeek: PropTypes.oneOf([0, 1]),
    header: PropTypes.func,
    locale: PropTypes.string,
    messages: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string
    }),
    onReference: PropTypes.func,
    onSelect: PropTypes.func,
    range: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['array'])]),
    reference: PropTypes.string,
    showAdjacentDays: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['trim'])]),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string])
  });
}

export var CalendarPropTypes = PropType;