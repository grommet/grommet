import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.bool),
      PropTypes.arrayOf(
        PropTypes.shape({
          disabled: PropTypes.bool,
          id: PropTypes.string,
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
          value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
          ]),
        }),
      ),
    ]),
  };
}
export const ThumbsRatingPropTypes = PropType;
