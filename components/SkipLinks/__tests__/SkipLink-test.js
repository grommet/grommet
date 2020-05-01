"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('SkipLink', function () {
  afterEach(_react2.cleanup);
  test('basic', function () {
    jest.useFakeTimers();

    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.SkipLinks, {
      id: "skip-links"
    }, /*#__PURE__*/_react["default"].createElement(_.SkipLink, {
      id: "main",
      label: "Main Content"
    }), /*#__PURE__*/_react["default"].createElement(_.SkipLink, {
      id: "footer",
      label: "Footer"
    })), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_.SkipLinkTarget, {
      id: "main"
    }), "Main Content", /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: "main content",
      onChange: function onChange() {}
    })), /*#__PURE__*/_react["default"].createElement("footer", null, /*#__PURE__*/_react["default"].createElement(_.SkipLinkTarget, {
      id: "footer"
    }), /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      value: "footer",
      onChange: function onChange() {}
    })))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    document.getElementById('skip-links').querySelector('a').focus();
    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(document.activeElement);

    document.getElementById('skip-links').querySelector('a').blur();
    (0, _react2.act)(function () {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});