import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    header: PropTypes.node,
  };
}
export const AccordionPanelPropTypes = PropType;
