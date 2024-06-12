import PropTypes from 'prop-types';
import {
  genericProps,
  widthPropType,
  heightPropType,
} from '../../utils/general-prop-types';

let CarouselPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselPropType = {
    ...genericProps,
    activeChild: PropTypes.number,
    initialChild: PropTypes.number,
    fill: PropTypes.bool,
    wrap: PropTypes.bool,
    controls: PropTypes.oneOfType([
      PropTypes.oneOf(['arrows', 'selectors']),
      PropTypes.bool,
    ]),
    onChild: PropTypes.func,
    width: widthPropType,
    height: heightPropType,
    play: PropTypes.number,
  };
}
export const CarouselPropTypes = CarouselPropType;

let CarouselChildPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselChildPropType = {
    animationDuration: PropTypes.number,
    fill: PropTypes.bool,
    index: PropTypes.number,
    activeIndex: PropTypes.number,
    priorActiveIndex: PropTypes.number,
    direction: PropTypes.oneOf(['left', 'right']),
  };
}
export const CarouselChildPropTypes = CarouselChildPropType;
