import PropTypes from 'prop-types';

import {
  genericProps,
  heightPropType,
  padPropType,
  roundPropType,
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
    colors: PropTypes.shape({
      dark: PropTypes.arrayOf(PropTypes.string),
      light: PropTypes.arrayOf(PropTypes.string),
    }),
    height: heightPropType,
    pad: padPropType,
    round: roundPropType,
    width: widthPropType,
  };
}
export const SkeletonPropTypes = PropType;
