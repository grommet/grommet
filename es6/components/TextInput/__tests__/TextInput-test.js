function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from 'react';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react';
import { getByText, screen } from '@testing-library/dom';
import { Search } from "grommet-icons/es6/icons/Search";
import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet } from '../../Grommet';
import { TextInput } from '..';
import { Keyboard } from '../../Keyboard';
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
  test('disabled', function () {
    var _render2 = render(React.createElement(TextInput, {
      disabled: true,
      name: "item"
    })),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('icon', function () {
    var _render3 = render(React.createElement(TextInput, {
      icon: React.createElement(Search, null),
      name: "item"
    })),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('icon reverse', function () {
    var _render4 = render(React.createElement(TextInput, {
      icon: React.createElement(Search, null),
      reverse: true,
      name: "item"
    })),
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('suggestions', function (done) {
    var onChange = jest.fn();
    var onFocus = jest.fn();

    var _render5 = render(React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1'],
      onChange: onChange,
      onFocus: onFocus
    })),
        getByTestId = _render5.getByTestId,
        container = _render5.container;

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
    var _render6 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
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
        getByTestId = _render6.getByTestId,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));
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
    var _render7 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1']
    }))),
        getByTestId = _render7.getByTestId,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));
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
  test('let escape events propagage if there are no suggestions', function (done) {
    var callback = jest.fn();

    var _render8 = render(React.createElement(Grommet, null, React.createElement(Keyboard, {
      onEsc: callback
    }, React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item"
    })))),
        getByTestId = _render8.getByTestId;

    fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });
    setTimeout(function () {
      fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27
      });
      expect(callback).toBeCalled();
      done();
    }, 50);
  });
  test('select suggestion', function (done) {
    var onSelect = jest.fn();

    var _render9 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      plain: true,
      size: "large",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1'],
      onSelect: onSelect
    }))),
        getByTestId = _render9.getByTestId,
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));
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

    var _render10 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', {
        value: 'test1'
      }],
      onSelect: onSelect
    }))),
        getByTestId = _render10.getByTestId,
        container = _render10.container;

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

    var _render11 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      onSelect: onSelect
    }))),
        getByTestId = _render11.getByTestId,
        container = _render11.container;

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
  ['small', 'medium', 'large'].forEach(function (dropHeight) {
    test(dropHeight + " drop height", function (done) {
      var _render12 = render(React.createElement(TextInput, {
        "data-testid": "test-input",
        id: "item",
        name: "item",
        suggestions: ['test', 'test1'],
        dropHeight: dropHeight
      })),
          getByTestId = _render12.getByTestId;

      fireEvent.focus(getByTestId('test-input'));
      setTimeout(function () {
        expectPortal('text-input-drop__item').toMatchSnapshot();
        done();
      }, 50);
    });
  });
  test('should return focus to input on select',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var onSelect, _render13, getByPlaceholderText, input, selection;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onSelect = jest.fn();
            _render13 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
              "data-testid": "test-input-focus",
              id: "input-focus",
              name: "input-focus",
              placeholder: "Type to search...",
              suggestions: ['option0', 'option1', 'option2'],
              onSelect: onSelect
            }))), getByPlaceholderText = _render13.getByPlaceholderText;
            input = getByPlaceholderText('Type to search...');
            expect(document.activeElement).not.toEqual(input);
            fireEvent.focus(input);
            expect(document.activeElement).not.toEqual(input);
            _context.next = 8;
            return waitForElement(function () {
              return screen.getByText('option1');
            });

          case 8:
            selection = _context.sent;
            fireEvent.click(selection);
            expect(document.activeElement).toEqual(input);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('should return focus to ref on select',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var inputRef, onSelect, _render14, getByPlaceholderText, input, selection;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            inputRef = {
              current: {}
            };
            onSelect = jest.fn();
            _render14 = render(React.createElement(Grommet, null, React.createElement(TextInput, {
              "data-testid": "test-input-focus",
              id: "input-focus",
              name: "input-focus",
              placeholder: "Type to search...",
              suggestions: ['option0', 'option1', 'option2'],
              onSelect: onSelect,
              ref: inputRef
            }))), getByPlaceholderText = _render14.getByPlaceholderText;
            input = getByPlaceholderText('Type to search...');
            expect(document.activeElement).not.toEqual(input);
            fireEvent.focus(input);
            expect(document.activeElement).not.toEqual(input);
            _context2.next = 9;
            return waitForElement(function () {
              return screen.getByText('option2');
            });

          case 9:
            selection = _context2.sent;
            fireEvent.click(selection);
            expect(document.activeElement).toEqual(input);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});