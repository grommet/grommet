import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]),
  };
}
export const TagPropTypes = PropType;
