function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleCheckBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleCheckBox, _Component);

  function SimpleCheckBox(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      return _this.setState({
        checked: event.target.checked
      });
    });

    _this.state = {
      checked: !!props.checked
    };
    return _this;
  }

  var _proto = SimpleCheckBox.prototype;

  _proto.render = function render() {
    var checked = this.state.checked;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(CheckBox, _extends({}, this.props, {
      checked: checked,
      onChange: this.onChange
    }))));
  };

  return SimpleCheckBox;
}(Component);

storiesOf('CheckBox', module).add('Simple', function () {
  return React.createElement(SimpleCheckBox, {
    label: "Choice"
  });
}).add('Toggle', function () {
  return React.createElement(SimpleCheckBox, {
    label: "Choice",
    toggle: true
  });
}).add('Disabled', function () {
  return React.createElement(SimpleCheckBox, {
    label: "Choice",
    checked: true,
    disabled: true
  });
}).add('Reverse', function () {
  return React.createElement(SimpleCheckBox, {
    label: "Choice",
    reverse: true
  });
}).add('No Label', function () {
  return React.createElement(SimpleCheckBox, null);
});