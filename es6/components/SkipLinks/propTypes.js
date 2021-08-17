import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: PropTypes.node.isRequired,
    messages: PropTypes.shape({
      skipTo: PropTypes.string
    })
  };
}

export var SkipLinksPropTypes = PropType;