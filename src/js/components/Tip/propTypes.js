import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    content: PropTypes.node,
    dropProps: PropTypes.object,
    plain: PropTypes.bool,
    defaultVisible: PropTypes.bool,
  };
}
export const TipPropTypes = PropType;
