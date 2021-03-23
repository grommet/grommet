function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';
export var doc = function doc(FileInput) {
  var DocumentedFileInput = describe(FileInput).availableAt(getAvailableAtBadge('FileInput', 'Input')).description('A control to input one or more files.').usage("import { FileInput } from 'grommet';\n<FileInput id='file' name='file' />").intrinsicElement('input');
  DocumentedFileInput.propTypes = {
    disabled: PropTypes.bool.description('Whether the control is disabled.').defaultValue(undefined),
    id: PropTypes.string.description('The id attribute of the input.'),
    messages: PropTypes.shape({
      browse: PropTypes.string,
      dropPrompt: PropTypes.string,
      dropPromptMultiple: PropTypes.string,
      files: PropTypes.string,
      remove: PropTypes.string,
      removeAll: PropTypes.string
    }).description("Custom messages for FileInput. Used for accessibility by screen\n        readers.").defaultValue({
      browse: 'browse',
      dropPrompt: 'Drop file here or',
      dropPromptMultiple: 'Drop files here or',
      files: 'files',
      remove: 'remove',
      removeAll: 'remove all'
    }),
    multiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      aggregateThreshold: PropTypes.number
    })]).description("Whether to allow multiple files. If an object is supplied,\n        'aggregageThreshold' indicates the maximum number of individual\n        files to show. Above this, only a single message describing the\n        number of files will be shown.").defaultValue(undefined),
    name: PropTypes.string.description("The name attribute of the input. This is required when used within\n      a Form."),
    onChange: PropTypes.func.description("Function that will be called when one or more files are added to \n      the input. The file(s) can be found in event.target.files."),
    renderFile: PropTypes.func.description("Provides custom rendering of the file. If not provided, the file's\n      name will be shown. It will be passed the browser File object as\n      an argument. For example: (file) => <Text>{file.name}</Text>")
  };
  return DocumentedFileInput;
};
export var themeDoc = _extends({}, themeDocUtils.inputStyle, {
  'fileInput.background': {
    description: 'The background prop for the container.',
    type: 'string | object',
    defaultValue: undefined
  },
  'fileInput.border': {
    description: 'The border prop for the container.',
    type: 'string | object',
    defaultValue: {
      side: 'all',
      size: 'small',
      style: 'dashed'
    }
  },
  'fileInput.dragOver.background': {
    description: 'Background to use when dragging over.',
    type: 'string | object',
    defaultValue: undefined
  },
  'fileInput.dragOver.border': {
    description: 'Background to use when dragging over.',
    type: 'string | object',
    defaultValue: {
      color: 'red'
    }
  },
  'fileInput.dragOver.extend': {
    description: 'Any additional style for container when dragging over it.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'fileInput.extend': {
    description: 'Any additional style for container.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'fileInput.hover.background': {
    description: 'Background to use when hovering.',
    type: 'string | object',
    defaultValue: undefined
  },
  'fileInput.hover.border': {
    description: 'Background to use when hovering.',
    type: 'string | object',
    defaultValue: {
      color: 'brand'
    }
  },
  'fileInput.hover.extend': {
    description: 'Any additional style for container when hovering over it.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'fileInput.icons.remove': {
    description: 'The icon to use for the control to remove a chosen file.',
    type: 'React.Element',
    defaultValue: 'FormClose'
  },
  'fileInput.label': {
    description: 'The Text props to use for the file label.',
    type: 'object',
    defaultValue: {
      margin: 'small'
    }
  },
  'fileInput.message': {
    description: "The Text props to use for the message shown before a file\n      has been selected.",
    type: 'object',
    defaultValue: {
      margin: 'small'
    }
  },
  'fileInput.pad': {
    description: 'The pad prop for the container.',
    type: 'string | object',
    defaultValue: undefined
  },
  'fileInput.round': {
    description: 'The round prop for the container.',
    type: 'string | object',
    defaultValue: undefined
  }
});