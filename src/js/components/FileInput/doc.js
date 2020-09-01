import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge, themeDocUtils } from '../../utils';

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
    id: PropTypes.string.description('The id attribute of the input.'),
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
    name: PropTypes.string.description('The name attribute of the input.'),
    onChange: PropTypes.func.description(
      `Function that will be called when one or more files are added the
      input. The file(s) can be found in event.target.files.`,
    ),
  };

  return DocumentedFileInput;
};

export const themeDoc = {
  ...themeDocUtils.inputStyle,
};
