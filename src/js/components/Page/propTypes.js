import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    plain: PropTypes.bool,
    kind: PropTypes.string,
  };
}
export const PagePropTypes = PropType;
