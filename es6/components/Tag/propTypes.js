import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onRemove: PropTypes.func,
    messages: PropTypes.shape({
      removeLabel: PropTypes.shape({
        nameAndValue: PropTypes.string,
        valueOnly: PropTypes.string
      })
    }),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string])
  };
}
export var TagPropTypes = PropType;