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
})(["max-height:inherit;@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){width:100%;}"]);
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

    /* eslint-disable-next-line react/prop-types */
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

    /* eslint-disable react/prop-types */
    var _this$props2 = this.props,
        children = _this$props2.children,
        disabled = _this$props2.disabled,
        id = _this$props2.id,
        name = _this$props2.name,
        onKeyDown = _this$props2.onKeyDown,
        onSearch = _this$props2.onSearch,
        options = _this$props2.options,
        searchPlaceholder = _this$props2.searchPlaceholder,
        selected = _this$props2.selected,
        theme = _this$props2.theme,
        value = _this$props2.value;
    /* eslint-enable react/prop-types */

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
      var isDisabled = Array.isArray(disabled) && disabled.indexOf(index) !== -1;
      var isSelected = selected === index || Array.isArray(selected) && selected.indexOf(index) !== -1;
      var isActive = isSelected || activeIndex === index || option && option === value || option && Array.isArray(value) && value.indexOf(option) !== -1;
      return React.createElement(SelectOption, {
        ref: function ref(_ref) {
          _this3.optionsRef[index] = _ref;
        },
        disabled: isDisabled || undefined,
        active: isActive,
        selected: isSelected,
        option: option,
        key: "option_" + (name || '') + "_" + index,
        onClick: function onClick() {
          return _this3.selectOption(option, index);
        }
      }, children ? children(option, index, options, {
        active: isActive,
        disabled: isDisabled,
        selected: isSelected
      }) : React.createElement(Box, {
        align: "start",
        pad: "small"
      }, React.createElement(Text, {
        margin: "none"
      }, option !== null && option !== undefined ? option.toString() : undefined)));
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