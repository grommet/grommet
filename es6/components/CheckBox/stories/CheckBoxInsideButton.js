function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Grommet, CheckBox, Text } from 'grommet';
import { grommet } from 'grommet/themes';

var CheckBoxInsideButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CheckBoxInsideButton, _Component);

  function CheckBoxInsideButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      checked: false
    });

    return _this;
  }

  var _proto = CheckBoxInsideButton.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var checked = this.state.checked;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(Button, {
      hoverIndicator: "background",
      onClick: function onClick() {
        _this2.setState({
          checked: !checked
        });
      }
    }, React.createElement(CheckBox, {
      tabIndex: "-1",
      checked: checked,
      label: React.createElement(Text, null, "Hi"),
      onChange: function onChange() {}
    }))));
  };

  return CheckBoxInsideButton;
}(Component);

storiesOf('CheckBox', module).add('Inside a Button', function () {
  return React.createElement(CheckBoxInsideButton, null);
});