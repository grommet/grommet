"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('InfiniteScroll', function () {
  var items = [];

  while (items.length < 4) {
    items.push(items.length);
  }

  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.InfiniteScroll, null), _react.default.createElement(_.InfiniteScroll, {
      items: items
    }, function (item, index) {
      return _react.default.createElement("div", {
        key: index
      }, item);
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('step', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.InfiniteScroll, {
      items: items,
      step: 2
    }, function (item, index) {
      return _react.default.createElement("div", {
        key: index
      }, item);
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('show', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.InfiniteScroll, {
      items: items,
      step: 2,
      show: 3
    }, function (item, index) {
      return _react.default.createElement("div", {
        key: index
      }, item);
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renderMarker', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.InfiniteScroll, {
      items: items,
      step: 2,
      renderMarker: function renderMarker(m) {
        return _react.default.createElement("div", null, m);
      }
    }, function (item, index) {
      return _react.default.createElement("div", {
        key: index
      }, item);
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});