function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Button, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var TooltipDrop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TooltipDrop, _Component);

  function TooltipDrop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "ref", createRef());

    return _this;
  }

  var _proto = TooltipDrop.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var over = this.state.over;
    return React.createElement(Grommet, {
      theme: grommet,
      full: true
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Button, {
      label: "Button",
      ref: this.ref,
      onMouseOver: function onMouseOver() {
        return _this2.setState({
          over: true
        });
      },
      onMouseOut: function onMouseOut() {
        return _this2.setState({
          over: false
        });
      },
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }), this.ref.current && over && React.createElement(Drop, {
      align: {
        left: 'right'
      },
      target: this.ref.current,
      plain: true
    }, React.createElement(Box, {
      margin: "xsmall",
      pad: "small",
      background: "dark-3",
      round: {
        size: 'medium',
        corner: 'left'
      }
    }, "tooltip contents"))));
  };

  return TooltipDrop;
}(Component);

storiesOf('Drop', module).add('Tooltip', function () {
  return React.createElement(TooltipDrop, null);
});