"use strict";

exports.__esModule = true;
exports.ResponsiveTip = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tooltipColor = 'white';
var theme = (0, _utils.deepMerge)(_grommet.grommet, {
  list: {
    item: {
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      },
      background: tooltipColor,
      border: false // extend: `color: white;`,

    }
  }
});
var listData = [{
  entry: '6.7 TB (15.6%)',
  action: 'Used'
}, {
  entry: '7.2 TB (16.8%)',
  action: 'Subscribed'
}, {
  entry: '29 TB (67.6 %)',
  action: 'Free'
}];

var TipContent = function TipContent(_ref) {
  var size = _ref.size;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: size
  }, size === 'large' && /*#__PURE__*/_react["default"].createElement("svg", {
    viewBox: "0 0 30 30",
    version: "1.1",
    width: "22px",
    height: "22px"
  }, /*#__PURE__*/_react["default"].createElement("polygon", {
    fill: tooltipColor,
    points: "6 0 32 12 6 29",
    transform: "matrix(-1 0 0 1 36 0)"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: tooltipColor,
    round: "xsmall",
    pad: "small",
    gap: size !== 'small' ? 'medium' : 'small',
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    weight: "bold",
    alignSelf: "center",
    size: size === 'small' ? 'xsmall' : 'small'
  }, "10/12/2020 2AM MDT"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row-responsive"
  }, size !== 'small' && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "small",
    pad: {
      vertical: 'xsmall'
    },
    responsive: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "10px",
    background: "graph-0"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "10px",
    background: "graph-1"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "10px",
    background: "graph-2"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: listData,
    primaryKey: "action",
    secondaryKey: "entry"
  }, function (datum, index) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      gap: "medium",
      direction: "row",
      align: "center",
      justify: "between",
      key: index
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small",
      weight: "bold",
      color: size !== 'small' ? undefined : "graph-" + index
    }, datum.action), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small",
      weight: "bold",
      color: size !== 'small' ? undefined : "graph-" + index
    }, datum.entry));
  }))));
};

var ResponsiveTip = function ResponsiveTip() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: theme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.ResponsiveContext.Consumer, null, function (size) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large",
      gap: "medium",
      background: "light-4",
      height: {
        min: '100%'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      size: "small",
      level: 3
    }, "Hover the Meter and play with the window size"), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "window size: ", size), /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
      content: /*#__PURE__*/_react["default"].createElement(TipContent, {
        size: size
      }),
      dropProps: {
        align: {
          left: 'right'
        },
        overflow: 'visible'
      },
      plain: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      type: "circle",
      thickness: "large",
      size: "small",
      values: [{
        value: 67.6
      }, {
        value: 16.8
      }, {
        value: 15.6
      }]
    })));
  }));
};

exports.ResponsiveTip = ResponsiveTip;
ResponsiveTip.story = {
  name: 'Responsive',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};