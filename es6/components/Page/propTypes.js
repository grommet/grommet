import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    kind: PropTypes.string
  };
}
export var PagePropTypes = PropType;