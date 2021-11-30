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
    animationDuration: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    previous: PropTypes.number,
    direction: PropTypes.string,
  };
}
export const CarouselChildPropTypes = CarouselChildPropType;

let CarouselControlsPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselControlsPropType = {
    current: PropTypes.number.isRequired,
    wrap: PropTypes.bool.isRequired,
    controls: PropTypes.oneOfType([
      PropTypes.oneOf(['arrows', 'selectors']),
      PropTypes.bool,
    ]).isRequired,
    numSlides: PropTypes.number.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onSelectorNavigation: PropTypes.func.isRequired,
  };
}
export const CarouselControlsPropTypes = CarouselControlsPropType;
