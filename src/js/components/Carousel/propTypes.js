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
