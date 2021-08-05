import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

export const TabsPropType = {
  ...genericProps,
  activeIndex: PropTypes.number,
  alignControls: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  children: PropTypes.node.isRequired,
  flex: PropTypes.oneOfType([
    PropTypes.oneOf(['grow', 'shrink']),
    PropTypes.bool,
  ]),
  justify: PropTypes.oneOf(['start', 'center', 'end']),
  messages: PropTypes.shape({
    tabContents: PropTypes.string,
  }),
  onActive: PropTypes.func,
};
