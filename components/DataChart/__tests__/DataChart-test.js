"use strict";

var _react = _interopRequireWildcard(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var data = [{
  a: 1,
  b: 'one',
  c: 111111
}, {
  a: 2,
  b: 'two',
  c: 222222
}];
describe('DataChart', function () {
  test('default', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.DataChart, {
      data: data,
      chart: {
        key: 'a'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('thickness', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, ['xsmall', 'small', 'medium', 'large', 'xlarge'].map(function (thickness) {
      return /*#__PURE__*/_react["default"].createElement(_.DataChart, {
        key: thickness,
        data: data,
        chart: {
          key: 'a'
        },
        thickness: thickness
      });
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, ['small', 'medium', 'large'].map(function (gap) {
      return /*#__PURE__*/_react["default"].createElement(_.DataChart, {
        key: gap,
        data: data,
        chart: {
          key: 'a'
        },
        gap: gap
      });
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, ['small', 'medium', 'large'].map(function (pad) {
      return /*#__PURE__*/_react["default"].createElement(_.DataChart, {
        key: pad,
        data: data,
        chart: {
          key: 'a'
        },
        pad: pad
      });
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, ['xsmall', 'small', 'medium', 'large', 'xlarge', {
      width: 'fill'
    }, {
      width: 'auto'
    }].map(function (size, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_.DataChart, {
          key: i,
          data: data,
          chart: {
            key: 'a'
          },
          size: size
        })
      );
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('xAxis', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, [true, false, {
      guide: true
    }, {
      key: 'b'
    }, {
      labels: 2
    }, {
      key: 'b',
      render: function render(b) {
        return b;
      }
    }].map(function (xAxis, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_.DataChart, {
          key: i,
          data: data,
          chart: {
            key: 'a'
          },
          xAxis: xAxis
        })
      );
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('xAxis dates', function () {
    var dateData = [];

    for (var i = 0; i < 4; i += 1) {
      var digits = (i % 12 + 1).toString().padStart(2, 0);
      dateData.push({
        second: "2020-05-15T08:04:" + digits,
        minute: "2020-05-15T08:" + digits + ":00",
        hour: "2020-05-15T" + digits + ":00:00",
        day: "2020-05-" + digits + "T08:00:00",
        month: "2020-" + digits + "-15",
        year: "20" + digits + "-01-15",
        percent: Math.abs(i * 10),
        amount: i * 111111
      });
    }

    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, ['second', 'minute', 'hour', 'day', 'month', 'year'].map(function (key) {
      return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
        key: key
      }, /*#__PURE__*/_react["default"].createElement(_.DataChart, {
        data: dateData,
        chart: {
          key: 'amount'
        },
        xAxis: {
          key: key,
          labels: 2
        }
      }), /*#__PURE__*/_react["default"].createElement(_.DataChart, {
        data: dateData,
        chart: {
          key: 'percent'
        },
        xAxis: {
          key: key
        }
      }));
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('yAxis', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, [true, false, {
      guide: true
    }, {
      labels: 2
    }, {
      labels: 5
    }, {
      render: function render(v) {
        return v;
      }
    }, {
      prefix: '$'
    }, {
      suffix: '%'
    }].map(function (yAxis, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_.DataChart, {
          key: i,
          data: data,
          chart: {
            key: 'a'
          },
          yAxis: yAxis
        })
      );
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('yAxis rounding', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, [true, {
      labels: 4
    }].map(function (yAxis, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_.DataChart, {
          key: i,
          data: data,
          chart: {
            key: 'c'
          },
          yAxis: yAxis
        })
      );
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});