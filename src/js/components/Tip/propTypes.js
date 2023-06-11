import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    content: PropTypes.node,
    deactivated: PropTypes.bool,
    dropProps: PropTypes.object,
    plain: PropTypes.bool,
  };
}
export const TipPropTypes = PropType;
