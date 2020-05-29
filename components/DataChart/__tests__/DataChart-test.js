"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [{
  a: 1,
  b: 'one'
}, {
  a: 2,
  b: 'two'
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
    }].map(function (size) {
      return /*#__PURE__*/_react["default"].createElement(_.DataChart, {
        data: data,
        chart: {
          key: 'a'
        },
        size: size
      });
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
      render: function render(i) {
        return data[i].b;
      }
    }].map(function (xAxis) {
      return /*#__PURE__*/_react["default"].createElement(_.DataChart, {
        data: data,
        chart: {
          key: 'a'
        },
        xAxis: xAxis
      });
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
      render: function render(v) {
        return v;
      }
    }].map(function (yAxis) {
      return /*#__PURE__*/_react["default"].createElement(_.DataChart, {
        data: data,
        chart: {
          key: 'a'
        },
        yAxis: yAxis
      });
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});