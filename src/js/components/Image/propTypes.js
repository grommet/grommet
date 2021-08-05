import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

export const ImagePropType = {
  ...genericProps,
  fill: PropTypes.oneOfType([
    PropTypes.oneOf(['horizontal', 'vertical']),
    PropTypes.bool,
  ]),
  fit: PropTypes.oneOf(['cover', 'contain']),
  fallback: PropTypes.string,
  opacity: PropTypes.oneOfType([
    PropTypes.oneOf(['weak', 'medium', 'strong']),
    PropTypes.string,
    PropTypes.bool,
  ]),
};
