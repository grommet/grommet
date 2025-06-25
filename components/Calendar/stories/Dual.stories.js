"use strict";

exports.__esModule = true;
exports["default"] = exports.Dual = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Dual = exports.Dual = function Dual() {
  var _useState = (0, _react.useState)(),
    date = _useState[0],
    setDate = _useState[1];
  var _useState2 = (0, _react.useState)(),
    dates = _useState2[0],
    setDates = _useState2[1];
  var _useState3 = (0, _react.useState)('2020-08-07T15:13:47.290Z'),
    reference1 = _useState3[0],
    setReference1 = _useState3[1];
  var _useState4 = (0, _react.useState)('2020-09-01T15:15:34.916Z'),
    reference2 = _useState4[0],
    setReference2 = _useState4[1];
  var onSelect = function onSelect(arg) {
    if (Array.isArray(arg)) {
      setDate(undefined);
      setDates(arg);
    } else {
      setDate(arg);
      setDates(undefined);
    }
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      justify: "center",
      pad: "large",
      direction: "row",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      animate: false,
      showAdjacentDays: false,
      range: true,
      date: date,
      dates: dates,
      onSelect: onSelect,
      reference: reference1,
      onReference: function onReference(reference) {
        var refDate = new Date(reference);
        var nextDate = new Date(refDate);
        nextDate.setMonth(refDate.getMonth() + 1, 1);
        setReference2(nextDate.toISOString());
      },
      header: function header(_ref) {
        var currentDate = _ref.date,
          locale = _ref.locale,
          onPreviousMonth = _ref.onPreviousMonth,
          previousInBound = _ref.previousInBound;
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
          disabled: !previousInBound,
          icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Previous, null),
          onClick: onPreviousMonth
        }), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
          level: 3,
          margin: "none"
        }, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        })), /*#__PURE__*/_react["default"].createElement(_grommetIcons.Blank, null));
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Calendar, {
      animate: false,
      showAdjacentDays: false,
      date: date,
      dates: dates,
      range: true,
      onSelect: onSelect,
      reference: reference2,
      onReference: function onReference(reference) {
        var refDate = new Date(reference);
        var priorDate = new Date(refDate);
        priorDate.setMonth(refDate.getMonth() - 1, 1);
        setReference1(priorDate.toISOString());
      },
      header: function header(_ref2) {
        var currentDate = _ref2.date,
          locale = _ref2.locale,
          onNextMonth = _ref2.onNextMonth,
          nextInBound = _ref2.nextInBound;
        return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
          direction: "row",
          align: "center",
          justify: "between"
        }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Blank, null), /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
          level: 3,
          margin: "none"
        }, currentDate.toLocaleDateString(locale, {
          month: 'long',
          year: 'numeric'
        })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
          disabled: !nextInBound,
          icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Next, null),
          onClick: onNextMonth
        }));
      }
    }))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/Calendar/Dual'
};