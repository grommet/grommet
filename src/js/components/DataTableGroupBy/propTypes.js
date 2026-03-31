import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        property: PropTypes.string,
      })),
    ]),
  };
}
export const DataTableGroupByPropTypes = PropType;
