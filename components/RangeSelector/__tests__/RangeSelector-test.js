"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('RangeSelector', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      values: [20, 30]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      color: "accent-1",
      values: [20, 30]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('direction', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      direction: "horizontal",
      values: [20, 30]
    }), _react.default.createElement(_.RangeSelector, {
      direction: "vertical",
      values: [20, 30]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('invert', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      invert: true,
      values: [20, 30]
    }), _react.default.createElement(_.RangeSelector, {
      invert: false,
      values: [20, 30]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('max', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      max: 50,
      values: [20, 30]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('min', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      min: 10,
      values: [20, 30]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('opacity', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, ['weak', 'medium', 'strong'].map(function (opacity) {
      return _react.default.createElement(_.RangeSelector, {
        key: opacity,
        opacity: opacity,
        values: [20, 30]
      });
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, ['xsmall', 'small', 'medium', 'large', 'full'].map(function (round) {
      return _react.default.createElement(_.RangeSelector, {
        key: round,
        round: round,
        values: [20, 30]
      });
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(function (size) {
      return _react.default.createElement(_.RangeSelector, {
        key: size,
        size: size,
        values: [20, 30]
      });
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('step', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      step: 10,
      values: [20, 30]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('handle keyboard', function () {
    var onChange = jest.fn();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      values: [20, 30],
      onChange: onChange
    }))),
        container = _render.container,
        getByLabelText = _render.getByLabelText;

    expect(container.firstChild).toMatchSnapshot();
    var lowerControl = getByLabelText('Lower Bounds');

    _reactTestingLibrary.fireEvent.keyDown(lowerControl, {
      key: 'Left',
      keyCode: 37
    });

    expect(onChange).toBeCalled();

    _reactTestingLibrary.fireEvent.keyDown(lowerControl, {
      key: 'Right',
      keyCode: 39
    });

    expect(onChange).toBeCalled();
    var upperControl = getByLabelText('Upper Bounds');

    _reactTestingLibrary.fireEvent.keyDown(upperControl, {
      key: 'Right',
      keyCode: 39
    });

    expect(onChange).toBeCalled();

    _reactTestingLibrary.fireEvent.keyDown(upperControl, {
      key: 'Left',
      keyCode: 37
    });

    expect(onChange).toBeCalled();
  });
  test('handle mouse', function () {
    var onChange = jest.fn();

    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeSelector, {
      values: [20, 30],
      onChange: onChange
    }))),
        container = _render2.container,
        getByLabelText = _render2.getByLabelText;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(container.firstChild.firstChild, {
      clientX: 0,
      clientY: 0
    });

    expect(onChange).toBeCalled();
    var map = {};
    window.addEventListener = jest.fn(function (event, cb) {
      map[event] = cb;
    });
    var lowerControl = getByLabelText('Lower Bounds');

    _reactTestingLibrary.fireEvent.mouseDown(lowerControl);

    map.mousemove({
      clientX: 0,
      clientY: 0
    });
    expect(onChange).toBeCalled();
    map.mouseup();
    var upperControl = getByLabelText('Upper Bounds');

    _reactTestingLibrary.fireEvent.mouseDown(upperControl);

    map.mousemove({
      clientX: 0,
      clientY: 0
    });
    expect(onChange).toBeCalled();
    map.mouseup();
  });
});