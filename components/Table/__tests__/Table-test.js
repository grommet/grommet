"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Table renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Table caption renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, {
    caption: "Caption"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableHeader renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableHeader, null))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableFooter renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableFooter, null))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableBody renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableBody, null))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableRow renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableBody, null, _react.default.createElement(_.TableRow, null)))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableHeader, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, null))), _react.default.createElement(_.TableBody, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, null))), _react.default.createElement(_.TableFooter, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, null))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell scope renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableHeader, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, {
    scope: "col"
  }))), _react.default.createElement(_.TableBody, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, {
    scope: "row"
  }))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell size renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableBody, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, {
    size: "xsmall"
  }), _react.default.createElement(_.TableCell, {
    size: "small"
  }), _react.default.createElement(_.TableCell, {
    size: "medium"
  }), _react.default.createElement(_.TableCell, {
    size: "large"
  })))), _react.default.createElement(_.Table, null, _react.default.createElement(_.TableBody, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, {
    size: "1/2"
  }), _react.default.createElement(_.TableCell, {
    size: "2/4"
  })))), _react.default.createElement(_.Table, null, _react.default.createElement(_.TableBody, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, {
    size: "1/3"
  }), _react.default.createElement(_.TableCell, {
    size: "2/3"
  })))), _react.default.createElement(_.Table, null, _react.default.createElement(_.TableBody, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, {
    size: "1/4"
  }), _react.default.createElement(_.TableCell, {
    size: "3/4"
  }))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell verticalAlign renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableHeader, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, {
    verticalAlign: "top"
  }), _react.default.createElement(_.TableCell, {
    verticalAlign: "middle"
  }), _react.default.createElement(_.TableCell, {
    verticalAlign: "bottom"
  }))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell plain renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Table, null, _react.default.createElement(_.TableHeader, null, _react.default.createElement(_.TableRow, null, _react.default.createElement(_.TableCell, {
    plain: true
  }))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});