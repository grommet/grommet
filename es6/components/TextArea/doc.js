import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(TextArea) {
  var DocumentedTextArea = describe(TextArea).availableAt(getAvailableAtBadge('TextArea')).description('A textarea.').usage("import { TextArea } from 'grommet';\n<TextArea id='item' name='item' />");
  DocumentedTextArea.propTypes = {
    id: PropTypes.string.description('The id attribute of the textarea.'),
    fill: PropTypes.oneOf([true, false]).description('Whether the width and height should fill the container.').defaultValue(false),
    focusIndicator: PropTypes.bool.description('Whether the plain textarea should receive a focus outline.'),
    name: PropTypes.string.description('The name attribute of the textarea.'),
    onChange: PropTypes.func.description('Function that will be called when the user types in the textarea.'),
    placeholder: PropTypes.string.description('Placeholder text to use when no value is provided.'),
    plain: PropTypes.bool.description("Whether this is a plain textarea with no border or padding.\nOnly use this when the containing context provides sufficient affordance."),
    value: PropTypes.string.description('What text to put in the textarea.')
  };
  return DocumentedTextArea;
};