"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _Grommet = require("../../Grommet");

var _ = require("..");

var _Image = require("../../Image");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Carousel', function () {
  afterEach(_react2.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Carousel, null, /*#__PURE__*/_react["default"].createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/_react["default"].createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('basic with `initialChild: 1`', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Carousel, {
      initialChild: 1
    }, /*#__PURE__*/_react["default"].createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/_react["default"].createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('navigate', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Carousel, {
      "data-testid": "test-carousel"
    }, /*#__PURE__*/_react["default"].createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/_react["default"].createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    })))),
        getByTestId = _render.getByTestId,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.keyDown(getByTestId('test-carousel'), {
      key: 'Right',
      keyCode: 39,
      which: 39
    });

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.keyDown(getByTestId('test-carousel'), {
      key: 'Left',
      keyCode: 37,
      which: 37
    });

    expect(container.firstChild).toMatchSnapshot();
  });
  test('play', function (done) {
    var _render2 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Carousel, {
      play: 1000
    }, /*#__PURE__*/_react["default"].createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/_react["default"].createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    })))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot(); // give some time for the carousel to advance

    setTimeout(function () {
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 1300);
  });
});