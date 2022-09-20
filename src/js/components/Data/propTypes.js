import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
  };
}
export const DataPropTypes = PropType;
