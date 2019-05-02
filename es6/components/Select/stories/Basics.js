function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customRoundedTheme = deepMerge(grommet, {
  global: {
    control: {
      border: {
        radius: '24px'
      }
    },
    input: {
      weight: 400
    },
    font: {
      size: '12px'
    }
  },
  text: {
    medium: '13px'
  },
  textInput: {
    extend: 'padding: 0 12px;'
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;'
    }
  }
});

var SimpleSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SimpleSelect, _Component);

  function SimpleSelect() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      options: ['one', 'two'],
      value: ''
    });

    return _this;
  }

  var _proto = SimpleSelect.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["theme"]);

    var _this$state = this.state,
        options = _this$state.options,
        value = _this$state.value;
    return React.createElement(Grommet, {
      full: true,
      theme: theme || grommet
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, React.createElement(Select, _extends({
      id: "select",
      name: "select",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return _this2.setState({
          value: option
        });
      }
    }, rest))));
  };

  return SimpleSelect;
}(Component);

_defineProperty(SimpleSelect, "propTypes", {
  theme: PropTypes.shape({})
});

_defineProperty(SimpleSelect, "defaultProps", {
  theme: undefined
});

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

storiesOf('Select', module).add('Simple', function () {
  return React.createElement(SimpleSelect, null);
}).add('Custom', function () {
  return React.createElement(SimpleSelect, {
    open: true,
    theme: customRoundedTheme
  });
});