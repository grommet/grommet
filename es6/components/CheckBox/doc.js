import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(CheckBox) {
  var DocumentedCheckBox = describe(CheckBox).availableAt(getAvailableAtBadge('CheckBox')).description('A checkbox toggle control.').usage("import { CheckBox } from 'grommet';\n<CheckBox />").intrinsicElement('input');
  DocumentedCheckBox.propTypes = {
    checked: PropTypes.bool.description('Same as React <input checked={} />').defaultValue(false),
    disabled: PropTypes.bool.description("Same as React <input disabled={} />. Also adds a hidden input element\n      with the same name so form submissions work.").defaultValue(false),
    id: PropTypes.string.description('The DOM id attribute value to use for the underlying <input/> element.'),
    label: PropTypes.node.description('Label text to place next to the control.'),
    name: PropTypes.string.description('The DOM name attribute value to use for the underlying <input/> element.'),
    onChange: PropTypes.func.description("Function that will be called when the user clicks the check box. It\n      will be passed a React event object. The current state can be accessed\n      via event.target.checked. Same as React <input onChange={} />."),
    reverse: PropTypes.bool.description('Whether to show the label in front of the checkbox.').defaultValue(false),
    toggle: PropTypes.bool.description('Whether to visualize it as a toggle switch.').defaultValue(false),
    indeterminate: PropTypes.bool.description("Whether state is indeterminate.\nNOTE: This can only be used with non-toggle components").defaultValue(false)
  };
  return DocumentedCheckBox;
};
export var themeDoc = {
  'checkBox.border.color': {
    description: 'The border color when unchecked.',
    type: "string | { 'dark': string, 'light': string }",
    defaultValue: "{ dark: 'rgba(255, 255, 255, 0.5)', light: 'rgba(0, 0, 0, 0.15)' }"
  },
  'checkBox.border.width': {
    description: 'The border width when unchecked.',
    type: 'string',
    defaultValue: '2px'
  },
  'checkBox.check.extend': {
    description: 'Any additional style for checked CheckBox.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'checkBox.check.radius': {
    description: 'The radius of the checked icon.',
    type: 'string',
    defaultValue: '4px'
  },
  'checkBox.check.thickness': {
    description: 'The stroke width of the checked icon.',
    type: 'string',
    defaultValue: '4px'
  },
  'checkBox.color': {
    description: 'The stroke color for the CheckBox icon, and the border when checked.',
    type: "string | { 'dark': string, 'light': string }",
    defaultValue: undefined
  },
  'checkBox.extend': {
    description: 'Any additional style for CheckBox.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'checkBox.gap': {
    description: 'The right margin of the CheckBox to its label.',
    type: 'string',
    defaultValue: undefined
  },
  'checkBox.hover.border.color': {
    description: 'The border color on hover.',
    type: "string | { 'dark': string, 'light': string }",
    defaultValue: "{ dark: 'white', light: 'black' }"
  },
  'checkBox.icon.size': {
    description: 'The size of the checked icon.',
    type: 'string',
    defaultValue: undefined
  },
  'checkBox.icon.extend': {
    description: 'Any additional style for CheckBox icon.',
    type: 'string | (props)=>{}',
    defaultValue: undefined
  },
  'checkBox.icons.checked': {
    description: 'The icon to use when checked.',
    type: 'React.Element',
    defaultValue: undefined
  },
  'checkBox.icons.indeterminate': {
    description: 'The icon to use when indeterminate.',
    type: 'React.Element',
    defaultValue: undefined
  },
  'checkBox.size': {
    description: 'The height and width used for the CheckBox icon.',
    type: 'string',
    defaultValue: '24px'
  },
  'checkBox.toggle.background': {
    description: 'The background color of the toggle.',
    type: "string | { 'dark': string, 'light': string }",
    defaultValue: undefined
  },
  'checkBox.toggle.color': {
    description: 'The color of the toggle knob.',
    type: "string | { 'dark': string, 'light': string }",
    defaultValue: "{ dark: '#d9d9d9', light: '#d9d9d9' }"
  },
  'checkBox.toggle.extend': {
    description: 'Any additional style for CheckBox toggle.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'checkBox.toggle.knob.extend': {
    description: 'Any additional style for the CheckBox toggle knob.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'checkBox.toggle.radius': {
    description: 'The border radius used for the toggle and the knob.',
    type: 'string',
    defaultValue: '24px'
  },
  'checkBox.toggle.size': {
    description: 'The width size of the toggle.',
    type: 'string',
    defaultValue: '42px'
  }
};