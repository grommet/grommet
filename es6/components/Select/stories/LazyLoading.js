function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component, PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, CheckBox, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort(function (a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
});

var Option =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Option, _PureComponent);

  function Option() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Option.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        selected = _this$props.selected;
    return React.createElement(Box, {
      direction: "row",
      gap: "small",
      align: "center",
      pad: "xsmall"
    }, React.createElement(CheckBox, {
      tabIndex: "-1",
      checked: selected,
      onChange: function onChange() {}
    }), value);
  };

  return Option;
}(PureComponent);

var LazyLoading =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(LazyLoading, _Component);

  function LazyLoading() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      selected: [],
      options: dummyOptions.slice(0, 200)
    });

    _defineProperty(_assertThisInitialized(_this), "onMore", function () {
      setTimeout(function () {
        var options = _this.state.options;
        console.log('onmore called');

        _this.setState({
          options: dummyOptions.slice(0, options.length + 200)
        });
      }, 1000);
    });

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      var _this$state = _this.state,
          selected = _this$state.selected,
          options = _this$state.options;

      _this.setState({
        options: options.sort(function (p1, p2) {
          var p1Exists = selected.includes(p1);
          var p2Exists = selected.includes(p2);

          if (!p1Exists && p2Exists) {
            return 1;
          }

          if (p1Exists && !p2Exists) {
            return -1;
          }

          return p1.localeCompare(p2, undefined, {
            numeric: true,
            sensitivity: 'base'
          });
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (_ref) {
      var nextSelected = _ref.selected;

      _this.setState({
        selected: nextSelected
      });
    });

    return _this;
  }

  var _proto2 = LazyLoading.prototype;

  _proto2.render = function render() {
    var _this$state2 = this.state,
        selected = _this$state2.selected,
        options = _this$state2.options;
    return React.createElement(Grommet, {
      theme: grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, React.createElement(Select, {
      multiple: true,
      closeOnChange: false,
      placeholder: "select an option...",
      selected: selected,
      options: options,
      dropHeight: "medium",
      onMore: this.onMore,
      onClose: this.onClose,
      onChange: this.onChange
    }, function (option, index) {
      return React.createElement(Option, {
        value: option,
        selected: selected.indexOf(index) !== -1
      });
    })));
  };

  return LazyLoading;
}(Component);

storiesOf('Select', module).add('Lazy Loading options', function () {
  return React.createElement(LazyLoading, null);
});