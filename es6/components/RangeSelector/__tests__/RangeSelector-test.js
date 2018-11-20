import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Grommet } from '../../Grommet';
import { RangeSelector } from '..';
describe('RangeSelector', function () {
  afterEach(cleanup);
  test('basic', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      color: "accent-1",
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('direction', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      direction: "horizontal",
      values: [20, 30]
    }), React.createElement(RangeSelector, {
      direction: "vertical",
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('invert', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      invert: true,
      values: [20, 30]
    }), React.createElement(RangeSelector, {
      invert: false,
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('max', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      max: 50,
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('min', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      min: 10,
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('opacity', function () {
    var component = renderer.create(React.createElement(Grommet, null, ['weak', 'medium', 'strong'].map(function (opacity) {
      return React.createElement(RangeSelector, {
        key: opacity,
        opacity: opacity,
        values: [20, 30]
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round', function () {
    var component = renderer.create(React.createElement(Grommet, null, ['xsmall', 'small', 'medium', 'large', 'full'].map(function (round) {
      return React.createElement(RangeSelector, {
        key: round,
        round: round,
        values: [20, 30]
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = renderer.create(React.createElement(Grommet, null, ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(function (size) {
      return React.createElement(RangeSelector, {
        key: size,
        size: size,
        values: [20, 30]
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('step', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      step: 10,
      values: [20, 30]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('handle keyboard', function () {
    var onChange = jest.fn();

    var _render = render(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      values: [20, 30],
      onChange: onChange
    }))),
        container = _render.container,
        getByLabelText = _render.getByLabelText;

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

    var _render2 = render(React.createElement(Grommet, null, React.createElement(RangeSelector, {
      values: [20, 30],
      onChange: onChange
    }))),
        container = _render2.container,
        getByLabelText = _render2.getByLabelText;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(container.firstChild.firstChild, {
      clientX: 0,
      clientY: 0
    });
    expect(onChange).toBeCalled();
    var map = {};
    window.addEventListener = jest.fn(function (event, cb) {
      map[event] = cb;
    });
    var lowerControl = getByLabelText('Lower Bounds');
    fireEvent.mouseDown(lowerControl);
    map.mousemove({
      clientX: 0,
      clientY: 0
    });
    expect(onChange).toBeCalled();
    map.mouseup();
    var upperControl = getByLabelText('Upper Bounds');
    fireEvent.mouseDown(upperControl);
    map.mousemove({
      clientX: 0,
      clientY: 0
    });
    expect(onChange).toBeCalled();
    map.mouseup();
  });
});