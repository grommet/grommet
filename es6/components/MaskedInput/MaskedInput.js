function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { Keyboard } from '../Keyboard';
import { withFocus, withForwardRef } from '../hocs';
import { StyledMaskedInput, StyledMaskedInputContainer } from './StyledMaskedInput';

var parseValue = function parseValue(mask, value) {
  // break the value up into mask parts
  var valueParts = []; // { part, beginIndex, endIndex }

  var valueIndex = 0;
  var maskIndex = 0;

  while (value !== undefined && valueIndex < value.length && maskIndex < mask.length) {
    var item = mask[maskIndex];
    var found = void 0;

    if (item.fixed) {
      var length = item.fixed.length;
      valueParts.push({
        part: item.fixed,
        beginIndex: valueIndex,
        endIndex: valueIndex + length - 1
      });
      var part = value.slice(valueIndex, valueIndex + length);

      if (part === item.fixed) {
        valueIndex += length;
      }

      maskIndex += 1;
      found = true;
    } else if (item.options) {
      // reverse assuming larger is later
      found = item.options.slice(0).reverse() // eslint-disable-next-line no-loop-func
      .some(function (option) {
        var length = option.length;
        var part = value.slice(valueIndex, valueIndex + length);

        if (part === option) {
          valueParts.push({
            part: part,
            beginIndex: valueIndex,
            endIndex: valueIndex + length - 1
          });
          valueIndex += length;
          maskIndex += 1;
          return true;
        }

        return false;
      });
    }

    if (!found) {
      if (item.regexp) {
        var minLength = Array.isArray(item.length) && item.length[0] || item.length || 1;
        var maxLength = Array.isArray(item.length) && item.length[1] || item.length || value.length - valueIndex;
        var _length = maxLength;

        while (!found && _length >= minLength) {
          var _part = value.slice(valueIndex, valueIndex + _length);

          if (item.regexp.test(_part)) {
            valueParts.push({
              part: _part,
              beginIndex: valueIndex,
              endIndex: valueIndex + _length - 1
            });
            valueIndex += _length;
            maskIndex += 1;
            found = true;
          }

          _length -= 1;
        }

        if (!found) {
          valueIndex = value.length;
        }
      } else {
        var _length2 = Array.isArray(item.length) ? item.length[1] : item.length || value.length - valueIndex;

        var _part2 = value.slice(valueIndex, valueIndex + _length2);

        valueParts.push({
          part: _part2,
          beginIndex: valueIndex,
          endIndex: valueIndex + _length2 - 1
        });
        valueIndex += _length2;
        maskIndex += 1;
      }
    }
  }

  return valueParts;
};

var MaskedInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(MaskedInput, _Component);

  function MaskedInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "inputRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "dropRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "locateCaret", function () {
      // leave time for caret to be placed after receiving focus
      clearTimeout(_this.caretTimeout);
      _this.caretTimeout = setTimeout(function () {
        var mask = _this.props.mask;
        var _this$state = _this.state,
            activeMaskIndex = _this$state.activeMaskIndex,
            valueParts = _this$state.valueParts;

        if (_this.inputRef.current) {
          // determine which mask element the caret is at
          var caretIndex = _this.inputRef.current.selectionStart;
          var maskIndex;
          valueParts.some(function (part, index) {
            if (part.beginIndex <= caretIndex && part.endIndex >= caretIndex) {
              maskIndex = index;
              return true;
            }

            return false;
          });

          if (maskIndex === undefined && valueParts.length < mask.length) {
            maskIndex = valueParts.length; // first unused one
          }

          if (maskIndex && mask[maskIndex].fixed) {
            maskIndex -= 1; // fixed mask parts are never "active"
          }

          if (activeMaskIndex !== maskIndex) {
            // eslint-disable-next-line react/no-did-update-set-state
            _this.setState({
              activeMaskIndex: maskIndex,
              activeOptionIndex: -1
            });
          }
        }
      }, 10); // 10ms empirically chosen
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      var onFocus = _this.props.onFocus;

      _this.locateCaret();

      _this.setState({
        focused: true
      });

      if (onFocus) {
        onFocus(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (event) {
      // delay so we don't remove the drop before Button events can be processed
      var onBlur = _this.props.onBlur;
      clearTimeout(_this.blurTimeout);
      _this.blurTimeout = setTimeout(function () {
        if (!_this.dropRef.current || !_this.dropRef.current.contains || !_this.dropRef.current.contains(document.activeElement)) {
          _this.setState({
            activeMaskIndex: undefined,
            focused: false
          });
        }
      }, 10); // 10ms empirically chosen

      if (onBlur) {
        onBlur(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          mask = _this$props.mask;
      var value = event.target.value; // Align with the mask.

      var valueParts = parseValue(mask, value);
      var nextValue = valueParts.map(function (part) {
        return part.part;
      }).join('');

      if (onChange) {
        onChange({
          target: _extends({}, event.target, {
            value: nextValue
          })
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOption", function (option) {
      return function () {
        var _this$props2 = _this.props,
            onChange = _this$props2.onChange,
            mask = _this$props2.mask;
        var _this$state2 = _this.state,
            activeMaskIndex = _this$state2.activeMaskIndex,
            valueParts = _this$state2.valueParts;
        var nextValueParts = [].concat(valueParts);
        nextValueParts[activeMaskIndex] = {
          part: option
        }; // add any fixed parts that follow

        var index = activeMaskIndex + 1;

        while (index < mask.length && !nextValueParts[index] && mask[index].fixed) {
          nextValueParts[index] = {
            part: mask[index].fixed
          };
          index += 1;
        }

        var nextValue = nextValueParts.map(function (part) {
          return part.part;
        }).join(''); // restore focus to input

        _this.inputRef.current.focus();

        if (onChange) {
          onChange({
            target: {
              value: nextValue
            }
          });
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onNextOption", function (event) {
      var mask = _this.props.mask;
      var _this$state3 = _this.state,
          activeMaskIndex = _this$state3.activeMaskIndex,
          activeOptionIndex = _this$state3.activeOptionIndex;
      var item = mask[activeMaskIndex];

      if (item && item.options) {
        event.preventDefault();
        var index = Math.min(activeOptionIndex + 1, item.options.length - 1);

        _this.setState({
          activeOptionIndex: index
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPreviousOption", function (event) {
      var mask = _this.props.mask;
      var _this$state4 = _this.state,
          activeMaskIndex = _this$state4.activeMaskIndex,
          activeOptionIndex = _this$state4.activeOptionIndex;

      if (activeMaskIndex >= 0 && mask[activeMaskIndex].options) {
        event.preventDefault();
        var index = Math.max(activeOptionIndex - 1, 0);

        _this.setState({
          activeOptionIndex: index
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectOption", function (event) {
      var mask = _this.props.mask;
      var _this$state5 = _this.state,
          activeMaskIndex = _this$state5.activeMaskIndex,
          activeOptionIndex = _this$state5.activeOptionIndex;

      if (activeMaskIndex >= 0 && activeOptionIndex >= 0) {
        event.preventDefault();
        var option = mask[activeMaskIndex].options[activeOptionIndex];

        _this.onOption(option)();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onEsc", function (event) {
      // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this input
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();

      _this.inputRef.current.blur();
    });

    _defineProperty(_assertThisInitialized(_this), "renderPlaceholder", function () {
      var mask = _this.props.mask;
      return mask.map(function (item) {
        return item.placeholder || item.fixed;
      }).join('');
    });

    return _this;
  }

  MaskedInput.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var mask = nextProps.mask,
        value = nextProps.value;
    var priorMask = prevState.priorMask,
        priorValue = prevState.priorValue;

    if (priorMask !== mask || priorValue !== value) {
      var valueParts = parseValue(mask, value);
      return {
        priorMask: mask,
        priorValue: value,
        valueParts: valueParts
      };
    }

    return null;
  };

  var _proto = MaskedInput.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    var focused = this.state.focused;

    if (focused) {
      this.locateCaret();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.caretTimeout);
    clearTimeout(this.blurTimeout);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        defaultValue = _this$props3.defaultValue,
        forwardRef = _this$props3.forwardRef,
        id = _this$props3.id,
        placeholder = _this$props3.placeholder,
        plain = _this$props3.plain,
        mask = _this$props3.mask,
        value = _this$props3.value,
        onChange = _this$props3.onChange,
        onKeyDown = _this$props3.onKeyDown,
        propsTheme = _this$props3.theme,
        rest = _objectWithoutPropertiesLoose(_this$props3, ["defaultValue", "forwardRef", "id", "placeholder", "plain", "mask", "value", "onChange", "onKeyDown", "theme"]);

    var theme = this.context || propsTheme;
    var _this$state6 = this.state,
        activeMaskIndex = _this$state6.activeMaskIndex,
        activeOptionIndex = _this$state6.activeOptionIndex;
    return React.createElement(StyledMaskedInputContainer, {
      plain: plain
    }, React.createElement(Keyboard, {
      onEsc: this.onEsc,
      onTab: this.onTab,
      onLeft: this.locateCaret,
      onRight: this.locateCaret,
      onUp: this.onPreviousOption,
      onDown: this.onNextOption,
      onEnter: this.onSelectOption,
      onKeyDown: onKeyDown
    }, React.createElement(StyledMaskedInput, _extends({
      id: id,
      ref: function ref(node) {
        _this2.inputRef.current = node;

        if (forwardRef) {
          if (typeof forwardRef === 'object') {
            forwardRef.current = node;
          } else {
            forwardRef(node);
          }
        }
      },
      autoComplete: "off",
      plain: plain,
      placeholder: placeholder || this.renderPlaceholder()
    }, rest, {
      defaultValue: defaultValue,
      value: value,
      theme: theme,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange
    }))), activeMaskIndex >= 0 && mask[activeMaskIndex].options && React.createElement(Drop, {
      id: id ? "masked-input-drop__" + id : undefined,
      align: {
        top: 'bottom',
        left: 'left'
      },
      responsive: false,
      target: this.inputRef.current
    }, React.createElement(Box, {
      ref: this.dropRef
    }, mask[activeMaskIndex].options.map(function (option, index) {
      return React.createElement(Box, {
        key: option,
        flex: false
      }, React.createElement(Button, {
        tabIndex: "-1",
        onClick: _this2.onOption(option),
        onMouseOver: function onMouseOver() {
          return _this2.setState({
            activeOptionIndex: index
          });
        },
        onFocus: function onFocus() {}
      }, React.createElement(Box, {
        pad: {
          horizontal: 'small',
          vertical: 'xsmall'
        },
        background: activeOptionIndex === index ? 'active' : undefined
      }, option)));
    }))));
  };

  return MaskedInput;
}(Component);

_defineProperty(MaskedInput, "contextType", ThemeContext);

_defineProperty(MaskedInput, "defaultProps", {
  mask: []
});

Object.setPrototypeOf(MaskedInput.defaultProps, defaultProps);
var MaskedInputDoc;

if (process.env.NODE_ENV !== 'production') {
  MaskedInputDoc = require('./doc').doc(MaskedInput); // eslint-disable-line global-require
}

var MaskedInputWrapper = compose(withFocus({
  focusWithMouse: true
}), withForwardRef)(MaskedInputDoc || MaskedInput);
export { MaskedInputWrapper as MaskedInput };