function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var defaultOptions = [];
var objectOptions = [];

for (var i = 1; i <= 200; i += 1) {
  defaultOptions.push("option " + i);
  objectOptions.push({
    lab: "option " + i,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0
  });
}

var ObjectMultiSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ObjectMultiSelect, _Component);

  function ObjectMultiSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      options: objectOptions,
      value: ''
    });

    return _this;
  }

  var _proto = ObjectMultiSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        options = _this$state.options,
        value = _this$state.value;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, React.createElement(Select, {
      size: "medium",
      placeholder: "Select",
      multiple: true,
      closeOnChange: false,
      disabledKey: "dis",
      labelKey: "lab",
      valueKey: "val",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var nextValue = _ref.value;
        return _this2.setState({
          value: nextValue
        });
      },
      onClose: function onClose() {
        return _this2.setState({
          options: objectOptions
        });
      },
      onSearch: function onSearch(text) {
        var exp = new RegExp(text, 'i');

        _this2.setState({
          options: objectOptions.filter(function (o) {
            return exp.test(o.lab);
          })
        });
      }
    })));
  };

  return ObjectMultiSelect;
}(Component);

storiesOf('Select', module).add('Object Multiple', function () {
  return React.createElement(ObjectMultiSelect, null);
});