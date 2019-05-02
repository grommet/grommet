function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React, { Component, PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, CheckBox, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';

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

var dummyOptions = Array(2000).fill().map(function (_, i) {
  return "option " + i;
}).sort(function (a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base'
  });
});

var ManyOptions =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ManyOptions, _Component);

  function ManyOptions() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      selected: [],
      options: dummyOptions
    });

    return _this;
  }

  var _proto2 = ManyOptions.prototype;

  _proto2.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        options = _this$state.options,
        selected = _this$state.selected;
    return React.createElement(Grommet, {
      full: true,
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
      onClose: function onClose() {
        return _this2.setState({
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
      },
      onChange: function onChange(_ref) {
        var nextSelected = _ref.selected;

        _this2.setState({
          selected: nextSelected
        });
      }
    }, function (option, index) {
      return React.createElement(Option, {
        value: option,
        selected: selected.indexOf(index) !== -1
      });
    })));
  };

  return ManyOptions;
}(Component);

storiesOf('Select', module).add('Lots of options', function () {
  return React.createElement(ManyOptions, null);
});