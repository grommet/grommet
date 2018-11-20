import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { getByText } from 'dom-testing-library';
import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet } from '../../Grommet';
import { TextInput } from '..';
describe('TextInput', function () {
  beforeEach(createPortal);
  afterEach(cleanup);
  test('basic', function () {
    var _render = render(React.createElement(TextInput, {
      name: "item"
    })),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('suggestions', function (done) {
    var onChange = jest.fn();
    var onFocus = jest.fn();

    var _render2 = render(React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1'],
      onChange: onChange,
      onFocus: onFocus
    })),
        getByTestId = _render2.getByTestId,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });
    setTimeout(function () {
      expectPortal('text-input-drop__item').toMatchSnapshot();
      expect(onChange).toBeCalled();
      expect(onFocus).toBeCalled();
      fireEvent(document, new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      }));
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });
  test('complex suggestions', function (done) {
    var _render3 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: [{
        label: 'test',
        value: 'test'
      }, {
        value: 'test1'
      }]
    }))),
        getByTestId = _render3.getByTestId,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });
    setTimeout(function () {
      expectPortal('text-input-drop__item').toMatchSnapshot();
      fireEvent(document, new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      }));
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });
  test('close suggestion drop', function (done) {
    var _render4 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1']
    }))),
        getByTestId = _render4.getByTestId,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });
    setTimeout(function () {
      expectPortal('text-input-drop__item').toMatchSnapshot();
      fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27
      });
      setTimeout(function () {
        expect(document.getElementById('text-input-drop__item')).toBeNull();
        expect(container.firstChild).toMatchSnapshot();
        done();
      }, 50);
    }, 50);
  });
  test('select suggestion', function (done) {
    var onSelect = jest.fn();

    var _render5 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      plain: true,
      size: "large",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1'],
      onSelect: onSelect
    }))),
        getByTestId = _render5.getByTestId,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });
    setTimeout(function () {
      expectPortal('text-input-drop__item').toMatchSnapshot();
      fireEvent.click(getByText(document, 'test1'));
      expect(container.firstChild).toMatchSnapshot();
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      expect(onSelect).toBeCalledWith(expect.objectContaining({
        suggestion: 'test1'
      }));
      done();
    }, 50);
  });
  test('select a suggestion', function () {
    var onSelect = jest.fn();

    var _render6 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', {
        value: 'test1'
      }],
      onSelect: onSelect
    }))),
        getByTestId = _render6.getByTestId,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input'); // pressing enter here nothing will happen

    fireEvent.keyDown(input, {
      keyCode: 13
    }); // enter

    fireEvent.keyDown(input, {
      keyCode: 40
    }); // down

    fireEvent.keyDown(input, {
      keyCode: 40
    }); // down

    fireEvent.keyDown(input, {
      keyCode: 38
    }); // up

    fireEvent.keyDown(input, {
      keyCode: 13
    }); // enter

    expect(onSelect).toBeCalledWith(expect.objectContaining({
      suggestion: 'test'
    }));
  });
  test('handles next and previous without suggestion', function () {
    var onSelect = jest.fn();

    var _render7 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      onSelect: onSelect
    }))),
        getByTestId = _render7.getByTestId,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');
    fireEvent.keyDown(input, {
      keyCode: 40
    });
    fireEvent.keyDown(input, {
      keyCode: 40
    });
    fireEvent.keyDown(input, {
      keyCode: 38
    });
    fireEvent.keyDown(input, {
      keyCode: 13
    }); // enter

    expect(onSelect).not.toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});