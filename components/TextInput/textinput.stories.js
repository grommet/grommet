"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleTextInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleTextInput, _Component);

  function SimpleTextInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this), "ref", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        value: event.target.value
      });
    });

    return _this;
  }

  var _proto = SimpleTextInput.prototype;

  _proto.render = function render() {
    var value = this.state.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Box, {
      width: "medium"
    }, _react.default.createElement(_grommet.TextInput, {
      ref: this.ref,
      value: value,
      onChange: this.onChange
    }))));
  };

  return SimpleTextInput;
}(_react.Component);

var PasswordInput = function PasswordInput(_ref) {
  var value = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["value"]);

  var _useState = (0, _react.useState)(value),
      inputValue = _useState[0],
      setValue = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      reveal = _useState2[0],
      setReveal = _useState2[1];

  return _react.default.createElement(_grommet.Box, {
    width: "medium",
    direction: "row",
    margin: "large",
    align: "center",
    round: "small",
    border: true
  }, _react.default.createElement(_grommet.TextInput, _extends({
    plain: true,
    type: reveal ? 'text' : 'password',
    value: inputValue,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }, rest)), _react.default.createElement(_grommet.Button, {
    icon: reveal ? _react.default.createElement(_grommetIcons.FormLock, {
      size: "medium"
    }) : _react.default.createElement(_grommetIcons.View, {
      size: "medium"
    }),
    onClick: function onClick() {
      return setReveal(!reveal);
    }
  }));
};

var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var SuggestionsTextInput =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(SuggestionsTextInput, _Component2);

  function SuggestionsTextInput() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this2), "state", {
      value: ''
    });

    _defineProperty(_assertThisInitialized(_this2), "onChange", function (event) {
      return _this2.setState({
        value: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "onSelect", function (event) {
      return _this2.setState({
        value: event.suggestion
      });
    });

    return _this2;
  }

  var _proto2 = SuggestionsTextInput.prototype;

  _proto2.render = function render() {
    var value = this.state.value;
    return _react.default.createElement(_grommet.Grommet, {
      full: true,
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, _react.default.createElement(_grommet.Box, {
      width: "medium"
    }, _react.default.createElement(_grommet.TextInput, {
      value: value,
      dropProps: {
        height: 'small'
      },
      onChange: this.onChange,
      onSelect: this.onSelect,
      suggestions: suggestions
    }))));
  };

  return SuggestionsTextInput;
}(_react.Component);

var myCustomTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    drop: {
      background: '#444444',
      shadowSize: 'medium',
      extend: "\n        border-bottom-left-radius: 12px;\n        border-bottom-right-radius: 12px;\n\n        overflow: hidden;\n      "
    },
    elevation: {
      dark: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      },
      light: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
      }
    },
    input: {
      weight: 400
    },
    font: {
      size: '14px'
    }
  }
});
var folks = [{
  name: 'Alan Souza',
  imageUrl: 'https://s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80'
}, {
  name: 'Bryan Jacquot',
  imageUrl: 'https://s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80'
}, {
  name: 'Chris Carlozzi',
  imageUrl: 'https://s.gravatar.com/avatar/56ea1e2ecd0d3cc85479b2d09e31d071?s=80'
}, {
  name: 'Eric Soderberg',
  imageUrl: 'https://s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80'
}, {
  name: 'Marlon Parizzotto',
  imageUrl: 'https://s.gravatar.com/avatar/e6684969375a4dcc0aa99f0bfae544c3?s=80'
}, {
  name: 'Tales Chaves',
  imageUrl: 'https://s.gravatar.com/avatar/1f80adca55d9f5d97932ff97f631a4e8?s=80'
}, {
  name: 'Tracy Barmore',
  imageUrl: 'https://s.gravatar.com/avatar/4ec9c3a91da89f278e4482811caad7f3?s=80'
}];

