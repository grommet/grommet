import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    activeChild: PropTypes.number,
    fill: PropTypes.bool,
    play: PropTypes.number,
    initialChild: PropTypes.number,
    onChild: PropTypes.func,
    controls: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['arrows', 'selectors']),
    ]),
  };
}
export const CarouselPropTypes = PropType;

let CarouselChildPropType;
if (process.env.NODE_ENV !== 'production') {
  CarouselChildPropType = {
    fill: PropTypes.bool,
    play: PropTypes.number,
    index: PropTypes.number.isRequired,
    activeIndex: PropTypes.number.isRequired,
    priorActiveIndex: PropTypes.number,
  };
}
export const CarouselChildPropTypes = CarouselChildPropType;
