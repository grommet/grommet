function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../../utils/object';
var customTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: {
        dark: 'neutral-2',
        light: 'neutral-2'
      },
      border: {
        radius: '10px'
      },
      zIndex: '13'
    }
  }
});

var Custom =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Custom, _Component);

  function Custom() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "targetRef", createRef());

    return _this;
  }

  var _proto = Custom.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.forceUpdate();
  };

  _proto.render = function render() {
    return React.createElement(Grommet, {
      theme: customTheme,
      full: true
    }, React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, React.createElement(Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: this.targetRef
    }, "Box"), this.targetRef.current && React.createElement(Drop, {
      align: {
        top: 'bottom',
        left: 'right'
      },
      target: this.targetRef.current
    }, React.createElement(Box, {
      pad: "small"
    }, "This Drop uses a custom theme"))));
  };

  return Custom;
}(Component);

storiesOf('Drop', module).add('Custom', function () {
  return React.createElement(Custom, null);
});