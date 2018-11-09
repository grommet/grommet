"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _reactTestingLibrary = require("react-testing-library");

var _portal = require("../../../utils/portal");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DropButton', function () {
  beforeEach(_portal.createPortal);
  afterEach(_reactTestingLibrary.cleanup);
  test('closed', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.DropButton, {
      label: "Dropper",
      dropContent: _react.default.createElement("div", {
        id: "drop-contents"
      }, "drop contents")
    }));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('opened', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.DropButton, {
      label: "Dropper",
      open: true,
      dropContent: _react.default.createElement("div", {
        id: "drop-contents"
      }, "drop contents")
    }));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('open and close', function () {
    window.scrollTo = jest.fn();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.DropButton, {
      label: "Dropper",
      dropContent: _react.default.createElement("div", {
        id: "drop-contents"
      }, "Drop Contents")
    })),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('drop-contents')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByText('Dropper'));

    (0, _portal.expectPortal)('drop-contents').toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Dropper'));

    expect(document.getElementById('drop-contents')).toBeNull();
    expect(window.scrollTo).toBeCalled();
  });
  test('close by clicking outside', function (done) {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.DropButton, {
      label: "Dropper",
      dropContent: _react.default.createElement("div", {
        id: "drop-contents"
      }, "Drop Contents")
    })),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('drop-contents')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByText('Dropper'));

    (0, _portal.expectPortal)('drop-contents').toMatchSnapshot();
    (0, _reactTestingLibrary.fireEvent)(document, new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    }));
    setTimeout(function () {
      expect(document.getElementById('drop-contents')).toBeNull();
      done();
    }, 50);
  });
  test('disabled', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.DropButton, {
      disabled: true,
      label: "Dropper",
      dropContent: _react.default.createElement("div", {
        id: "drop-contents"
      }, "Drop Contents")
    })),
        getByText = _render3.getByText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('drop-contents')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByText('Dropper'));

    expect(document.getElementById('drop-contents')).toBeNull();
  });
  test('opened ref', function () {
    var ref = _react.default.createRef();

    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.DropButton, {
      ref: ref,
      open: true,
      label: "Dropper",
      dropContent: _react.default.createElement("div", {
        id: "drop-contents"
      }, "Drop Contents")
    })),
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
    (0, _portal.expectPortal)('drop-contents').toMatchSnapshot();
  });
});