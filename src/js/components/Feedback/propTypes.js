import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: PropTypes.node,
    feedbackButton: PropTypes.bool,
    layerProps: PropTypes.object,
    messages: PropTypes.object,
    modal: PropTypes.bool,
    onSubmit: PropTypes.func,
    show: PropTypes.bool,
    title: PropTypes.string,
  };
}
export const FileInputPropTypes = PropType;
