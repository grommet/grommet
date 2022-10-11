import PropTypes from 'prop-types';

import {
  genericProps,
  heightPropType,
  padPropType,
  roundPropType,
  skeletonColorsPropType,
  widthPropType,
} from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    as: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.element,
    ]),
    colors: skeletonColorsPropType,
    height: heightPropType,
    pad: padPropType,
    round: roundPropType,
    width: widthPropType,
  };
}
export const SkeletonPropTypes = PropType;
