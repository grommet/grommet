import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

export const CarouselType = {
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
