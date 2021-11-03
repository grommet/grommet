import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let CarouselPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselPropType = {
    ...genericProps,
    activeChild: PropTypes.number,
    initialChild: PropTypes.number,
    fill: PropTypes.bool,
    showProgress: PropTypes.bool,
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
    absolute: PropTypes.bool,
    direction: PropTypes.string,
  };
}
export const CarouselChildPropTypes = CarouselChildPropType;
