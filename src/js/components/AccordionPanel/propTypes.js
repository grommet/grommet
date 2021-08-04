import PropTypes from 'prop-types';

export const AccordionPanelPropType = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  header: PropTypes.node,
};
