import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    activeIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
    animate: PropTypes.bool,
    children: PropTypes.node,
    level: PropTypes.number,
    onActive: PropTypes.func,
    multiple: PropTypes.bool,
    messages: PropTypes.shape({
      tabContents: PropTypes.string,
    }),
  };
}
export const AccordionPropTypes = PropType;
