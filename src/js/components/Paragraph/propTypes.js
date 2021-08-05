import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';

export const ParagraphPropType = {
  ...genericProps,
  color: colorPropType,
  fill: PropTypes.bool,
  responsive: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']),
    PropTypes.string,
  ]),
  textAlign: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
};
