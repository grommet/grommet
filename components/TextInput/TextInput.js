"use strict";

exports.__esModule = true;
exports.TextInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _grommetStyles = require("grommet-styles");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Drop = require("../Drop");

var _InfiniteScroll = require("../InfiniteScroll");

var _Keyboard = require("../Keyboard");

var _hocs = require("../hocs");

var _StyledTextInput = require("./StyledTextInput");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }

  return suggestion;
}

function stringLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    if (suggestion.label && typeof suggestion.label === 'string') {
      return suggestion.label;
    }

    return suggestion.value;
  }

  return suggestion;
}

var ContainerBox = (0, _styledComponents.default)(_Box.Box).withConfig({
  displayName: "TextInput__ContainerBox",
  componentId: "sc-1ai0c08-0"
})(["", ";@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}"], function (props) {
  return props.dropHeight ? (0, _grommetStyles.sizeStyle)('max-height', props.dropHeight, props.theme) : 'max-height: inherit;';
});

var TextInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TextInput, _Component);

  function TextInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeSuggestionIndex: -1,
      showDrop: false
    });

    _defineProperty(_assertThisInitialized(_this), "inputRef", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "announce", function (message, mode) {
      var _this$props = _this.props,
          announce = _this$props.announce,
          suggestions = _this$props.suggestions;

      if (suggestions && suggestions.length > 0) {
        announce(message, mode);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "announceSuggestionsCount", function () {
      var _this$props2 = _this.props,
          suggestions = _this$props2.suggestions,
          suggestionsCount = _this$props2.messages.suggestionsCount;

      _this.announce(suggestions.length + " " + suggestionsCount);
    });

    _defineProperty(_assertThisInitialized(_this), "announceSuggestionsExist", function () {
      var suggestionsExist = _this.props.messages.suggestionsExist;

      _this.announce(suggestionsExist);
    });

    _defineProperty(_assertThisInitialized(_this), "announceSuggestionsIsOpen", function () {
      var suggestionIsOpen = _this.props.messages.suggestionIsOpen;

      _this.announce(suggestionIsOpen);
    });

    _defineProperty(_assertThisInitialized(_this), "announceSuggestion", function (index) {
      var _this$props3 = _this.props,
          suggestions = _this$props3.suggestions,
          enterSelect = _this$props3.messages.enterSelect;

      if (suggestions && suggestions.length > 0) {
        var labelMessage = stringLabel(suggestions[index]);

        _this.announce(labelMessage + " " + enterSelect);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "resetSuggestions", function () {
      // delay this to avoid re-render interupting event delivery
      // https://github.com/grommet/grommet/issues/2154
      // 10ms was chosen empirically based on ie11 using TextInput
      // with and without a FormField.
      clearTimeout(_this.resetTimer);
      _this.resetTimer = setTimeout(function () {
        var suggestions = _this.props.suggestions;

        if (suggestions && suggestions.length) {
          _this.setState({
            activeSuggestionIndex: -1,
            showDrop: true,
            selectedSuggestionIndex: -1
          }, _this.announceSuggestionsCount);
        }
      }, 10);
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedSuggestionIndex", function () {
      var _this$props4 = _this.props,
          suggestions = _this$props4.suggestions,
          value = _this$props4.value;
      var suggestionValues = suggestions.map(function (suggestion) {
        if (typeof suggestion === 'object') {
          return suggestion.value;
        }

        return suggestion;
      });
      return suggestionValues.indexOf(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onShowSuggestions", function () {
      // Get values of suggestions, so we can highlight selected suggestion
      var selectedSuggestionIndex = _this.getSelectedSuggestionIndex();

      _this.setState({
        showDrop: true,
        activeSuggestionIndex: -1,
        selectedSuggestionIndex: selectedSuggestionIndex
      }, _this.announceSuggestionsIsOpen);
    });

    _defineProperty(_assertThisInitialized(_this), "onNextSuggestion", function (event) {
      var suggestions = _this.props.suggestions;
      var _this$state = _this.state,
          activeSuggestionIndex = _this$state.activeSuggestionIndex,
          showDrop = _this$state.showDrop;

      if (suggestions && suggestions.length > 0) {
        if (!showDrop) {
          _this.onShowSuggestions();
        } else {
          event.preventDefault();
          var index = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);

          _this.setState({
            activeSuggestionIndex: index
          }, function () {
            return _this.announceSuggestion(index);
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPreviousSuggestion", function (event) {
      var suggestions = _this.props.suggestions;
      var _this$state2 = _this.state,
          activeSuggestionIndex = _this$state2.activeSuggestionIndex,
          showDrop = _this$state2.showDrop;

      if (suggestions && suggestions.length > 0 && showDrop) {
        event.preventDefault();
        var index = Math.max(activeSuggestionIndex - 1, 0);

        _this.setState({
          activeSuggestionIndex: index
        }, function () {
          return _this.announceSuggestion(index);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickSuggestion", function (suggestion, event) {
      var _this$props5 = _this.props,
          forwardRef = _this$props5.forwardRef,
          onSelect = _this$props5.onSelect;

      _this.setState({
        showDrop: false,
        activeSuggestionIndex: -1
      });

      if (onSelect) {
        // TODO: needed for backwards compatibility sake

        /* eslint-disable no-param-reassign */
        event.suggestion = suggestion;
        event.target = (forwardRef || _this.inputRef).current;
        /* eslint-enable no-param-reassign */

        onSelect(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSuggestionSelect", function (event) {
      var _this$props6 = _this.props,
          forwardRef = _this$props6.forwardRef,
          onSelect = _this$props6.onSelect,
          suggestions = _this$props6.suggestions;
      var activeSuggestionIndex = _this.state.activeSuggestionIndex;

      _this.setState({
        showDrop: false,
        activeSuggestionIndex: -1
      });

      if (activeSuggestionIndex >= 0) {
        event.preventDefault(); // prevent submitting forms
        // TODO: needed for backwards compatibility sake

        /* eslint-disable no-param-reassign */

        event.suggestion = suggestions[activeSuggestionIndex];
        event.target = (forwardRef || _this.inputRef).current;
        /* eslint-enable no-param-reassign */

        if (onSelect) {
          onSelect(event);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      var _this$props7 = _this.props,
          onFocus = _this$props7.onFocus,
          suggestions = _this$props7.suggestions;

      if (suggestions && suggestions.length > 0) {
        _this.announceSuggestionsExist();
      }

      _this.resetSuggestions();

      if (onFocus) {
        onFocus(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (event) {
      var onBlur = _this.props.onBlur;
      clearTimeout(_this.resetTimer);

      if (onBlur) {
        onBlur(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var onChange = _this.props.onChange;

      _this.resetSuggestions();

      if (onChange) {
        onChange(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onEsc", function (event) {
      // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this input
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();

      _this.setState({
        showDrop: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTab", function () {
      _this.setState({
        showDrop: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSuggestions", function () {
      var _this$props8 = _this.props,
          suggestions = _this$props8.suggestions,
          theme = _this$props8.theme;
      var _this$state3 = _this.state,
          activeSuggestionIndex = _this$state3.activeSuggestionIndex,
          selectedSuggestionIndex = _this$state3.selectedSuggestionIndex;
      return _react.default.createElement(_StyledTextInput.StyledSuggestions, null, _react.default.createElement(_InfiniteScroll.InfiniteScroll, {
        items: suggestions,
        step: theme.select.step
      }, function (suggestion, index) {
        var plain = typeof suggestion === 'object' && typeof (0, _react.isValidElement)(suggestion.label);
        return _react.default.createElement("li", {
          key: stringLabel(suggestion) + "-" + index
        }, _react.default.createElement(_Button.Button, {
          active: activeSuggestionIndex === index || selectedSuggestionIndex === index,
          fill: true,
          hoverIndicator: "background",
          onClick: function onClick(event) {
            _this.onClickSuggestion(suggestion, event);
          }
        }, plain ? renderLabel(suggestion) : _react.default.createElement(_Box.Box, {
          align: "start",
          pad: "small"
        }, renderLabel(suggestion))));
      }));
    });

    return _this;
  }

  TextInput.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var suggestions = nextProps.suggestions;
    var showDrop = prevState.showDrop;

    if (showDrop && (!suggestions || !suggestions.length)) {
      return {
        showDrop: false
      };
    }

    return null;
  };

  var _proto = TextInput.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props9 = this.props,
        onSuggestionsOpen = _this$props9.onSuggestionsOpen,
        onSuggestionsClose = _this$props9.onSuggestionsClose,
        suggestions = _this$props9.suggestions;
    var showDrop = this.state.showDrop;

    if (showDrop !== prevState.showDrop) {
      if (showDrop && onSuggestionsOpen) {
        onSuggestionsOpen();
      } else if (onSuggestionsClose) {
        onSuggestionsClose();
      }
    }

    if (!showDrop && suggestions && (!prevProps.suggestions || !prevProps.suggestions.length)) {
      this.resetSuggestions();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.resetTimer);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props10 = this.props,
        defaultValue = _this$props10.defaultValue,
        dropAlign = _this$props10.dropAlign,
        dropHeight = _this$props10.dropHeight,
        dropTarget = _this$props10.dropTarget,
        dropProps = _this$props10.dropProps,
        forwardRef = _this$props10.forwardRef,
        id = _this$props10.id,
        placeholder = _this$props10.placeholder,
        plain = _this$props10.plain,
        theme = _this$props10.theme,
        value = _this$props10.value,
        onKeyDown = _this$props10.onKeyDown,
        rest = _objectWithoutPropertiesLoose(_this$props10, ["defaultValue", "dropAlign", "dropHeight", "dropTarget", "dropProps", "forwardRef", "id", "placeholder", "plain", "theme", "value", "onKeyDown"]);

    delete rest.onChange; // se we can manage in this.onChange()

    delete rest.onSuggestionsOpen;
    delete rest.onSuggestionsClose;
    var showDrop = this.state.showDrop; // needed so that styled components does not invoke
    // onSelect when text input is clicked

    delete rest.onSelect;
    var drop;

    if (showDrop) {
      drop = _react.default.createElement(_Drop.Drop, _extends({
        id: id ? "text-input-drop__" + id : undefined,
        align: dropAlign,
        responsive: false,
        target: dropTarget || (forwardRef || this.inputRef).current,
        onClickOutside: function onClickOutside() {
          return _this2.setState({
            showDrop: false
          });
        },
        onEsc: function onEsc() {
          return _this2.setState({
            showDrop: false
          });
        }
      }, dropProps), _react.default.createElement(ContainerBox, {
        overflow: "auto",
        dropHeight: dropHeight
      }, this.renderSuggestions()));
    }

    return _react.default.createElement(_StyledTextInput.StyledTextInputContainer, {
      plain: plain
    }, placeholder && typeof placeholder !== 'string' && !value ? _react.default.createElement(_StyledTextInput.StyledPlaceholder, null, placeholder) : null, _react.default.createElement(_Keyboard.Keyboard, {
      onEnter: this.onSuggestionSelect,
      onEsc: this.onEsc,
      onTab: this.onTab,
      onUp: this.onPreviousSuggestion,
      onDown: this.onNextSuggestion,
      onKeyDown: onKeyDown
    }, _react.default.createElement(_StyledTextInput.StyledTextInput, _extends({
      id: id,
      ref: forwardRef || this.inputRef,
      autoComplete: "off",
      plain: plain,
      placeholder: typeof placeholder === 'string' ? placeholder : undefined
    }, rest, {
      defaultValue: renderLabel(defaultValue),
      value: renderLabel(value),
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange
    }))), drop);
  };

  return TextInput;
}(_react.Component);

_defineProperty(TextInput, "defaultProps", {
  dropAlign: {
    top: 'bottom',
    left: 'left'
  },
  messages: {
    enterSelect: '(Press Enter to Select)',
    suggestionsCount: 'suggestions available',
    suggestionsExist: 'This input has suggestions use arrow keys to navigate',
    suggestionIsOpen: 'Suggestions drop is open, continue to use arrow keys to navigate'
  }
});

Object.setPrototypeOf(TextInput.defaultProps, _defaultProps.defaultProps);
var TextInputDoc;

if (process.env.NODE_ENV !== 'production') {
  TextInputDoc = require('./doc').doc(TextInput); // eslint-disable-line global-require
}

var TextInputWrapper = (0, _recompose.compose)((0, _hocs.withFocus)({
  focusWithMouse: true
}), _styledComponents.withTheme, _hocs.withAnnounce, _hocs.withForwardRef)(TextInputDoc || TextInput);
exports.TextInput = TextInputWrapper;