function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import styled, { withTheme } from 'styled-components';
import { debounce, debounceDelay, isNodeAfterScroll, isNodeBeforeScroll, selectedStyle, setFocusWithoutScroll } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { SelectOption } from './SelectOption';
import { StyledContainer } from './StyledSelect'; // position relative is so scroll can be managed correctly

var OptionsBox = styled(Box).withConfig({
  displayName: "SelectContainer__OptionsBox",
  componentId: "sc-1wi0ul8-0"
})(["position:relative;scroll-behavior:smooth;"]);
var OptionBox = styled(Box).withConfig({
  displayName: "SelectContainer__OptionBox",
  componentId: "sc-1wi0ul8-1"
})(["", ""], function (props) {
  return props.selected && selectedStyle;
});

var SelectContainer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SelectContainer, _Component);

  function SelectContainer(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "optionRefs", {});

    _defineProperty(_assertThisInitialized(_this), "searchRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "optionsRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "onSearchChange", function (event) {
      _this.setState({
        search: event.target.value,
        activeIndex: -1
      }, function () {
        var search = _this.state.search;

        _this.onSearch(search);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", debounce(function (search) {
      var onSearch = _this.props.onSearch;
      onSearch(search);
    }, debounceDelay(_this.props)));

    _defineProperty(_assertThisInitialized(_this), "selectOption", function (option) {
      return function () {
        var _this$props = _this.props,
            multiple = _this$props.multiple,
            onChange = _this$props.onChange,
            value = _this$props.value,
            selected = _this$props.selected;
        var initialOptions = _this.state.initialOptions;

        if (onChange) {
          var nextValue = Array.isArray(value) ? value.slice() : []; // preserve compatibility until selected is deprecated

          if (selected) {
            nextValue = selected.map(function (s) {
              return initialOptions[s];
            });
          }

          if (multiple) {
            if (nextValue.indexOf(option) !== -1) {
              nextValue = nextValue.filter(function (v) {
                return v !== option;
              });
            } else {
              nextValue.push(option);
            }
          } else {
            nextValue = option;
          }

          var nextSelected = Array.isArray(nextValue) ? nextValue.map(function (v) {
            return initialOptions.indexOf(v);
          }) : initialOptions.indexOf(nextValue);
          onChange({
            option: option,
            value: nextValue,
            selected: nextSelected
          });
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "clearKeyboardNavigation", function () {
      clearTimeout(_this.keyboardNavTimer);
      _this.keyboardNavTimer = setTimeout(function () {
        _this.setState({
          keyboardNavigating: false
        });
      }, 100); // 100ms was empirically determined
    });

    _defineProperty(_assertThisInitialized(_this), "onNextOption", function (event) {
      var options = _this.props.options;
      var activeIndex = _this.state.activeIndex;
      event.preventDefault();
      var nextActiveIndex = activeIndex + 1;

      while (nextActiveIndex < options.length && _this.isDisabled(nextActiveIndex)) {
        nextActiveIndex += 1;
      }

      if (nextActiveIndex !== options.length) {
        _this.setState({
          activeIndex: nextActiveIndex,
          keyboardNavigating: true
        }, function () {
          var buttonNode = _this.optionRefs[nextActiveIndex];
          var optionsNode = _this.optionsRef.current;

          if (buttonNode && isNodeAfterScroll(buttonNode, optionsNode) && optionsNode.scrollTo) {
            optionsNode.scrollTo(0, buttonNode.offsetTop - (optionsNode.getBoundingClientRect().height - buttonNode.getBoundingClientRect().height));
          }

          _this.clearKeyboardNavigation();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPreviousOption", function (event) {
      var activeIndex = _this.state.activeIndex;
      event.preventDefault();
      var nextActiveIndex = activeIndex - 1;

      while (nextActiveIndex >= 0 && _this.isDisabled(nextActiveIndex)) {
        nextActiveIndex -= 1;
      }

      if (nextActiveIndex >= 0) {
        _this.setState({
          activeIndex: nextActiveIndex,
          keyboardNavigating: true
        }, function () {
          var buttonNode = _this.optionRefs[nextActiveIndex];
          var optionsNode = _this.optionsRef.current;

          if (buttonNode && isNodeBeforeScroll(buttonNode, optionsNode) && optionsNode.scrollTo) {
            optionsNode.scrollTo(0, buttonNode.offsetTop);
          }

          _this.clearKeyboardNavigation();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onActiveOption", function (index) {
      return function () {
        var keyboardNavigating = _this.state.keyboardNavigating;

        if (!keyboardNavigating) {
          _this.setState({
            activeIndex: index
          });
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectOption", function (event) {
      var options = _this.props.options;
      var activeIndex = _this.state.activeIndex;

      if (activeIndex >= 0) {
        event.preventDefault(); // prevent submitting forms

        _this.selectOption(options[activeIndex])();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "optionLabel", function (index) {
      var _this$props2 = _this.props,
          options = _this$props2.options,
          labelKey = _this$props2.labelKey;
      var option = options[index];
      var optionLabel;

      if (labelKey) {
        if (typeof labelKey === 'function') {
          optionLabel = labelKey(option);
        } else {
          optionLabel = option[labelKey];
        }
      } else {
        optionLabel = option;
      }

      return optionLabel;
    });

    _defineProperty(_assertThisInitialized(_this), "optionValue", function (index) {
      var _this$props3 = _this.props,
          options = _this$props3.options,
          valueKey = _this$props3.valueKey;
      var option = options[index];
      var optionValue;

      if (valueKey) {
        if (typeof valueKey === 'function') {
          optionValue = valueKey(option);
        } else {
          optionValue = option[valueKey];
        }
      } else {
        optionValue = option;
      }

      return optionValue;
    });

    _defineProperty(_assertThisInitialized(_this), "isDisabled", function (index) {
      var _this$props4 = _this.props,
          disabled = _this$props4.disabled,
          disabledKey = _this$props4.disabledKey,
          options = _this$props4.options;
      var option = options[index];
      var result;

      if (disabledKey) {
        if (typeof disabledKey === 'function') {
          result = disabledKey(option, index);
        } else {
          result = option[disabledKey];
        }
      } else if (Array.isArray(disabled)) {
        if (typeof disabled[0] === 'number') {
          result = disabled.indexOf(index) !== -1;
        } else {
          var optionValue = _this.optionValue(index);

          result = disabled.indexOf(optionValue) !== -1;
        }
      }

      return result;
    });

    _defineProperty(_assertThisInitialized(_this), "isSelected", function (index) {
      var _this$props5 = _this.props,
          selected = _this$props5.selected,
          value = _this$props5.value,
          valueKey = _this$props5.valueKey;
      var result;

      if (selected) {
        // deprecated in favor of value
        result = selected.indexOf(index) !== -1;
      } else {
        var optionValue = _this.optionValue(index);

        if (Array.isArray(value)) {
          if (value.length === 0) {
            result = false;
          } else if (typeof value[0] !== 'object') {
            result = value.indexOf(optionValue) !== -1;
          } else if (valueKey) {
            result = value.some(function (valueItem) {
              var valueValue = typeof valueKey === 'function' ? valueKey(valueItem) : valueItem[valueKey];
              return valueValue === optionValue;
            });
          }
        } else if (valueKey && typeof value === 'object') {
          var valueValue = typeof valueKey === 'function' ? valueKey(value) : value[valueKey];
          result = valueValue === optionValue;
        } else {
          result = value === optionValue;
        }
      }

      return result;
    });

    _this.state = {
      initialOptions: props.options,
      search: '',
      activeIndex: -1
    };
    return _this;
  }

  SelectContainer.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var options = nextProps.options,
        value = nextProps.value,
        onSearch = nextProps.onSearch;

    if (onSearch) {
      if (prevState.activeIndex === -1 && prevState.search === '' && options && value) {
        var optionValue = Array.isArray(value) && value.length ? value[0] : value;
        var activeIndex = options.indexOf(optionValue);
        return {
          activeIndex: activeIndex
        };
      }

      if (prevState.activeIndex === -1 && prevState.search !== '') {
        return {
          activeIndex: 0
        };
      }
    }

    return null;
  };

  var _proto = SelectContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var onSearch = this.props.onSearch;
    var activeIndex = this.state.activeIndex; // timeout need to send the operation through event loop and allow time to the portal
    // to be available

    setTimeout(function () {
      var optionsNode = _this2.optionsRef.current;

      if (onSearch) {
        var input = _this2.searchRef.current;

        if (input && input.focus) {
          setFocusWithoutScroll(input);
        }
      } else if (optionsNode) {
        setFocusWithoutScroll(optionsNode);
      } // scroll to active option if it is below the fold


      if (activeIndex >= 0 && optionsNode) {
        var optionNode = _this2.optionRefs[activeIndex];

        var _optionsNode$getBound = optionsNode.getBoundingClientRect(),
            containerBottom = _optionsNode$getBound.bottom;

        if (optionNode) {
          var _optionNode$getBoundi = optionNode.getBoundingClientRect(),
              optionTop = _optionNode$getBoundi.bottom;

          if (containerBottom < optionTop) {
            optionNode.scrollIntoView();
          }
        }
      }
    }, 0);
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props6 = this.props,
        children = _this$props6.children,
        dropHeight = _this$props6.dropHeight,
        emptySearchMessage = _this$props6.emptySearchMessage,
        id = _this$props6.id,
        onKeyDown = _this$props6.onKeyDown,
        onSearch = _this$props6.onSearch,
        options = _this$props6.options,
        searchPlaceholder = _this$props6.searchPlaceholder,
        theme = _this$props6.theme;
    var _this$state = this.state,
        activeIndex = _this$state.activeIndex,
        search = _this$state.search;
    var customSearchInput = theme.select.searchInput;
    var SelectTextInput = customSearchInput || TextInput;
    return React.createElement(Keyboard, {
      onEnter: this.onSelectOption,
      onUp: this.onPreviousOption,
      onDown: this.onNextOption,
      onKeyDown: onKeyDown
    }, React.createElement(StyledContainer, {
      as: Box,
      id: id ? id + "__select-drop" : undefined,
      dropHeight: dropHeight
    }, onSearch && React.createElement(Box, {
      pad: !customSearchInput ? 'xsmall' : undefined,
      flex: false
    }, React.createElement(SelectTextInput, {
      focusIndicator: !customSearchInput,
      size: "small",
      ref: this.searchRef,
      type: "search",
      value: search,
      placeholder: searchPlaceholder,
      onChange: this.onSearchChange
    })), React.createElement(OptionsBox, {
      flex: "shrink",
      role: "menubar",
      tabIndex: "-1",
      ref: this.optionsRef,
      overflow: "auto"
    }, options.length > 0 ? React.createElement(InfiniteScroll, {
      items: options,
      step: theme.select.step,
      replace: true
    }, function (option, index) {
      var isDisabled = _this3.isDisabled(index);

      var isSelected = _this3.isSelected(index);

      var isActive = activeIndex === index;
      return React.createElement(SelectOption // eslint-disable-next-line react/no-array-index-key
      , {
        key: index,
        ref: function ref(_ref) {
          _this3.optionRefs[index] = _ref;
        },
        disabled: isDisabled || undefined,
        active: isActive,
        selected: isSelected,
        option: option,
        onMouseOver: !isDisabled ? _this3.onActiveOption(index) : undefined,
        onClick: !isDisabled ? _this3.selectOption(option) : undefined
      }, children ? children(option, index, options, {
        active: isActive,
        disabled: isDisabled,
        selected: isSelected
      }) : React.createElement(OptionBox, _extends({}, theme.select.options.box, {
        selected: isSelected
      }), React.createElement(Text, theme.select.options.text, _this3.optionLabel(index))));
    }) : React.createElement(SelectOption, {
      key: "search_empty",
      disabled: true,
      option: emptySearchMessage
    }, React.createElement(OptionBox, theme.select.options.box, React.createElement(Text, theme.select.container.text, emptySearchMessage))))));
  };

  return SelectContainer;
}(Component);

_defineProperty(SelectContainer, "defaultProps", {
  children: null,
  disabled: undefined,
  emptySearchMessage: 'No matches found',
  id: undefined,
  multiple: false,
  name: undefined,
  onKeyDown: undefined,
  onSearch: undefined,
  options: undefined,
  searchPlaceholder: undefined,
  selected: undefined,
  value: ''
});

Object.setPrototypeOf(SelectContainer.defaultProps, defaultProps);
var SelectContainerWrapper = withTheme(SelectContainer);
export { SelectContainerWrapper as SelectContainer };