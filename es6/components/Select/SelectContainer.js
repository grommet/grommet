function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/no-find-dom-node */
import React, { createRef, Component } from 'react';
import styled from 'styled-components';
import { debounce, isNodeAfterScroll, isNodeBeforeScroll, setFocusWithoutScroll } from '../../utils';
import { withTheme } from '../hocs';
import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { SelectOption } from './SelectOption';
var ContainerBox = styled(Box).withConfig({
  displayName: "SelectContainer__ContainerBox",
  componentId: "sc-1wi0ul8-0"
})(["max-height:inherit;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}", ";"], function (props) {
  return props.theme.select.container && props.theme.select.container.extend;
});
var OptionsBox = styled(Box).withConfig({
  displayName: "SelectContainer__OptionsBox",
  componentId: "sc-1wi0ul8-1"
})(["scroll-behavior:smooth;"]);

var SelectContainer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SelectContainer, _Component);

  function SelectContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "optionsRef", {});

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "searchRef", createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectRef", createRef());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      search: '',
      activeIndex: -1
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (event) {
      _this.setState({
        search: event.target.value,
        activeIndex: -1
      }, function () {
        var search = _this.state.search;

        _this.onSearch(search);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSearch", debounce(function (search) {
      var onSearch = _this.props.onSearch;
      onSearch(search);
    }, 300));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectOption", function (option, index) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange,
          options = _this$props.options,
          selected = _this$props.selected,
          value = _this$props.value;

      if (onChange) {
        var nextValue = option;
        var nextSelected = index;

        if (multiple) {
          nextValue = [];
          nextSelected = [];
          var removed = false;
          var selectedIndexes = [];

          if (Array.isArray(selected)) {
            selectedIndexes = selected;
          } else if (Array.isArray(value)) {
            selectedIndexes = value.map(function (v) {
              return options.indexOf(v);
            });
          }

          selectedIndexes.forEach(function (selectedIndex) {
            if (selectedIndex === index) {
              removed = true;
            } else {
              nextValue.push(options[selectedIndex]);
              nextSelected.push(selectedIndex);
            }
          });

          if (!removed) {
            nextValue.push(option);
            nextSelected.push(index);
          }
        }

        onChange({
          target: _this.searchRef.current,
          option: option,
          value: nextValue,
          selected: nextSelected
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onNextOption", function (event) {
      var options = _this.props.options;
      var activeIndex = _this.state.activeIndex;
      event.preventDefault();
      var index = Math.min(activeIndex + 1, options.length - 1);

      _this.setState({
        activeIndex: index
      }, function () {
        var buttonNode = _this.optionsRef[index];
        var selectNode = _this.selectRef.current;

        if (isNodeAfterScroll(buttonNode, selectNode) && selectNode.scrollBy) {
          selectNode.scrollBy(0, buttonNode.getBoundingClientRect().height);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onPreviousOption", function (event) {
      var activeIndex = _this.state.activeIndex;
      event.preventDefault();
      var index = Math.max(activeIndex - 1, 0);

      _this.setState({
        activeIndex: index
      }, function () {
        var buttonNode = _this.optionsRef[index];
        var selectNode = _this.selectRef.current;

        if (isNodeBeforeScroll(buttonNode, selectNode) && selectNode.scrollBy) {
          selectNode.scrollBy(0, -buttonNode.getBoundingClientRect().height);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSelectOption", function (event) {
      var options = _this.props.options;
      var activeIndex = _this.state.activeIndex;

      if (activeIndex >= 0) {
        event.preventDefault(); // prevent submitting forms

        _this.selectOption(options[activeIndex], activeIndex);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "optionLabel", function (index) {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "optionValue", function (index) {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isDisabled", function (index) {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isSelected", function (index) {
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
      var selectNode = _this2.selectRef.current;

      if (onSearch) {
        var input = _this2.searchRef.current;

        if (input && input.focus) {
          setFocusWithoutScroll(input);
        }
      } else if (selectNode) {
        setFocusWithoutScroll(selectNode);
      } // scroll to active option if it is below the fold


      if (activeIndex >= 0) {
        var optionNode = _this2.optionsRef[activeIndex];

        var _selectNode$getBoundi = selectNode.getBoundingClientRect(),
            containerBottom = _selectNode$getBoundi.bottom;

        var _optionNode$getBoundi = optionNode.getBoundingClientRect(),
            optionTop = _optionNode$getBoundi.bottom;

        if (containerBottom < optionTop) {
          optionNode.scrollIntoView();
        }
      }
    }, 0);
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props6 = this.props,
        children = _this$props6.children,
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
    }, React.createElement(ContainerBox, {
      id: id ? id + "__select-drop" : undefined,
      theme: theme
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
      onChange: this.onChange
    })), React.createElement(OptionsBox, {
      flex: "shrink",
      role: "menubar",
      tabIndex: "-1",
      ref: this.selectRef,
      overflow: "auto",
      theme: theme
    }, React.createElement(InfiniteScroll, {
      items: options,
      step: theme.select.step
    }, function (option, index) {
      var isDisabled = _this3.isDisabled(index);

      var isSelected = _this3.isSelected(index);

      var isActive = isSelected || activeIndex === index;
      return React.createElement(SelectOption, {
        key: _this3.optionValue(index),
        ref: function ref(_ref) {
          _this3.optionsRef[index] = _ref;
        },
        disabled: isDisabled || undefined,
        active: isActive,
        selected: isSelected,
        option: option,
        onClick: !isDisabled ? function () {
          return _this3.selectOption(option, index);
        } : undefined
      }, children ? children(option, index, options, {
        active: isActive,
        disabled: isDisabled,
        selected: isSelected
      }) : React.createElement(Box, {
        align: "start",
        pad: "small"
      }, React.createElement(Text, {
        margin: "none"
      }, _this3.optionLabel(index))));
    }))));
  };

  return SelectContainer;
}(Component);

_defineProperty(SelectContainer, "defaultProps", {
  children: null,
  disabled: undefined,
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

var SelectContainerWrapper = withTheme(SelectContainer);
export { SelectContainerWrapper as SelectContainer };