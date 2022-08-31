import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    color: colorPropType,
    fill: PropTypes.bool,
    maxLines: PropTypes.number,
    responsive: PropTypes.bool,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']),
      PropTypes.string,
    ]),
    textAlign: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
  };
}
export const ParagraphPropTypes = PropType;
