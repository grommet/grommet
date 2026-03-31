import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    disabled: PropTypes.bool,
    icon: PropTypes.element,
    plain: PropTypes.bool,
    reverse: PropTypes.bool,
    title: PropTypes.node,
  };
}
export const TabPropTypes = PropType;
