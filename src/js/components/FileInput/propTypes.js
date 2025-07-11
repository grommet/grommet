import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    confirmRemove: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    maxSize: PropTypes.number,
    messages: PropTypes.shape({
      alert: PropTypes.shape({
        maxFile: PropTypes.string,
        maxSize: PropTypes.string,
      }),
      browse: PropTypes.string,
      dropPrompt: PropTypes.string,
      dropPromptMultiple: PropTypes.string,
      files: PropTypes.string,
      maxFile: PropTypes.string,
      maxSizeSingle: PropTypes.string,
      maxSizeMultiple: PropTypes.shape({
        singular: PropTypes.string,
        plural: PropTypes.string,
      }),
      remove: PropTypes.string,
      removeAll: PropTypes.string,
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