var CustomSuggestionsTextInput =
/*#__PURE__*/
function (_Component3) {
  _inheritsLoose(CustomSuggestionsTextInput, _Component3);

  function CustomSuggestionsTextInput() {
    var _this3;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this3 = _Component3.call.apply(_Component3, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this3), "state", {
      value: '',
      suggestionOpen: false,
      suggestedFolks: []
    });

    _defineProperty(_assertThisInitialized(_this3), "boxRef", (0, _react.createRef)());

    _defineProperty(_assertThisInitialized(_this3), "onChange", function (event) {
      return _this3.setState({
        value: event.target.value
      }, function () {
        var value = _this3.state.value;

        if (!value.trim()) {
          _this3.setState({
            suggestedFolks: []
          });
        } else {
          // simulate an async call to the backend
          setTimeout(function () {
            return _this3.setState({
              suggestedFolks: folks
            });
          }, 300);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "onSelect", function (event) {
      return _this3.setState({
        value: event.suggestion.value
      });
    });

    _defineProperty(_assertThisInitialized(_this3), "renderSuggestions", function () {
      var _this3$state = _this3.state,
          value = _this3$state.value,
          suggestedFolks = _this3$state.suggestedFolks;
      return suggestedFolks.filter(function (_ref2) {
        var name = _ref2.name;
        return name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
      }).map(function (_ref3, index, list) {
        var name = _ref3.name,
            imageUrl = _ref3.imageUrl;
        return {
          label: _react.default.createElement(_grommet.Box, {
            direction: "row",
            align: "center",
            gap: "small",
            border: index < list.length - 1 ? 'bottom' : undefined,
            pad: "small"
          }, _react.default.createElement(_grommet.Image, {
            width: "48px",
            src: imageUrl,
            style: {
              borderRadius: '100%'
            }
          }), _react.default.createElement(_grommet.Text, null, _react.default.createElement("strong", null, name))),
          value: name
        };
      });
    });

    return _this3;
  }

  var _proto3 = CustomSuggestionsTextInput.prototype;

  _proto3.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto3.render = function render() {
    var _this4 = this;

    var _this$state = this.state,
        suggestionOpen = _this$state.suggestionOpen,
        value = _this$state.value;
    return _react.default.createElement(_grommet.Grommet, {
      theme: myCustomTheme,
      full: true
    }, _react.default.createElement(_grommet.Box, {
      background: "dark-1",
      fill: true,
      align: "center",
      pad: {
        top: 'large'
      }
    }, _react.default.createElement(_grommet.Box, {
      ref: this.boxRef,
      width: "large",
      direction: "row",
      align: "center",
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      },
      round: "small",
      elevation: suggestionOpen ? 'medium' : undefined,
      border: {
        side: 'all',
        color: suggestionOpen ? 'transparent' : 'border'
      },
      style: suggestionOpen ? {
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px'
      } : undefined
    }, _react.default.createElement(_grommetIcons.Search, {
      color: "brand"
    }), _react.default.createElement(_grommet.TextInput, {
      type: "search",
      dropTarget: this.boxRef.current,
      plain: true,
      value: value,
      onChange: this.onChange,
      onSelect: this.onSelect,
      suggestions: this.renderSuggestions(),
      placeholder: "Enter your name...",
      onSuggestionsOpen: function onSuggestionsOpen() {
        return _this4.setState({
          suggestionOpen: true
        });
      },
      onSuggestionsClose: function onSuggestionsClose() {
        return _this4.setState({
          suggestionOpen: false
        });
      }
    }))));
  };

  return CustomSuggestionsTextInput;
}(_react.Component);

(0, _react2.storiesOf)('TextInput', module).add('Simple TextInput', function () {
  return _react.default.createElement(SimpleTextInput, null);
}).add('Password input', function () {
  return _react.default.createElement(PasswordInput, null);
}).add('Suggestions TextInput', function () {
  return _react.default.createElement(SuggestionsTextInput, null);
}).add('Custom Suggestions', function () {
  return _react.default.createElement(CustomSuggestionsTextInput, null);
});