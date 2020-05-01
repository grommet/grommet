"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('InfiniteScroll', function () {
  var items = [];

  while (items.length < 4) {
    items.push(items.length);
  }

  test('basic', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.InfiniteScroll, null), /*#__PURE__*/_react["default"].createElement(_.InfiniteScroll, {
      items: items
    }, function (item, index, ref) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: ref,
        key: index
      }, item);
    }), /*#__PURE__*/_react["default"].createElement(_.InfiniteScroll, {
      items: items
    }, function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index
      }, item);
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('step', function () {
    var _render2 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.InfiniteScroll, {
      items: items,
      step: 2
    }, function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index
      }, item);
    }))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('show', function () {
    var _render3 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.InfiniteScroll, {
      items: items,
      step: 2,
      show: 3
    }, function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index
      }, item);
    }))),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('renderMarker', function () {
    var _render4 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.InfiniteScroll, {
      items: items,
      step: 2,
      renderMarker: function renderMarker(m) {
        return /*#__PURE__*/_react["default"].createElement("div", null, m);
      }
    }, function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index
      }, item);
    }))),
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('replace', function () {
    var _render5 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.InfiniteScroll, {
      items: items,
      step: 2,
      replace: true
    }, function (item, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: index
      }, item);
    }))),
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
  });
});