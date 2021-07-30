import PropTypes from 'prop-types';

export const AccordionPanelType = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  header: PropTypes.node,
};
