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

let NewCarouselPropType;
if (process.env.NODE_ENV !== 'production') {
  NewCarouselPropType = {
    initialChild: PropTypes.number,
    fill: PropTypes.bool,
    a11yTitle: PropTypes.string,
    alignSelf: PropTypes.string,
    gridArea: PropTypes.string,
    controls: PropTypes.string,
    onChild: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    margin: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  };
}
export const NewCarouselPropTypes = NewCarouselPropType;

let NewCarouselChildPropType;
if (process.env.NODE_ENV !== 'production') {
  NewCarouselChildPropType = {
    index: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    previous: PropTypes.number,
    direction: PropTypes.string,
  };
}
export const NewCarouselChildPropTypes = NewCarouselChildPropType;
