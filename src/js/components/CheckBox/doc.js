import { schema, PropTypes } from 'react-desc';

export default CheckBox => schema(CheckBox, {
  description: 'A checkbox toggle control.',
  usage: `import { CheckBox } from 'grommet';
  <CheckBox/>`,
  props: {
    checked: [
      PropTypes.bool,
      'Same as React <input checked={} />',
    ],
    defaultChecked: [
      PropTypes.bool,
      'Same as React <input defaultChecked={} />',
    ],
    disabled: [
      PropTypes.bool,
      `Same as React <input disabled={} />. Also adds a hidden input element
      with the same name so form submissions work.`,
    ],
    id: [
      PropTypes.string,
      'The DOM id attribute value to use for the underlying <input/> element.',
    ],
    label: [
      PropTypes.node,
      'Label text to place next to the control.',
    ],
    name: [
      PropTypes.string,
      'The DOM name attribute value to use for the underlying <input/> element.',
    ],
    onChange: [
      PropTypes.func,
      'Same as React <input onChange={} />',
    ],
    reverse: [
      PropTypes.bool,
      'Whether to show the label in front of the checkbox. Defaults to false.',
    ],
    toggle: [
      PropTypes.bool,
      'Whether to visualize it as a toggle switch. Defaults to false.',
    ],
  },
});
