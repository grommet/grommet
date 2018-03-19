import { describe, PropTypes } from 'react-desc';

import { a11yTitlePropType, backgroundPropType, getAvailableAtBadge } from '../../utils';

export default (Select) => {
  const DocumentedSelect = describe(Select)
    .availableAt(getAvailableAtBadge('Select'))
    .description(
      'An select-like field with optional search capability.'
    ).usage(
      `import { Select } from 'grommet';
<Select />`
    );

  DocumentedSelect.propTypes = {
    a11yTitle: a11yTitlePropType,
    children: PropTypes.func.description(
      'Function that will be called when each option is rendered.'
    ),
    disabled: PropTypes.bool
      .description('Whether the select should be disabled.'),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right']),
    }).description('How to align the drop.').defaultValue({
      top: 'top',
      left: 'left',
    }),
    dropBackground: backgroundPropType,
    dropSize: PropTypes.string.description(
      'Size of the options container inside the Select drop.'
    ),
    dropTarget: PropTypes.object.description(
      `Target where the options drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the Select itself by default.`),
    focusIndicator: PropTypes.bool.description(
      'Whether when \'plain\' it should receive a focus outline.'
    ),
    messages: PropTypes.shape({
      multiple: PropTypes.string,
    }).description(
      'Custom messages.'
    ),
    multiple: PropTypes.bool.description(
      'Whether to allow multiple options to be selected.'
    ),
    onChange: PropTypes.func.description(
      'Function that will be called when the user selects an option.'
    ),
    onClose: PropTypes.func.description(
      'Function that will be called when the Select drop closes.'
    ),
    onSearch: PropTypes.func.description(
      `Function that will be called when the user types in the search input.
      If this property is not provided, no search field will be rendered.`
    ),
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.object])
    ).description(
      `Options can be either a string or an object. If an object is used, use
      children callback in order to render anything based on the current item.`
    ).isRequired,
    placeholder: PropTypes.string.description(
      'Placeholder text to use when no value is provided.'
    ),
    plain: PropTypes.bool.description(
      'Whether this is a plain Select input with no border or padding.'
    ),
    searchPlaceholder: PropTypes.string.description(
      'Placeholder text to use in the search box when the search input is empty.'
    ),
    selected: PropTypes.oneOfType([
      PropTypes.number, PropTypes.arrayOf(PropTypes.number)]).description(
      `Index of the currently selected option. When multiple, the set of
      options selected. This property is required when multiple.`
    ),
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.element, PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string, PropTypes.element, PropTypes.object,
      ])),
    ]).description(`Currently selected value. This will be an array
      when multiple.`),
  };

  return DocumentedSelect;
};
