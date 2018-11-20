"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _reactTestingLibrary = require("react-testing-library");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tabs', function () {
  test('no Tab', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Tabs, null)));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('Tab', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Tabs, null, _react.default.createElement(_.Tab, {
      title: "Tab 1"
    }, "Tab body 1"), undefined, _react.default.createElement(_.Tab, {
      title: "Tab 2"
    }, "Tab body 2"))));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('complex title', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Tabs, null, _react.default.createElement(_.Tab, {
      title: _react.default.createElement("div", null, "Tab 1")
    }, "Tab body 1"), undefined, _react.default.createElement(_.Tab, {
      title: _react.default.createElement("div", null, "Tab 2")
    }, "Tab body 2"))));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('change to second tab', function () {
    var onActive = jest.fn();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Tabs, {
      onActive: onActive
    }, _react.default.createElement(_.Tab, {
      title: "Tab 1"
    }, "Tab body 1"), _react.default.createElement(_.Tab, {
      title: "Tab 2"
    }, "Tab body 2")))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Tab 2'));

    expect(onActive).toBeCalledWith(1);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('set on hover', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Tabs, null, _react.default.createElement(_.Tab, {
      title: "Tab 1",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {}
    }, "Tab body 1"), _react.default.createElement(_.Tab, {
      title: "Tab 2"
    }, "Tab body 2")))),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.mouseOver(getByText('Tab 1'));

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.mouseOver(getByText('Tab 2'));

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.mouseOut(getByText('Tab 1'));

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.mouseOut(getByText('Tab 2'));

    expect(container.firstChild).toMatchSnapshot();
  });
});