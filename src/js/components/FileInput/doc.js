import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';

export const doc = FileInput => {
  const DocumentedFileInput = describe(FileInput)
    .availableAt(getAvailableAtBadge('FileInput'))
    .description('A control to input one or more files.')
    .usage(
      `import { FileInput } from 'grommet';
<FileInput id='file' name='file' />`,
    )
    .intrinsicElement('input');

  DocumentedFileInput.propTypes = {
    accept: PropTypes.string.description(
      'MIME type pattern to match against. For example: "image/*".',
    ),
    disabled: PropTypes.bool
      .description('Whether the control is disabled.')
      .defaultValue(false),
    id: PropTypes.string.description('The id attribute of the input.'),
    fileLabel: PropTypes.node.description(
      `Provides custom rendering of the file. If not provided, the file's
      name will be shown. It will be passed the browser File object as
      an argument. For example: (file) => <Text>{file.name}</Text>`,
    ),
    messages: PropTypes.shape({
      browse: PropTypes.string,
      dropPrompt: PropTypes.string,
      dropPromptMultiple: PropTypes.string,
      files: PropTypes.string,
      remove: PropTypes.string,
      removeAll: PropTypes.string,
    })
      .description(
        `Custom messages for FileInput. Used for accessibility by screen
        readers.`,
      )
      .defaultValue({
        browse: 'browse',
        dropPrompt: 'Drop file here or',
        dropPromptMultiple: 'Drop files here or',
        files: 'files',
        remove: 'remove',
        removeAll: 'remove all',
      }),
    multiple: PropTypes.bool.description('Whether to allow multiple files'),
    name: PropTypes.string.description(
      `The name attribute of the input. This is required when used within
      a Form.`,
    ),
    onChange: PropTypes.func.description(
      `Function that will be called when one or more files are added the
      input. The file(s) can be found in event.target.files.`,
    ),
  };

  return DocumentedFileInput;
};

export const themeDoc = {
  ...themeDocUtils.inputStyle,
  'fileInput.background': {
    description: 'The Box background prop for the container.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.border': {
    description: 'The Box border prop for the container.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.dragOver.background': {
    description: 'Background to use when dragging over.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.dragOver.border': {
    description: 'Background to use when dragging over.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.hover.background': {
    description: 'Background to use when hovering.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.hover.border': {
    description: 'Background to use when hovering.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.icons.remove': {
    description: 'The icon to use for the control to remove a chosen file.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.label': {
    description: 'The Text props to use for the file label.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.message': {
    description: `The Text props to use for the message shown before a file
      has been selected.`,
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.pad': {
    description: 'The Box pad prop for the container.',
    type: 'string',
    defaultValue: undefined,
  },
  'fileInput.round': {
    description: 'The Box round prop for the container.',
    type: 'string',
    defaultValue: undefined,
  },
};
