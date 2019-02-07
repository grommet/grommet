import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { getByText } from 'dom-testing-library';
import { createPortal, expectPortal } from '../../../utils/portal';
import { MaskedInput } from '..';
describe('MaskedInput', function () {
  beforeEach(createPortal);
  afterEach(cleanup);
  test('basic', function () {
    var _render = render(React.createElement(MaskedInput, {
      name: "item"
    })),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('mask', function (done) {
    var onChange = jest.fn();
    var onFocus = jest.fn();

    var _render2 = render(React.createElement(MaskedInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }, {
        length: 1,
        regexp: /^[ab]$/
      }],
      value: "bb!ax",
      onChange: onChange,
      onFocus: onFocus
    })),
        getByTestId = _render2.getByTestId,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));
    setTimeout(function () {
      expectPortal('masked-input-drop__item').toMatchSnapshot();
      expect(onChange).not.toBeCalled();
      expect(onFocus).toBeCalled();
      done();
    }, 300);
  });
  test('option via mouse', function (done) {
    var onChange = jest.fn();

    var _render3 = render(React.createElement(MaskedInput, {
      "data-testid": "test-input",
      plain: true,
      size: "large",
      id: "item",
      name: "item",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChange
    })),
        getByTestId = _render3.getByTestId,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));
    setTimeout(function () {
      expectPortal('masked-input-drop__item').toMatchSnapshot();
      fireEvent.click(getByText(document, 'aa'));
      expect(container.firstChild).toMatchSnapshot();
      expect(onChange).toBeCalledWith(expect.objectContaining({
        target: {
          value: 'aa!'
        }
      }));
      done();
    }, 500);
  });
  test('option via keyboard', function (done) {
    var onChange = jest.fn();

    var _render4 = render(React.createElement(MaskedInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChange
    })),
        getByTestId = _render4.getByTestId,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');
    fireEvent.focus(input);
    setTimeout(function () {
      // pressing enter here nothing will happen
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

      expect(onChange).toBeCalledWith(expect.objectContaining({
        target: {
          value: 'aa!'
        }
      }));
      done();
    }, 300);
  });
  test('next and previous without options', function (done) {
    var onChange = jest.fn();

    var _render5 = render(React.createElement(MaskedInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      value: "",
      mask: [{
        length: [1, 2],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      onChange: onChange
    })),
        getByTestId = _render5.getByTestId,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');
    fireEvent.focus(input);
    setTimeout(function () {
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

      expect(onChange).not.toBeCalled();
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 300);
  });
});