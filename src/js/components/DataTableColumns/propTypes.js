import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    drop: PropTypes.bool.isRequired,
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          disabled: PropTypes.bool,
          label: PropTypes.string,
          pinned: PropTypes.bool,
          property: PropTypes.string,
        }),
      ),
    ]).isRequired,
  };
}
export const DataTableColumnsPropTypes = PropType;
