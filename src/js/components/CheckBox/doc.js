import { describe, PropTypes } from 'react-desc';

export default (CheckBox) => {
  const DocumentedCheckBox = describe(CheckBox).description('A checkbox toggle control.').usage(
    `import { CheckBox } from 'grommet';
    <CheckBox/>`
  );

  DocumentedCheckBox.propTypes = {
    checked: PropTypes.bool.description('Same as React <input checked={} />'),
    defaultChecked: PropTypes.bool.description('Same as React <input defaultChecked={} />'),
    disabled: PropTypes.bool.description(
      `Same as React <input disabled={} />. Also adds a hidden input element
      with the same name so form submissions work.`,
    ),
    id: PropTypes.string.description(
      'The DOM id attribute value to use for the underlying <input/> element.',
    ),
    label: PropTypes.node.description(
      'Label text to place next to the control.'
    ),
    name: PropTypes.string.description(
      'The DOM name attribute value to use for the underlying <input/> element.'
    ),
    onChange: PropTypes.func.description('Same as React <input onChange={} />'),
    reverse: PropTypes.bool.description(
      'Whether to show the label in front of the checkbox.'
    ),
    toggle: PropTypes.bool.description(
      'Whether to visualize it as a toggle switch.'
    ),
  };

  return DocumentedCheckBox;
};
