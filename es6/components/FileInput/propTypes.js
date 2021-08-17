import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    messages: PropTypes.shape({
      browse: PropTypes.string,
      dropPrompt: PropTypes.string,
      dropPromptMultiple: PropTypes.string,
      files: PropTypes.string,
      remove: PropTypes.string,
      removeAll: PropTypes.string
    }),
    multiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      aggregateThreshold: PropTypes.number
    })]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    renderFile: PropTypes.func
  };
}

export var FileInputPropTypes = PropType;