import PropTypes from 'prop-types';

export const CollapsiblePropType = {
  open: PropTypes.bool,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
};
