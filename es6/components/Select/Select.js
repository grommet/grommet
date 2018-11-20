function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Box } from '../Box';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { TextInput } from '../TextInput';
import { withForwardRef, withTheme } from '../hocs';
import { controlBorderStyle, normalizeColor } from '../../utils';
import { SelectContainer } from './SelectContainer';
var SelectTextInput = styled(TextInput).withConfig({
  displayName: "Select__SelectTextInput",
  componentId: "sc-17idtfo-0"
})(["cursor:pointer;"]);
var StyledSelectBox = styled(Box).withConfig({
  displayName: "Select__StyledSelectBox",
  componentId: "sc-17idtfo-1"
})(["", ";", ";"], function (props) {
  return !props.plain && controlBorderStyle;
}, function (props) {
  return props.theme.select && props.theme.select.control && props.theme.select.control.extend;
});

var Select =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Select, _Component);

  function Select() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOpen", function () {
      var onOpen = _this.props.onOpen;

      _this.setState({
        open: true
      }, function () {
        if (onOpen) {
          onOpen();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClose", function () {
      var onClose = _this.props.onClose;

      _this.setState({
        open: false
      }, function () {
        if (onClose) {
          onClose();
        }
      });
    });

    return _this;
  }

  var _proto = Select.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        a11yTitle = _this$props.a11yTitle,
        alignSelf = _this$props.alignSelf,
        children = _this$props.children,
        closeOnChange = _this$props.closeOnChange,
        disabled = _this$props.disabled,
        dropAlign = _this$props.dropAlign,
        dropTarget = _this$props.dropTarget,
        forwardRef = _this$props.forwardRef,
        gridArea = _this$props.gridArea,
        id = _this$props.id,
        margin = _this$props.margin,
        messages = _this$props.messages,
        onChange = _this$props.onChange,
        onClose = _this$props.onClose,
        placeholder = _this$props.placeholder,
        plain = _this$props.plain,
        size = _this$props.size,
        theme = _this$props.theme,
        value = _this$props.value,
        rest = _objectWithoutPropertiesLoose(_this$props, ["a11yTitle", "alignSelf", "children", "closeOnChange", "disabled", "dropAlign", "dropTarget", "forwardRef", "gridArea", "id", "margin", "messages", "onChange", "onClose", "placeholder", "plain", "size", "theme", "value"]);

    var open = this.state.open;
    delete rest.onSearch;

    var onSelectChange = function onSelectChange(event) {
      if (closeOnChange) {
        _this2.onClose();
      }

      if (onChange) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        onChange.apply(void 0, [event].concat(args));
      }
    };

    var SelectIcon = theme.select.icons.down;
    var selectValue;
    var textValue;

    if (!React.isValidElement(value)) {
      if (Array.isArray(value)) {
        if (value.length > 1) {
          if (React.isValidElement(value[0])) {
            selectValue = value;
          } else {
            textValue = messages.multiple;
          }
        } else if (value.length === 1) {
          if (React.isValidElement(value[0])) {
            selectValue = value[0];
          } else {
            textValue = value[0];
          }
        } else {
          textValue = '';
        }
      } else {
        textValue = value;
      }
    } else {
      selectValue = value;
    } // const dark = theme.select.background ? colorIsDark(theme.select.background) : theme.dark;


    var iconColor = normalizeColor(theme.select.icons.color || 'control', theme);
    return React.createElement(Keyboard, {
      onDown: this.onOpen,
      onUp: this.onOpen
    }, React.createElement(DropButton, {
      ref: forwardRef,
      id: id,
      disabled: disabled === true || undefined,
      dropAlign: dropAlign,
      dropTarget: dropTarget,
      open: open,
      alignSelf: alignSelf,
      gridArea: gridArea,
      margin: margin,
      onOpen: this.onOpen,
      onClose: this.onClose,
      dropContent: React.createElement(SelectContainer, _extends({}, this.props, {
        onChange: onSelectChange
      }))
    }, React.createElement(StyledSelectBox, {
      align: "center",
      direction: "row",
      justify: "between",
      background: theme.select.background,
      plain: plain,
      theme: theme
    }, React.createElement(Box, {
      direction: "row",
      flex: true,
      basis: "auto"
    }, selectValue || React.createElement(SelectTextInput, _extends({
      a11yTitle: a11yTitle && "" + a11yTitle + (typeof value === 'string' ? ", " + value : ''),
      id: id ? id + "__input" : undefined
    }, rest, {
      tabIndex: "-1",
      type: "text",
      placeholder: placeholder,
      plain: true,
      readOnly: true,
      value: textValue,
      size: size,
      onClick: disabled === true ? undefined : this.onOpen
    }))), React.createElement(Box, {
      margin: {
        horizontal: 'small'
      },
      flex: false,
      style: {
        minWidth: 'auto'
      }
    }, React.createElement(SelectIcon, {
      color: iconColor,
      size: size
    })))));
  };

  return Select;
}(Component);

_defineProperty(Select, "defaultProps", {
  closeOnChange: true,
  dropAlign: {
    top: 'bottom',
    left: 'left'
  },
  messages: {
    multiple: 'multiple'
  }
});

var SelectDoc;

if (process.env.NODE_ENV !== 'production') {
  SelectDoc = require('./doc').doc(Select); // eslint-disable-line global-require
}

var SelectWrapper = compose(withTheme, withForwardRef)(SelectDoc || Select);
export { SelectWrapper as Select };