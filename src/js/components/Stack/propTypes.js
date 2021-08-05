import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

export const StackPropType = {
  ...genericProps,
  anchor: PropTypes.oneOf([
    'center',
    'left',
    'right',
    'top',
    'bottom',
    'top-left',
    'bottom-left',
    'top-right',
    'bottom-right',
  ]),
  fill: PropTypes.oneOfType([
    PropTypes.oneOf(['horizontal', 'vertical']),
    PropTypes.bool,
  ]),
  guidingChild: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['first', 'last']),
  ]),
  interactiveChild: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['first', 'last']),
  ]),
};
