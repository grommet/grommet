import PropTypes from 'prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.node, PropTypes.string, PropTypes.number]),
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  };
}
export var NameValuePairType = PropType;