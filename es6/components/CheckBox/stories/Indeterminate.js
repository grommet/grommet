function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';

var IndeterminateCheckBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(IndeterminateCheckBox, _Component);

  function IndeterminateCheckBox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      checked: [],
      checkboxes: ['fruits', 'vegetables', 'olive oil']
    });

    _defineProperty(_assertThisInitialized(_this), "onCheckAll", function (event) {
      var checkboxes = _this.state.checkboxes;

      if (event.target.checked) {
        _this.setState({
          checked: checkboxes
        });
      } else {
        _this.setState({
          checked: []
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCheck", function (event, value) {
      var checked = _this.state.checked;

      if (event.target.checked) {
        checked.push(value);

        _this.setState({
          checked: checked
        });
      } else {
        _this.setState({
          checked: checked.filter(function (item) {
            return item !== value;
          })
        });
      }
    });

    return _this;
  }

  var _proto = IndeterminateCheckBox.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        checked = _this$state.checked,
        checkboxes = _this$state.checkboxes;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      align: "center",
      pad: "large"
    }, React.createElement(Box, {
      direction: "row",
      gap: "medium"
    }, React.createElement(CheckBox, {
      checked: checked.length === 3,
      indeterminate: checked.length > 0 && checked.length < 3,
      label: "All",
      onChange: this.onCheckAll
    }), checkboxes.map(function (item) {
      return React.createElement(CheckBox, {
        key: item,
        checked: checked.indexOf(item) !== -1,
        label: item,
        onChange: function onChange(e) {
          return _this2.onCheck(e, item);
        }
      });
    }))));
  };

  return IndeterminateCheckBox;
}(Component);

storiesOf('CheckBox', module).add('Interminate', function () {
  return React.createElement(IndeterminateCheckBox, null);
});