function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    activeChild: PropTypes.number,
    fill: PropTypes.bool,
    play: PropTypes.number,
    initialChild: PropTypes.number,
    onChild: PropTypes.func,
    controls: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['arrows', 'selectors'])])
  });
}

export var CarouselPropTypes = PropType;
var CarouselChildPropType;

if (process.env.NODE_ENV !== 'production') {
  CarouselChildPropType = {
    fill: PropTypes.bool,
    play: PropTypes.number,
    index: PropTypes.number.isRequired,
    activeIndex: PropTypes.number.isRequired,
    priorActiveIndex: PropTypes.number
  };
}

export var CarouselChildPropTypes = CarouselChildPropType;