function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import PropTypes from 'prop-types';
import { genericProps, widthPropType, heightPropType } from '../../utils/general-prop-types';
var CarouselPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselPropType = _extends({}, genericProps, {
    activeChild: PropTypes.number,
    initialChild: PropTypes.number,
    fill: PropTypes.bool,
    wrap: PropTypes.bool,
    controls: PropTypes.oneOfType([PropTypes.oneOf(['arrows', 'selectors']), PropTypes.bool]),
    onChild: PropTypes.func,
    width: widthPropType,
    height: heightPropType,
    play: PropTypes.number
  });
}
export var CarouselPropTypes = CarouselPropType;
var CarouselChildPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselChildPropType = {
    animationDuration: PropTypes.number.isRequired,
    fill: PropTypes.bool,
    index: PropTypes.number.isRequired,
    activeIndex: PropTypes.number.isRequired,
    priorActiveIndex: PropTypes.number,
    direction: PropTypes.oneOf(['left', 'right'])
  };
}
export var CarouselChildPropTypes = CarouselChildPropType;