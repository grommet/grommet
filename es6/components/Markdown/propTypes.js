import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    components: PropTypes.object,
    options: PropTypes.shape({})
  };
}

export var MarkdownPropTypes = PropType;