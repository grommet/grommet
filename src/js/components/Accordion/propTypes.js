import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

export const AccordionPropType = {
  ...genericProps,
  activeIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  animate: PropTypes.bool,
  children: PropTypes.node,
  onActive: PropTypes.func,
  multiple: PropTypes.bool,
  messages: PropTypes.shape({
    tabContents: PropTypes.string,
  }),
};
