"use strict";

exports.__esModule = true;
exports.Example = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var theme = {
  themeMode: 'dark',
  global: {
    font: {
      family: "-apple-system,\n           BlinkMacSystemFont, \n           \"Segoe UI\""
    }
  },
  card: {
    container: {
      background: '#FFFFFF12',
      elevation: 'none'
    },
    footer: {
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      },
      background: '#FFFFFF06'
    }
  }
};
var gradient = [{
  value: 28,
  color: 'status-ok'
}, {
  value: 50,
  color: 'status-warning'
}, {
  value: 80,
  color: 'status-critical'
}];
var data = [{
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Bluetooth, {
    size: "large"
  }),
  title: 'Memory (EEC)',
  subTitle: '8 GB @ 400Hz',
  message: 'Past 24hrs',
  type: 'bar'
}, {
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Storage, {
    size: "large"
  }),
  title: 'Storage',
  subTitle: 'Sub-system and Devices',
  message: '36.8 TB available',
  type: 'line'
}, {
  icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Trigger, {
    size: "large"
  }),
  title: 'Power (Watts)',
  subTitle: '720 Watt Service',
  message: 'Past 12hrs',
  type: 'point'
}];

var ChartPreview = function ChartPreview(_ref) {
  var type = _ref.type;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
    type: type,
    id: type,
    dash: type === 'line',
    round: true,
    thickness: "xsmall",
    bounds: [[0, 6], [0, 100]],
    values: [{
      value: [6, 100],
      label: 'one hundred'
    }, {
      value: [5, 70],
      label: 'seventy'
    }, {
      value: [4, 40],
      label: 'sixty'
    }, {
      value: [3, 80],
      label: 'eighty'
    }, {
      value: [2, 25],
      label: 'forty'
    }, {
      value: [1, 50],
      label: 'thirty'
    }, {
      value: [0, 25],
      label: 'sixty'
    }],
    "aria-label": "chart card",
    color: gradient,
    size: {
      height: 'xsmall'
    }
  }));
};

var Identifier = function Identifier(_ref2) {
  var children = _ref2.children,
      title = _ref2.title,
      subTitle = _ref2.subTitle,
      size = _ref2.size,
      rest = _objectWithoutPropertiesLoose(_ref2, ["children", "title", "subTitle", "size"]);

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, _extends({
    gap: "small",
    align: "center",
    direction: "row",
    pad: "small"
  }, rest), children, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: size,
    weight: "bold"
  }, title), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: size
  }, subTitle)));
};

var Example = function Example() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    background: "dark-1",
    height: "100%"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    gap: "medium",
    columns: {
      count: 'fit',
      size: 'small'
    }
  }, data.map(function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      key: value.title,
      onClick: function onClick() {
        // eslint-disable-next-line no-alert
        alert('Card was Clicked!');
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CardBody, {
      pad: "small"
    }, /*#__PURE__*/_react["default"].createElement(Identifier, {
      title: value.title,
      subTitle: value.subTitle,
      size: "small"
    }, value.icon), /*#__PURE__*/_react["default"].createElement(ChartPreview, {
      type: value.type
    })), /*#__PURE__*/_react["default"].createElement(_grommet.CardFooter, {
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "xsmall"
    }, value.message)));
  }))));
};

exports.Example = Example;
(0, _react2.storiesOf)('Card', module).add('Clickable', function () {
  return /*#__PURE__*/_react["default"].createElement(Example, null);
});