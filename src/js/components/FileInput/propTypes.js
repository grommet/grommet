import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    confirmRemove: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    messages: PropTypes.shape({
      browse: PropTypes.string,
      dropPrompt: PropTypes.string,
      dropPromptMultiple: PropTypes.string,
      files: PropTypes.string,
      maxFile: PropTypes.string,
      remove: PropTypes.string,
      removeAll: PropTypes.string,
      maxSizeSingle: PropTypes.string,
      maxSizeMultiple: PropTypes.shape({
        singular: PropTypes.string,
        plural: PropTypes.string,
      }),
      alert: PropTypes.shape({
        maxSize: PropTypes.string,
        maxFile: PropTypes.string,
      }),
    }),
    multiple: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        aggregateThreshold: PropTypes.number,
      }),
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    renderFile: PropTypes.func,
  };
}
export const FileInputPropTypes = PropType;
