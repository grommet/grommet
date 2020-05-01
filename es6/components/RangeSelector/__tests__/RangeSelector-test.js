import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { RangeSelector } from '..';
describe('RangeSelector', function () {
  afterEach(cleanup);
  test('basic', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      color: "accent-1",
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('direction', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      direction: "horizontal",
      values: [20, 30]
    }), /*#__PURE__*/React.createElement(RangeSelector, {
      direction: "vertical",
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('invert', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      invert: true,
      values: [20, 30]
    }), /*#__PURE__*/React.createElement(RangeSelector, {
      invert: false,
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('max', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      max: 50,
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('min', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      min: 10,
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('opacity', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['weak', 'medium', 'strong'].map(function (opacity) {
      return /*#__PURE__*/React.createElement(RangeSelector, {
        key: opacity,
        opacity: opacity,
        values: [20, 30]
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['xsmall', 'small', 'medium', 'large', 'full'].map(function (round) {
      return /*#__PURE__*/React.createElement(RangeSelector, {
        key: round,
        round: round,
        values: [20, 30]
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(function (size) {
      return /*#__PURE__*/React.createElement(RangeSelector, {
        key: size,
        size: size,
        values: [20, 30]
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('step renders correct values', function () {
    var values;

    var setValues = function setValues(newValues) {
      values = newValues;
    };

    var onChange = jest.fn(function (nextValues) {
      return setValues(nextValues);
    });

    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      values: [0, 100],
      step: 3,
      onChange: onChange
    }))),
        container = _render.container,
        getByLabelText = _render.getByLabelText;

    expect(container.firstChild).toMatchSnapshot();
    var lowerControl = getByLabelText('Lower Bounds');
    fireEvent.mouseDown(lowerControl); // fireEvent.mouseDown(lowerControl);

    fireEvent.mouseMove(document, {
      clientX: 31,
      clientY: 20
    });
    fireEvent.mouseUp(document);
    expect(onChange).toBeCalled();
    expect(values).toStrictEqual([33, 100]);
    var upperControl = getByLabelText('Upper Bounds');
    fireEvent.mouseDown(upperControl);
    fireEvent.mouseMove(document, {
      clientX: 80,
      clientY: 15
    });
    fireEvent.mouseUp(document);
    expect(onChange).toBeCalled();
    expect(values).toStrictEqual([0, 81]);
  });
  test('handle keyboard', function () {
    var onChange = jest.fn();

    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      values: [20, 30],
      onChange: onChange
    }))),
        container = _render2.container,
        getByLabelText = _render2.getByLabelText;

    expect(container.firstChild).toMatchSnapshot();
    var lowerControl = getByLabelText('Lower Bounds');
    fireEvent.keyDown(lowerControl, {
      key: 'Left',
      keyCode: 37
    });
    expect(onChange).toBeCalled();
    fireEvent.keyDown(lowerControl, {
      key: 'Right',
      keyCode: 39
    });
    expect(onChange).toBeCalled();
    var upperControl = getByLabelText('Upper Bounds');
    fireEvent.keyDown(upperControl, {
      key: 'Right',
      keyCode: 39
    });
    expect(onChange).toBeCalled();
    fireEvent.keyDown(upperControl, {
      key: 'Left',
      keyCode: 37
    });
    expect(onChange).toBeCalled();
  });
  test('handle mouse', function () {
    var onChange = jest.fn();

    var _render3 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeSelector, {
      values: [20, 30],
      onChange: onChange
    }))),
        container = _render3.container,
        getByLabelText = _render3.getByLabelText;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.firstChild.firstChild, {
      clientX: 0,
      clientY: 0
    });
    expect(onChange).toBeCalled();
    var lowerControl = getByLabelText('Lower Bounds');
    fireEvent.mouseDown(lowerControl);
    fireEvent.mouseMove(document, {
      clientX: 0,
      clientY: 0
    });
    fireEvent.mouseUp(document);
    expect(onChange).toBeCalled();
    var upperControl = getByLabelText('Upper Bounds');
    fireEvent.mouseDown(upperControl);
    fireEvent.mouseMove(document, {
      clientX: 0,
      clientY: 0
    });
    fireEvent.mouseUp(document);
    expect(onChange).toBeCalled();
  });
});