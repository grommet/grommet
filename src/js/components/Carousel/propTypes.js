import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let CarouselPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselPropType = {
    ...genericProps,
    activeChild: PropTypes.number,
    initialChild: PropTypes.number,
    fill: PropTypes.bool,
    controls: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onChild: PropTypes.func,
    play: PropTypes.number,
  };
}
export const CarouselPropTypes = CarouselPropType;

let CarouselChildPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselChildPropType = {
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
    controls: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
      .isRequired,
    numSlides: PropTypes.number.isRequired,
    inTransition: PropTypes.bool.isRequired,
    onNext: PropTypes.func.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onJumpNavigation: PropTypes.func.isRequired,
  };
}
export const CarouselControlsPropTypes = CarouselControlsPropType;
