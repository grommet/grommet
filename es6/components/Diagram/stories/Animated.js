function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Diagram, Grommet, grommet, Stack, Text } from 'grommet';
import { Diamond } from "grommet-icons/es6/icons/Diamond";
import { deepMerge } from 'grommet/utils';
import { data } from './data';
var customTheme = deepMerge(grommet, {
  diagram: {
    extend: '@keyframes example { to { stroke-dashoffset: 0; } } path { stroke-dasharray: 500; stroke-dashoffset: 500; animation: example 3s linear forwards; }'
  }
});

var connection = function connection(fromTarget, toTarget, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      color = _ref.color,
      rest = _objectWithoutPropertiesLoose(_ref, ["color"]);

  return _extends({
    fromTarget: fromTarget,
    toTarget: toTarget,
    anchor: 'vertical',
    color: 'accent-4',
    thickness: 'xsmall',
    round: true,
    type: 'curved'
  }, rest);
};

var DiamondContainer = function DiamondContainer(_ref2) {
  var carat = _ref2.carat,
      color = _ref2.color,
      cut = _ref2.cut,
      align = _ref2.align,
      id = _ref2.id,
      name = _ref2.name,
      textSize = _ref2.textSize;
  return React.createElement(Box, {
    align: align || 'center',
    alignSelf: "center",
    direction: "row",
    gap: "medium",
    key: id
  }, React.createElement(Diamond, {
    id: id,
    size: "xlarge",
    color: "neutral-3"
  }), React.createElement(Box, {
    align: align
  }, React.createElement(Text, {
    size: "medium",
    weight: "bold"
  }, name), carat && React.createElement(Text, {
    size: textSize
  }, " Carat: ", carat, " "), color && React.createElement(Text, {
    size: textSize
  }, " Color: ", color, " "), cut && React.createElement(Text, {
    size: textSize
  }, " Cut: ", cut, " ")));
};

var Container = function Container(_ref3) {
  var node = _ref3.node,
      index = _ref3.index;
  return React.createElement(DiamondContainer, {
    carat: node.carat,
    color: node.color,
    cut: node.cut,
    id: index,
    key: node.name,
    name: node.name,
    textSize: "small"
  });
};

var Animated =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Animated, _React$Component);

  function Animated() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      draw: true
    });

    return _this;
  }

  var _proto = Animated.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.timer = setInterval(function () {
      var draw = _this2.state.draw;

      _this2.setState({
        draw: !draw
      });
    }, 3000);
  };

  _proto.render = function render() {
    var draw = this.state.draw;
    var connections = [];

    if (draw) {
      connections.push(connection('4', '1', {
        anchor: 'vertical'
      }));
      connections.push(connection('4', '2', {
        anchor: 'vertical'
      }));
      connections.push(connection('4', '3', {
        anchor: 'vertical'
      }));
    }

    return React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Box, {
      align: "center"
    }, React.createElement(Box, {
      pad: "large"
    }, React.createElement(Stack, null, React.createElement(Box, null, React.createElement(Box, {
      alignSelf: "center",
      margin: {
        bottom: 'large'
      }
    }, React.createElement(Container, {
      node: data[0],
      index: 1
    }), React.createElement(Box, {
      pad: "small"
    }), React.createElement(Box, {
      id: "4",
      width: "xsmall",
      margin: {
        bottom: 'large',
        top: 'xlarge'
      }
    })), React.createElement(Box, {
      direction: "row",
      gap: "xlarge"
    }, [2, 3].map(function (id) {
      return React.createElement(Container, {
        node: data[id - 1],
        index: id
      });
    }))), React.createElement(Diagram, {
      connections: connections
    })))));
  };

  return Animated;
}(React.Component);

storiesOf('Diagram', module).add('Animated', function () {
  return React.createElement(Animated, null);
});