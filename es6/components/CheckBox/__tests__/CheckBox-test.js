import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { CheckBox } from '..';
describe('CheckBox', function () {
  afterEach(cleanup);
  test('renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, null), React.createElement(CheckBox, {
      id: "test id",
      name: "test name"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('label renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
      label: "test label"
    }), React.createElement(CheckBox, {
      label: React.createElement("div", null, "test label")
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('checked renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
      checked: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
      disabled: true
    }), React.createElement(CheckBox, {
      disabled: true,
      checked: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reverse renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
      reverse: true,
      label: "test label"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('toggle renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
      toggle: true
    }), React.createElement(CheckBox, {
      toggle: true,
      checked: true
    }), React.createElement(CheckBox, {
      toggle: true,
      label: "test label"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('indeterminate renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
      indeterminate: true
    }), React.createElement(CheckBox, {
      indeterminate: true,
      label: "test label"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('indeterminate checked warns', function () {
    var spy = jest.spyOn(global.console, 'warn');
    renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
      indeterminate: true,
      checked: true
    })));
    expect(spy).toBeCalledWith('Checkbox cannot be "checked" and "indeterminate" at the same time.');
  });
  test('indeterminate toggle warns', function () {
    var spy = jest.spyOn(global.console, 'warn');
    renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
      indeterminate: true,
      toggle: true
    })));
    expect(spy).toBeCalledWith('Checkbox of type toggle does not have "indeterminate" state.');
  });
  test('controlled', function () {
    var _render = render(React.createElement(Grommet, null, React.createElement(CheckBox, {
      label: "test-label",
      checked: true
    }))),
        container = _render.container,
        getByText = _render.getByText;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('test-label'));
    expect(container.firstChild).toMatchSnapshot();
  });
});