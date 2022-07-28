import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    content: PropTypes.node,
    dropProps: PropTypes.object,
    plain: PropTypes.bool,
    show: PropTypes.bool,
    onShow: PropTypes.func,
  };
}
export const TipPropTypes = PropType;
