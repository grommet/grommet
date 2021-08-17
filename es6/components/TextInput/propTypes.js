import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    defaultSuggestion: PropTypes.number,
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right'])
    }),
    dropHeight: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    dropTarget: PropTypes.object,
    dropProps: PropTypes.object,
    icon: PropTypes.element,
    id: PropTypes.string,
    focusIndicator: PropTypes.bool,
    messages: PropTypes.shape({
      enterSelect: PropTypes.string,
      suggestionsCount: PropTypes.string,
      suggestionsExist: PropTypes.string,
      suggestionIsOpen: PropTypes.string
    }),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onSuggestionSelect: PropTypes.func,
    onSuggestionsOpen: PropTypes.func,
    onSuggestionsClose: PropTypes.func,
    placeholder: PropTypes.node,
    plain: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['full'])]),
    reverse: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl', '3xl', '4xl', '5xl', '6xl']), PropTypes.string]),
    suggestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
      label: PropTypes.node,
      // eslint-disable-next-line
      value: PropTypes.any // this is intentional any

    }), PropTypes.string])),
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
}

export var TextInputPropTypes = PropType;