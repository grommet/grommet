function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Select) {
  var DocumentedSelect = describe(Select).availableAt(getAvailableAtBadge('Select', 'Input')).description('A control to select a value, with optional search.').usage("import { Select } from 'grommet';\n<Select />"); // We don't include svg due to a collision on the values property
  // .intrinsicElement('select');

  DocumentedSelect.propTypes = _extends({}, genericProps, {
    children: PropTypes.func.description("Function that will be called when each option is rendered.\n      It will be passed (option, index, options, state) where option\n      is the option to render, index is the index of that option in the\n      options array, and state is an object with\n      { active, disabled, selected } keys indicating the current state\n      of the option."),
    clear: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      position: PropTypes.oneOf(['top', 'bottom']).description("Add a clear option to the top or at the bottom of the\n            container. By default no clear option is present.").defaultValue('top'),
      label: PropTypes.string.description('Label for the clear selection item').defaultValue('Clear selection')
    })]).description("Whether to provide a button option to clear selections.").defaultValue(false),
    closeOnChange: PropTypes.bool.description('Wether to close the drop when a selection is made.').defaultValue(true),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]))]).description("Initially selected value. This can be an array\n      when multiple."),
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]))]).description("Whether the entire select or individual options should be disabled.\n        An array of numbers indicates the indexes into 'options' of the\n        disabled options. An array of strings or objects work the same way\n        as the 'value' to indicate which options are disabled.").defaultValue(false),
    disabledKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description("When the options array contains objects, this property indicates how\n      to determine which options should be disabled. If a string is\n      provided, it is used as the key for each item object and if that key\n      returns truthy, the option is disabled. If a function is provided, it is\n      called with the option and the return value determines if the option\n      is disabled."),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right'])
    }).description('How to align the drop.').defaultValue({
      top: 'bottom',
      left: 'left'
    }),
    dropHeight: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The height of the drop container.'),
    dropTarget: PropTypes.object.description("Target where the options drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the Select itself by default."),
    dropProps: PropTypes.object.description('Any valid Drop prop.'),
    focusIndicator: PropTypes.bool.description("Whether when 'plain' it should receive a focus outline."),
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.node]).description("A custom icon to be used when rendering the select. You can use false to\n       not render an icon at all."),
    labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description("When the options array contains objects, this property indicates how\n      to determine the label of each option. If a string is\n      provided, it is used as the key to retrieve each option's label.\n      If a function is provided, it is called with the option and the\n      return value indicates the label."),
    messages: PropTypes.shape({
      multiple: PropTypes.string
    }).description('Custom messages.'),
    multiple: PropTypes.bool.description("Whether to allow multiple options to be selected. When multiple is true, \n      'value' should be an array of selected options and 'options' should be \n      an array of possible options"),
    name: PropTypes.string.description("The name of the attribute when in a Form or FormField."),
    onChange: PropTypes.func.description('Function that will be called when the user selects an option.'),
    onClose: PropTypes.func.description('Function that will be called when the Select drop closes.'),
    onOpen: PropTypes.func.description('Function that will be called when the Select drop opens.'),
    onSearch: PropTypes.func.description("Function that will be called when the user types in the search input.\n      If this property is not provided, no search field will be rendered."),
    onMore: PropTypes.func.description("Use this to indicate that 'items' doesn't contain all that it could.\n      It will be called when the entire list of items has been rendered.\n      This might be used when the total number of items that could be retrieved\n      is more than you'd want to load into the browser. 'onMore' allows you\n      to lazily fetch more from the server only when needed."),
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.element, PropTypes.object])).description("Options can be either a string or an object. If an object is used, use\n      children callback in order to render anything based on the current item.").isRequired,
    open: PropTypes.bool.description("Control the state of the component."),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]).description('Placeholder to use when no value is provided.'),
    plain: PropTypes.bool.description('Whether this is a plain Select input with no border or padding.'),
    replace: PropTypes.bool.description("Whether to replace previously rendered items with a generic spacing\n      element when they have scrolled out of view. This is more performant but\n      means that in-page searching will not find elements that have been\n      replaced.").defaultValue(true),
    searchPlaceholder: PropTypes.string.description("Placeholder text to use in the search box when the search input is \n      empty."),
    selected: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).description("Index of the currently selected option. When multiple, the set of\n      options selected. NOTE: This is deprecated in favor of indicating\n      the selected values via the 'value' property."),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]).description('The size of the text and icon.'),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.element, // deprecated, use valueLabel
    PropTypes.object, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]))]).description("Currently selected value. This can be an array\n      when multiple. Passing an element allows the caller to control how\n      the value is rendered. Passing an element is deprecated. Instead,\n      use the 'valueLabel' property."),
    valueLabel: PropTypes.node.description("Provides custom rendering of the value. If not provided, Select\n      will render the value automatically."),
    valueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({
      key: PropTypes.string,
      reduce: PropTypes.bool
    })]).description("When the options array contains objects, this property indicates how\n      to determine the value of each option. If a string is\n      provided, it is used as the key to retrieve each option's value.\n      If a function is provided, it is called with the option and the\n      return value indicates the value. If reduce is true, the value\n      coming via the key will be used for the onChange value and the value\n      property is expected to be reduced to align."),
    emptySearchMessage: PropTypes.string.description("Empty option message to display when no matching results were found").defaultValue('No matches found')
  });
  return DocumentedSelect;
};
export var themeDoc = {
  'global.hover.background': {
    description: 'The background style when hovering.',
    type: 'string | { color: string, opacity: string }',
    defaultValue: "{ color: 'active', opacity: 'medium' }"
  },
  'global.hover.color': {
    description: 'The text color when hovering.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }"
  },
  'select.background': {
    description: 'The background color used for Select.',
    type: 'string',
    defaultValue: undefined
  },
  'select.options.container': {
    description: 'Any valid Box prop for the options container.',
    type: 'object',
    defaultValue: "{ align: 'start', pad: 'small' }"
  },
  'select.options.text': {
    description: 'Any valid Text prop for text used inside the options container.',
    type: 'object',
    defaultValue: "{ margin: 'none }"
  },
  'select.container.extend': {
    description: 'Any additional style for the container of the Select component.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'select.clear.container': {
    description: 'Any valid Box prop for the clear button container.',
    type: 'object',
    defaultValue: "{ pad: 'small', background: 'light-2' }"
  },
  'select.clear.text': {
    description: 'Any valid Text prop for text used inside the clear button container.',
    type: 'object',
    defaultValue: "{ color: 'dark-3' }"
  },
  'select.control.open': {
    description: "Any additional style for the Select DropButton when using the\n    controlled open state.",
    type: 'string | object',
    defaultValue: undefined
  },
  'select.control.extend': {
    description: 'Any additional style for the control of the Select component.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'select.icons.margin': {
    description: 'The margin used for Select icons.',
    type: 'string | object',
    defaultValue: undefined
  },
  'select.icons.color': {
    description: 'The color used for Select icons.',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined
  },
  'select.icons.down': {
    description: 'The down icon to use for opening the Select.',
    type: 'React.Element',
    defaultValue: '<FormDown />'
  },
  'select.icons.up': {
    description: 'The up icon to use for closing the Select.',
    type: 'React.Element',
    defaultValue: undefined
  },
  'select.searchInput': {
    description: "Component for the Select search input field.",
    type: 'React.Component',
    defaultValue: undefined
  },
  'select.step': {
    description: "How many items to render at a time.",
    type: 'number',
    defaultValue: 20
  }
};