function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { normalizeColor, deepMerge } from 'grommet/utils';
import { FormCheckmark } from "grommet-icons/es6/icons/FormCheckmark";
var customCheckBoxTheme = {
  checkBox: {
    border: {
      color: {
        light: 'accent-2'
      },
      // width: 'xsmall',
      radius: '2px'
    },
    check: {
      extend: function extend(_ref) {
        var theme = _ref.theme,
            checked = _ref.checked;
        return "\n        " + (checked && "background-color: " + normalizeColor('neutral-1', theme) + ";") + "\n        ";
      }
    },
    color: {
      light: 'neutral-3',
      dark: 'neutral-3'
    },
    gap: 'xsmall',
    hover: {
      border: {
        color: undefined
      }
    },
    icon: {
      size: '18px',
      extend: 'stroke: white;'
    },
    icons: {
      checked: FormCheckmark
    },
    size: '18px',
    extend: "\n      color: #9C9C9C;\n    "
  }
};

var ThemedCheckBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ThemedCheckBox, _Component);

  function ThemedCheckBox() {
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

  var _proto = ThemedCheckBox.prototype;

  _proto.render = function render() {
    var checked = this.state.checked;
    return React.createElement(Grommet, {
      theme: deepMerge(grommet, customCheckBoxTheme)
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(CheckBox, _extends({}, this.props, {
      label: "Choice",
      checked: checked,
      onChange: this.onChange
    }))));
  };

  return ThemedCheckBox;
}(Component);

storiesOf('CheckBox', module).add('Custom', function () {
  return React.createElement(ThemedCheckBox, null);
});