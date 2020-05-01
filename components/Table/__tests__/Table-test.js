"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('Table renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Table caption renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, {
    caption: "Caption"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableHeader renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableHeader, null))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableFooter renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableFooter, null))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableBody renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableBody, null))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableRow renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableBody, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null)))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableHeader, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, null))), /*#__PURE__*/_react["default"].createElement(_.TableBody, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, null))), /*#__PURE__*/_react["default"].createElement(_.TableFooter, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, null))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell scope renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableHeader, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    scope: "col"
  }))), /*#__PURE__*/_react["default"].createElement(_.TableBody, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    scope: "row"
  }))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell size renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableBody, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "xsmall"
  }), /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "large"
  })))), /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableBody, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "1/2"
  }), /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "2/4"
  })))), /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableBody, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "1/3"
  }), /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "2/3"
  })))), /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableBody, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "1/4"
  }), /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    size: "3/4"
  }))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell verticalAlign renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableHeader, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    verticalAlign: "top"
  }), /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    verticalAlign: "middle"
  }), /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    verticalAlign: "bottom"
  }))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('TableCell plain renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Table, null, /*#__PURE__*/_react["default"].createElement(_.TableHeader, null, /*#__PURE__*/_react["default"].createElement(_.TableRow, null, /*#__PURE__*/_react["default"].createElement(_.TableCell, {
    plain: true
  }))))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});