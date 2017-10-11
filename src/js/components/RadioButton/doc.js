import { describe, PropTypes } from 'react-desc';

export default (RadioButton) => {
  const DocumentedRadioButton = describe(RadioButton).description('A radio button control.').usage(
    `import { RadioButton } from 'grommet';
    <RadioButton />`
  );

  DocumentedRadioButton.propTypes = {
    checked: PropTypes.bool.description('Same as React <input checked={} />'),
    defaultChecked: PropTypes.bool.description('Same as React <input defaultChecked={} />'),
    disabled: PropTypes.bool.description(
      `Same as React <input disabled={} />. Also adds a hidden input element
      with the same name so form submissions work.`
    ),
    id: PropTypes.string.description(
      'The DOM id attribute value to use for the underlying <input/> element.'
    ),
    label: PropTypes.node.description('Label text to place next to the control.'),
    name: PropTypes.string.description(
      'The DOM name attribute value to use for the underlying <input/> element.'
    ),
    onChange: PropTypes.func.description('Same as React <input onChange={} />'),
  };

  return DocumentedRadioButton;
};
