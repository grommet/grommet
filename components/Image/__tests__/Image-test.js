"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

require("jest-axe/extend-expect");

require("regenerator-runtime/runtime");

var _react2 = require("@testing-library/react");

var _jestAxe = require("jest-axe");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var opacityTypes = ['weak', 'medium', 'strong', '0.3', true, false];
var SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII='; // eslint-disable-line max-len

test('image should have no violations', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _render, container, results;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Image, {
            src: SRC,
            a11yTitle: "Alt Text"
          }))), container = _render.container;
          _context.next = 3;
          return (0, _jestAxe.axe)(container);

        case 3:
          results = _context.sent;
          expect(results).toHaveNoViolations();
          (0, _react2.cleanup)();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('Image renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Image, {
    src: SRC
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Image renders with aria-label', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Image, {
    a11yTitle: "aria-label-text",
    src: SRC
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Image fit renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Image, {
    fit: "cover",
    src: SRC
  }), /*#__PURE__*/_react["default"].createElement(_.Image, {
    fit: "contain",
    src: SRC
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
opacityTypes.forEach(function (opacity) {
  test("Image opacity of " + opacity + " renders", function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Image, {
      opacity: opacity,
      src: SRC
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
test('Image fillProp renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Image, {
    fill: true,
    src: SRC
  }), /*#__PURE__*/_react["default"].createElement(_.Image, {
    fill: false,
    src: SRC
  }), /*#__PURE__*/_react["default"].createElement(_.Image, {
    fill: "horizontal",
    src: SRC
  }), /*#__PURE__*/_react["default"].createElement(_.Image, {
    fill: "vertical",
    src: SRC
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});