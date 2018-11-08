import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Select => {
  const DocumentedSelect = describe(Select)
    .availableAt(getAvailableAtBadge('Select'))
    .description('An select-like field with optional search capability.')
    .usage(
      `import { Select } from 'grommet';
<Select />`,
    );

  DocumentedSelect.propTypes = {
    ...genericProps,
    children: PropTypes.func.description(
      `Function that will be called when each option is rendered.
      It will be passed (option, index, options, state) where option
      is the option to render, index is the index of that option in the
      options array, and state is an object with
      { active, disabled, selected } keys indicating the current state
      of the option.`,
    ),
    closeOnChange: PropTypes.bool
      .description('Wether to close the drop when a selection is made.')
      .defaultValue(true),
    disabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.number),
    ])
      .description(
        'Whether the entire select or individual options should be disabled.',
      )
      .defaultValue(false),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right']),
    })
      .description('How to align the drop.')
      .defaultValue({
        top: 'top',
        left: 'left',
      }),
    dropTarget: PropTypes.object.description(
      `Target where the options drop will be aligned to. This should be
      a React reference. Typically, this is not required as the drop will be
      aligned to the Select itself by default.`,
    ),
    focusIndicator: PropTypes.bool.description(
      "Whether when 'plain' it should receive a focus outline.",
    ),
    messages: PropTypes.shape({
      multiple: PropTypes.string,
    }).description('Custom messages.'),
    multiple: PropTypes.bool.description(
      'Whether to allow multiple options to be selected.',
    ),
    onChange: PropTypes.func.description(
      'Function that will be called when the user selects an option.',
    ),
    onClose: PropTypes.func.description(
      'Function that will be called when the Select drop closes.',
    ),
    onSearch: PropTypes.func.description(
      `Function that will be called when the user types in the search input.
      If this property is not provided, no search field will be rendered.`,
    ),
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.object,
      ]),
    ).description(
      `Options can be either a string or an object. If an object is used, use
      children callback in order to render anything based on the current item.`,
    ).isRequired,
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).description('Placeholder text to use when no value is provided.'),
    plain: PropTypes.bool.description(
      'Whether this is a plain Select input with no border or padding.',
    ),
    searchPlaceholder: PropTypes.string.description(
      'Placeholder text to use in the search box when the search input is empty.',
    ),
    selected: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]).description(
      `Index of the currently selected option. When multiple, the set of
      options selected. This property is required when multiple.`,
    ),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]).description('The size of the select.'),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.object,
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      ),
    ]).description(`Currently selected value. This can be an array
      when multiple. Passing an element allows the caller to control how
      the value is rendered.`),
  };

  return DocumentedSelect;
};
