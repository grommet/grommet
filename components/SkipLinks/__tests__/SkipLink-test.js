"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SkipLink', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    jest.useFakeTimers();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.SkipLinks, {
      id: "skip-links"
    }, _react.default.createElement(_.SkipLink, {
      id: "main",
      label: "Main Content"
    }), _react.default.createElement(_.SkipLink, {
      id: "footer",
      label: "Footer"
    })), _react.default.createElement("div", null, _react.default.createElement(_.SkipLinkTarget, {
      id: "main"
    }), "Main Content", _react.default.createElement("input", {
      type: "text",
      value: "main content",
      onChange: function onChange() {}
    })), _react.default.createElement("footer", null, _react.default.createElement(_.SkipLinkTarget, {
      id: "footer"
    }), _react.default.createElement("input", {
      type: "text",
      value: "footer",
      onChange: function onChange() {}
    })))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    document.getElementById('skip-links').querySelector('a').focus();
    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(document.activeElement);

    document.getElementById('skip-links').querySelector('a').blur();
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
  });
});