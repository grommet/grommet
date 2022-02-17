import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    full: PropTypes.bool,
  };
}
export const PageSectionPropTypes = PropType;
