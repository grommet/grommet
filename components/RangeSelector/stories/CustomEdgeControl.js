"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var customEdge = (0, _utils.deepMerge)(_themes.grommet, {
  rangeSelector: {
    edge: {
      type: _react.default.createElement(_grommetIcons.Gremlin, {
        size: "large",
        color: "neutral-2"
      }) // it is also possible to use an actual node
      // type:  <div style={{ padding: '24px', background: 'red' }} />,

    }
  }
});

var CustomEdgeControl =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CustomEdgeControl, _Component);

  function CustomEdgeControl() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      values: [2, 7]
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (values) {
      return _this.setState({
        values: values
      });
    });

    return _this;
  }

  var _proto = CustomEdgeControl.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        direction = _this$props.direction,
        rest = _objectWithoutPropertiesLoose(_this$props, ["direction"]);

    var values = this.state.values;
    return _react.default.createElement(_grommet.Grommet, {
      theme: customEdge
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "xlarge",
      gap: "large"
    }, _react.default.createElement(_grommet.Text, {
      style: {
        fontFamily: 'Comic Sans MS'
      },
      color: "brand"
    }, "Feed the gremlins with grommets...", ' '), _react.default.createElement(_grommet.Stack, null, _react.default.createElement(_grommet.Box, {
      direction: "row",
      justify: "between"
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (value) {
      return _react.default.createElement(_grommet.Box, {
        key: value,
        width: "xsmall",
        height: "xsmall",
        justify: "center",
        align: "center",
        pad: "small",
        border: false
      }, _react.default.createElement(_grommetIcons.Grommet, {
        color: "brand",
        size: "small"
      }));
    })), _react.default.createElement(_grommet.RangeSelector, _extends({
      direction: direction,
      min: 0,
      max: 9,
      size: "full",
      values: values,
      color: "accent-3",
      onChange: this.onChange
    }, rest)))));
  };

  return CustomEdgeControl;
}(_react.Component);

_defineProperty(CustomEdgeControl, "defaultProps", {
  direction: 'horizontal'
});

(0, _react2.storiesOf)('RangeSelector', module).add('Custom Edge Controls', function () {
  return _react.default.createElement(CustomEdgeControl, null);
});