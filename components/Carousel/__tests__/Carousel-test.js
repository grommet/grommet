"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _Grommet = require("../../Grommet");

var _ = require("..");

var _Image = require("../../Image");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Carousel', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Carousel, null, _react.default.createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), _react.default.createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('navigate', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Carousel, {
      "data-testid": "test-carousel"
    }, _react.default.createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), _react.default.createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    })))),
        getByTestId = _render.getByTestId,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.keyDown(getByTestId('test-carousel'), {
      key: 'Right',
      keyCode: 39,
      which: 39
    });

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.keyDown(getByTestId('test-carousel'), {
      key: 'Left',
      keyCode: 37,
      which: 37
    });

    expect(container.firstChild).toMatchSnapshot();
  });
  test('play', function (done) {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Carousel, {
      play: 1000
    }, _react.default.createElement(_Image.Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), _react.default.createElement(_Image.Image, {
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