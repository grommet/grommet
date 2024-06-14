import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
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
}
export const TabsPropTypes = PropType;
