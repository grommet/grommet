"use strict";

exports.__esModule = true;
exports["default"] = exports.Zoom = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _calcs2 = require("../calcs");
var _data = require("./data");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var intervalDays = {
  '1 week': 7,
  '30 days': 30,
  '1 year': 365
};
var ZoomChart = function ZoomChart(_ref) {
  var data = _ref.data,
    max = _ref.max;
  var _useState = (0, _react.useState)(new Date(data[data.length - 1].time)),
    reference = _useState[0],
    setReference = _useState[1];
  var _useState2 = (0, _react.useState)(Object.keys(intervalDays)[1]),
    interval = _useState2[0],
    setInterval = _useState2[1];
  var startDate = new Date(reference);
  startDate.setDate(reference.getDate() - intervalDays[interval]);
  var values = [];
  data.some(function (d) {
    var date = new Date(d.time);
    if (date > reference) {
      return true;
    }
    if (date >= startDate) {
      values.push({
        value: [d.time, d.value]
      });
    }
    return false;
  });
  var _calcs = (0, _calcs2.calcs)(values, {
      min: 0,
      max: max
    }),
    axis = _calcs.axis,
    bounds = _calcs.bounds,
    thickness = _calcs.thickness;

  // calculate next and previous references
  var days = intervalDays[interval];
  var nextReference = new Date(reference);
  nextReference.setDate(reference.getDate() + days);
  var firstReference = new Date(data[data.length - 1].time);
  if (nextReference > firstReference) {
    nextReference = firstReference;
  }
  var previousReference = new Date(reference);
  previousReference.setDate(reference.getDate() - days);
  var lastReference = new Date(data[0].time);
  lastReference.setDate(lastReference.getDate() + days);
  if (previousReference < lastReference) {
    previousReference = lastReference;
  }
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      direction: "row",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      hoverIndicator: true,
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Previous, null),
      onClick: function onClick() {
        return setReference(previousReference);
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      justify: "end"
    }, Object.keys(intervalDays).map(function (_int) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        key: _int,
        onClick: function onClick() {
          return setInterval(_int);
        }
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        pad: "small"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        color: interval === _int ? 'black' : 'brand'
      }, _int)));
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
      guidingChild: "first"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        horizontal: thickness
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Chart, {
      type: "bar",
      overflow: true,
      bounds: bounds,
      values: values,
      thickness: thickness,
      size: {
        width: 'full',
        height: 'small'
      }
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      fill: true,
      justify: "between"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: "top",
      align: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, axis[1][0]))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      border: "bottom",
      align: "start"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "xsmall",
      background: {
        color: 'white',
        opacity: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, axis[1][1]))))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      justify: "between"
    }, axis[0].map(function (t) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        key: t,
        className: "chromatic-ignore"
      }, new Date(t).toLocaleDateString());
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      hoverIndicator: true,
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Next, null),
      onClick: function onClick() {
        return setReference(nextReference);
      }
    }))
    // </Grommet>
  );
};
var Zoom = exports.Zoom = function Zoom() {
  return /*#__PURE__*/_react["default"].createElement(ZoomChart, {
    data: (0, _data.generateData)(1000, 100),
    max: 100
  });
};
Zoom.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Visualizations/Chart/Zoom'
};