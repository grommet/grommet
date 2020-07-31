function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { FormContext } from '../Form/FormContext';
import { Keyboard } from '../Keyboard';
import { useForwardedRef } from '../../utils';
import { StyledMaskedInput, StyledMaskedInputContainer, StyledIcon } from './StyledMaskedInput';

var parseValue = function parseValue(mask, value) {
  // break the value up into mask parts
  var valueParts = []; // { part, beginIndex, endIndex }

  var valueIndex = 0;
  var maskIndex = 0;

  while (value !== undefined && valueIndex < value.length && maskIndex < mask.length) {
    var item = mask[maskIndex];
    var found = void 0;

    if (item.fixed) {
      var length = item.fixed.length; // grab however much of value (starting at valueIndex) matches
      // item.fixed. If none matches it and there is more in value
      // add in the fixed item.

      var matching = 0;

      while (matching < length && value[valueIndex + matching] === item.fixed[matching]) {
        matching += 1;
      }

      if (matching > 0) {
        var part = value.slice(valueIndex, valueIndex + matching);

        if (valueIndex + matching < value.length) {
          // matched part of the fixed portion but there's more stuff
          // after it. Go ahead and fill in the entire fixed chunk
          part = item.fixed;
        }

        valueParts.push({
          part: part,
          beginIndex: valueIndex,
          endIndex: valueIndex + matching - 1
        });
        valueIndex += matching;
      } else {
        valueParts.push({
          part: item.fixed,
          beginIndex: valueIndex,
          endIndex: valueIndex + length - 1
        });
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

var defaultMask = [{
  regexp: /[^]*/
}];
var dropAlign = {
  top: 'bottom',
  left: 'left'
};
var MaskedInput = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var a11yTitle = _ref.a11yTitle,
      focusProp = _ref.focus,
      icon = _ref.icon,
      id = _ref.id,
      _ref$mask = _ref.mask,
      mask = _ref$mask === void 0 ? defaultMask : _ref$mask,
      name = _ref.name,
      _onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      _onFocus = _ref.onFocus,
      onKeyDown = _ref.onKeyDown,
      placeholder = _ref.placeholder,
      plain = _ref.plain,
      reverse = _ref.reverse,
      valueProp = _ref.value,
      rest = _objectWithoutPropertiesLoose(_ref, ["a11yTitle", "focus", "icon", "id", "mask", "name", "onBlur", "onChange", "onFocus", "onKeyDown", "placeholder", "plain", "reverse", "value"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var formContext = useContext(FormContext);

  var _formContext$useFormI = formContext.useFormInput(name, valueProp),
      value = _formContext$useFormI[0],
      setValue = _formContext$useFormI[1];

  var _useState = useState(parseValue(mask, value)),
      valueParts = _useState[0],
      setValueParts = _useState[1];

  useEffect(function () {
    setValueParts(parseValue(mask, value));
  }, [mask, value]);
  var inputRef = useForwardedRef(ref);
  var dropRef = useRef();

  var _useState2 = useState(focusProp),
      focus = _useState2[0],
      setFocus = _useState2[1];

  var _useState3 = useState(),
      activeMaskIndex = _useState3[0],
      setActiveMaskIndex = _useState3[1];

  var _useState4 = useState(),
      activeOptionIndex = _useState4[0],
      setActiveOptionIndex = _useState4[1];

  var _useState5 = useState(),
      showDrop = _useState5[0],
      setShowDrop = _useState5[1];

  useEffect(function () {
    if (focus) {
      var timer = setTimeout(function () {
        // determine which mask element the caret is at
        var caretIndex = inputRef.current.selectionStart;
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

        if (maskIndex !== activeMaskIndex) {
          setActiveMaskIndex(maskIndex);
          setActiveOptionIndex(-1);
          setShowDrop(maskIndex >= 0 && mask[maskIndex].options && true);
        }
      }, 10); // 10ms empirically chosen

      return function () {
        return clearTimeout(timer);
      };
    }

    return undefined;
  }, [activeMaskIndex, focus, inputRef, mask, valueParts]);
  var setInputValue = useCallback(function (nextValue) {
    // Calling set value function directly on input because React library
    // overrides setter `event.target.value =` and loses original event
    // target fidelity.
    // https://stackoverflow.com/a/46012210 &&
    // https://github.com/grommet/grommet/pull/3171#discussion_r296415239
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(inputRef.current, nextValue);
    var event = new Event('input', {
      bubbles: true
    });
    inputRef.current.dispatchEvent(event);
  }, [inputRef]); // This could be due to a paste or as the user is typing.

  var onChangeInput = useCallback(function (event) {
    // Align with the mask.
    var nextValueParts = parseValue(mask, event.target.value);
    var nextValue = nextValueParts.map(function (part) {
      return part.part;
    }).join('');

    if (nextValue !== event.target.value) {
      // The mask required inserting something, change the input.
      // This will re-trigger this callback with the next value
      setInputValue(nextValue);
    } else if (value !== nextValue) {
      setValue(nextValue);
      if (onChange) onChange(event);
    }
  }, [mask, onChange, setInputValue, setValue, value]);
  var onOption = useCallback(function (option) {
    return function () {
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
      }).join('');
      setInputValue(nextValue); // restore focus to input

      inputRef.current.focus();
    };
  }, [activeMaskIndex, inputRef, mask, setInputValue, valueParts]);
  var onNextOption = useCallback(function (event) {
    var item = mask[activeMaskIndex];

    if (item && item.options) {
      event.preventDefault();
      var index = Math.min(activeOptionIndex + 1, item.options.length - 1);
      setActiveOptionIndex(index);
    }
  }, [activeMaskIndex, activeOptionIndex, mask]);
  var onPreviousOption = useCallback(function (event) {
    if (activeMaskIndex >= 0 && mask[activeMaskIndex].options) {
      event.preventDefault();
      var index = Math.max(activeOptionIndex - 1, 0);
      setActiveOptionIndex(index);
    }
  }, [activeMaskIndex, activeOptionIndex, mask]);
  var onSelectOption = useCallback(function (event) {
    if (activeMaskIndex >= 0 && activeOptionIndex >= 0) {
      event.preventDefault();
      var option = mask[activeMaskIndex].options[activeOptionIndex];
      onOption(option)();
    }
  }, [activeMaskIndex, activeOptionIndex, mask, onOption]);
  var onEsc = useCallback(function (event) {
    if (showDrop) {
      // we have to stop both synthetic events and native events
      // drop and layer should not close by pressing esc on this input
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      setShowDrop(false);
    }
  }, [showDrop]);
  var onHideDrop = useCallback(function () {
    return setShowDrop(false);
  }, []);

  var renderPlaceholder = function renderPlaceholder() {
    return mask.map(function (item) {
      return item.placeholder || item.fixed;
    }).join('');
  };

  return /*#__PURE__*/React.createElement(StyledMaskedInputContainer, {
    plain: plain
  }, icon && /*#__PURE__*/React.createElement(StyledIcon, {
    reverse: reverse,
    theme: theme
  }, icon), /*#__PURE__*/React.createElement(Keyboard, {
    onEsc: onEsc,
    onTab: showDrop ? function () {
      return setShowDrop(false);
    } : undefined,
    onLeft: undefined,
    onRight: undefined,
    onUp: onPreviousOption,
    onDown: showDrop ? onNextOption : function () {
      return setShowDrop(true);
    },
    onEnter: onSelectOption,
    onKeyDown: onKeyDown
  }, /*#__PURE__*/React.createElement(StyledMaskedInput, _extends({
    ref: inputRef,
    "aria-label": a11yTitle,
    id: id,
    name: name,
    autoComplete: "off",
    plain: plain,
    placeholder: placeholder || renderPlaceholder(),
    icon: icon,
    reverse: reverse,
    focus: focus
  }, rest, {
    value: value,
    theme: theme,
    onFocus: function onFocus(event) {
      setFocus(true);
      setShowDrop(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false); // This will be called when the user clicks on a suggestion,
      // check for that and don't remove the drop in that case.
      // Drop will already have removed itself if the user has focused
      // outside of the Drop.

      if (!dropRef.current) setShowDrop(false);
      if (_onBlur) _onBlur(event);
    },
    onChange: onChangeInput
  }))), showDrop && mask[activeMaskIndex] && mask[activeMaskIndex].options && /*#__PURE__*/React.createElement(Drop, {
    id: id ? "masked-input-drop__" + id : undefined,
    align: dropAlign,
    responsive: false,
    target: inputRef.current,
    onClickOutside: onHideDrop,
    onEsc: onHideDrop
  }, /*#__PURE__*/React.createElement(Box, {
    ref: dropRef
  }, mask[activeMaskIndex].options.map(function (option, index) {
    // Determine whether the label is done as a child or
    // as an option Button kind property.
    var child = !theme.button.option ? /*#__PURE__*/React.createElement(Box, {
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      }
    }, option) : undefined; // if we have a child, turn on plain, and hoverIndicator

    return /*#__PURE__*/React.createElement(Box, {
      key: option,
      flex: false
    }, /*#__PURE__*/React.createElement(Button, {
      tabIndex: "-1",
      onClick: onOption(option),
      onMouseOver: function onMouseOver() {
        return setActiveOptionIndex(index);
      },
      onFocus: function onFocus() {},
      active: index === activeOptionIndex,
      plain: !child ? undefined : true,
      align: "start",
      kind: !child ? 'option' : undefined,
      hoverIndicator: !child ? undefined : 'background',
      label: !child ? option : undefined
    }, child));
  }))));
});
MaskedInput.displayName = 'MaskedInput';
var MaskedInputDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  MaskedInputDoc = require('./doc').doc(MaskedInput);
}

var MaskedInputWrapper = MaskedInputDoc || MaskedInput;
export { MaskedInputWrapper as MaskedInput };