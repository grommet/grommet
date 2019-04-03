function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';
import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var checkboxCheckStyle = css(["background-color:#2196f3;border-color:#2196f3;"]);
var customToggleTheme = {
  global: {
    colors: {
      'toggle-bg': '#757575',
      'toggle-knob': 'white',
      'toggle-accent': 'accent-2'
    }
  },
  checkBox: {
    border: {
      color: {
        light: 'toggle-bg'
      }
    },
    color: {
      light: 'toggle-knob'
    },
    check: {
      radius: '2px'
    },
    hover: {
      border: {
        color: undefined
      }
    },
    toggle: {
      background: {
        light: 'toggle-accent'
      },
      color: {
        light: 'toggle-knob'
      },
      size: '36px',
      knob: {
        extend: "\n          top: -4px;\n          box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24);\n        "
      },
      extend: function extend(_ref) {
        var checked = _ref.checked;
        return "\n        height: 14px;\n        " + (checked && checkboxCheckStyle) + "\n      ";
      }
    },
    gap: 'xsmall',
    size: '18px'
  }
};

var ThemedToggle =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ThemedToggle, _Component);

  function ThemedToggle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      checked: false
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        checked: event.target.checked
      });
    });

    return _this;
  }

  var _proto = ThemedToggle.prototype;

  _proto.render = function render() {
    var checked = this.state.checked;
    return React.createElement(Grommet, {
      theme: deepMerge(grommet, customToggleTheme)
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(CheckBox, _extends({}, this.props, {
      label: "Choice",
      checked: checked,
      onChange: this.onChange,
      toggle: true
    }))));
  };

  return ThemedToggle;
}(Component);

storiesOf('CheckBox', module).add('Custom Toggle', function () {
  return React.createElement(ThemedToggle, null);
});