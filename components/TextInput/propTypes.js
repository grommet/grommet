"use strict";

exports.__esModule = true;
exports.TextInputPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: _propTypes["default"].string,
    defaultSuggestion: _propTypes["default"].number,
    dropAlign: _propTypes["default"].shape({
      top: _propTypes["default"].oneOf(['top', 'bottom']),
      bottom: _propTypes["default"].oneOf(['top', 'bottom']),
      right: _propTypes["default"].oneOf(['left', 'right']),
      left: _propTypes["default"].oneOf(['left', 'right'])
    }),
    dropHeight: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    dropTarget: _propTypes["default"].object,
    dropProps: _propTypes["default"].object,
    icon: _propTypes["default"].element,
    id: _propTypes["default"].string,
    focusIndicator: _propTypes["default"].bool,
    messages: _propTypes["default"].shape({
      enterSelect: _propTypes["default"].string,
      suggestionsCount: _propTypes["default"].string,
      suggestionsExist: _propTypes["default"].string,
      suggestionIsOpen: _propTypes["default"].string
    }),
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    onSelect: _propTypes["default"].func,
    onSuggestionSelect: _propTypes["default"].func,
    onSuggestionsOpen: _propTypes["default"].func,
    onSuggestionsClose: _propTypes["default"].func,
    placeholder: _propTypes["default"].node,
    plain: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['full'])]),
    reverse: _propTypes["default"].bool,
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', '2xl', '3xl', '4xl', '5xl', '6xl']), _propTypes["default"].string]),
    suggestions: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].shape({
      label: _propTypes["default"].node,
      // eslint-disable-next-line
      value: _propTypes["default"].any // this is intentional any

    }), _propTypes["default"].string])),
    textAlign: _propTypes["default"].oneOf(['start', 'center', 'end']),
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
  };
}

var TextInputPropTypes = PropType;
exports.TextInputPropTypes = TextInputPropTypes;