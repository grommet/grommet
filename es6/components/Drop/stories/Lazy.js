function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../../utils/object';
var lazyTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: 'rgba(255, 255, 255, 0.7)'
    }
  }
});
var finalLazyPad = 'xlarge';

var LazyDrop =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(LazyDrop, _Component);

  function LazyDrop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      pad: 'small'
    });

    _defineProperty(_assertThisInitialized(_this), "topLeftTargetRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "topRightTargetRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "bottomLeftTargetRef", createRef());

    _defineProperty(_assertThisInitialized(_this), "bottomRightTargetRef", createRef());

    return _this;
  }

  var _proto = LazyDrop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.forceUpdate();
    setTimeout(function () {
      return _this2.setState({
        pad: finalLazyPad
      });
    }, 2000);
  };

  _proto.render = function render() {
    var pad = this.state.pad;
    return React.createElement(Grommet, {
      theme: lazyTheme,
      full: true
    }, React.createElement(Box, {
      fill: true,
      justify: "between",
      pad: "large",
      gap: "small"
    }, React.createElement(Box, {
      direction: "row",
      justify: "between",
      pad: {
        horizontal: 'small'
      }
    }, React.createElement(Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      ref: this.topLeftTargetRef
    }, "Target"), this.topLeftTargetRef.current && React.createElement(Drop, {
      align: {
        top: 'bottom',
        left: 'left'
      },
      target: this.topLeftTargetRef.current,
      responsive: true
    }, React.createElement(Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'xlarge',
        vertical: pad
      }
    }, "align top to bottom")), React.createElement(Box, {
      background: "dark-3",
      pad: "medium",
      align: "center",
      ref: this.topRightTargetRef
    }, "Target"), this.topRightTargetRef.current && React.createElement(Drop, {
      align: {
        bottom: 'top',
        right: 'right'
      },
      target: this.topRightTargetRef.current,
      responsive: true
    }, React.createElement(Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'xlarge',
        vertical: pad
      }
    }, "align bottom to top"))), React.createElement(Box, {
      direction: "row",
      justify: "between"
    }, React.createElement(Box, {
      background: "dark-3",
      pad: "medium",
      ref: this.bottomLeftTargetRef
    }, "Target"), this.bottomLeftTargetRef.current && React.createElement(Drop, {
      align: {
        bottom: 'top',
        left: 'left'
      },
      target: this.bottomLeftTargetRef.current,
      responsive: true
    }, React.createElement(Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'xlarge',
        vertical: pad
      }
    }, "align bottom to top")), React.createElement(Box, {
      background: "dark-3",
      pad: "medium",
      ref: this.bottomRightTargetRef
    }, "Target"), this.bottomRightTargetRef.current && React.createElement(Drop, {
      align: {
        top: 'bottom',
        right: 'right'
      },
      target: this.bottomRightTargetRef.current,
      responsive: true
    }, React.createElement(Box, {
      height: pad === 'small' ? 'xsmall' : undefined,
      pad: {
        horizontal: 'xlarge',
        vertical: pad
      }
    }, "align top to bottom")))));
  };

  return LazyDrop;
}(Component);

storiesOf('Drop', module).add('Lazy', function () {
  return React.createElement(LazyDrop, null);
});