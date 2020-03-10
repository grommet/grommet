"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

require("regenerator-runtime/runtime");

var _react2 = require("@testing-library/react");

var _dom = require("@testing-library/dom");

var _grommetIcons = require("grommet-icons");

var _portal = require("../../../utils/portal");

var _Grommet = require("../../Grommet");

var _ = require("..");

var _Keyboard = require("../../Keyboard");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('TextInput', function () {
  beforeEach(_portal.createPortal);
  afterEach(_react2.cleanup);
  test('basic', function () {
    var _render = (0, _react2.render)(_react["default"].createElement(_.TextInput, {
      name: "item"
    })),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('disabled', function () {
    var _render2 = (0, _react2.render)(_react["default"].createElement(_.TextInput, {
      disabled: true,
      name: "item"
    })),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('icon', function () {
    var _render3 = (0, _react2.render)(_react["default"].createElement(_.TextInput, {
      icon: _react["default"].createElement(_grommetIcons.Search, null),
      name: "item"
    })),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('icon reverse', function () {
    var _render4 = (0, _react2.render)(_react["default"].createElement(_.TextInput, {
      icon: _react["default"].createElement(_grommetIcons.Search, null),
      reverse: true,
      name: "item"
    })),
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('suggestions', function (done) {
    var onChange = jest.fn();
    var onFocus = jest.fn();

    var _render5 = (0, _react2.render)(_react["default"].createElement(_.TextInput, {
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

    _react2.fireEvent.focus(getByTestId('test-input'));

    _react2.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();
      expect(onChange).toBeCalled();
      expect(onFocus).toBeCalled();
      (0, _react2.fireEvent)(document, new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      }));
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });
  test('complex suggestions', function (done) {
    var _render6 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
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

    _react2.fireEvent.focus(getByTestId('test-input'));

    _react2.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();
      (0, _react2.fireEvent)(document, new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      }));
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });
  test('close suggestion drop', function (done) {
    var _render7 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1']
    }))),
        getByTestId = _render7.getByTestId,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.focus(getByTestId('test-input'));

    _react2.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();

      _react2.fireEvent.keyDown(getByTestId('test-input'), {
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

    var _render8 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_Keyboard.Keyboard, {
      onEsc: callback
    }, _react["default"].createElement(_.TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item"
    })))),
        getByTestId = _render8.getByTestId;

    _react2.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      _react2.fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27
      });

      expect(callback).toBeCalled();
      done();
    }, 50);
  });
  test('calls onSuggestionsOpen', function (done) {
    var onSuggestionsOpen = jest.fn();

    var _render9 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1'],
      onSuggestionsOpen: onSuggestionsOpen
    }))),
        getByTestId = _render9.getByTestId;

    _react2.fireEvent.focus(getByTestId('test-input'));

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();
      expect(onSuggestionsOpen).toBeCalled();
      done();
    }, 50);
  });
  test('calls onSuggestionsClose', function (done) {
    var onSuggestionsClose = jest.fn();

    var _render10 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1'],
      onSuggestionsClose: onSuggestionsClose
    }))),
        getByTestId = _render10.getByTestId,
        container = _render10.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.focus(getByTestId('test-input'));

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();

      _react2.fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27
      });

      setTimeout(function () {
        expect(document.getElementById('text-input-drop__item')).toBeNull();
        expect(onSuggestionsClose).toBeCalled();
        expect(container.firstChild).toMatchSnapshot();
        done();
      }, 50);
    }, 50);
  });
  test('select suggestion', function (done) {
    var onSelect = jest.fn();

    var _render11 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
      "data-testid": "test-input",
      plain: true,
      size: "large",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1'],
      onSelect: onSelect
    }))),
        getByTestId = _render11.getByTestId,
        container = _render11.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.focus(getByTestId('test-input'));

    _react2.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();

      _react2.fireEvent.click((0, _dom.getByText)(document, 'test1'));

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

    var _render12 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', {
        value: 'test1'
      }],
      onSelect: onSelect
    }))),
        getByTestId = _render12.getByTestId,
        container = _render12.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input'); // pressing enter here nothing will happen

    _react2.fireEvent.keyDown(input, {
      keyCode: 13
    }); // enter


    _react2.fireEvent.keyDown(input, {
      keyCode: 40
    }); // down


    _react2.fireEvent.keyDown(input, {
      keyCode: 40
    }); // down


    _react2.fireEvent.keyDown(input, {
      keyCode: 38
    }); // up


    _react2.fireEvent.keyDown(input, {
      keyCode: 13
    }); // enter


    expect(onSelect).toBeCalledWith(expect.objectContaining({
      suggestion: 'test'
    }));
  });
  test('handles next and previous without suggestion', function () {
    var onSelect = jest.fn();

    var _render13 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      onSelect: onSelect
    }))),
        getByTestId = _render13.getByTestId,
        container = _render13.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');

    _react2.fireEvent.keyDown(input, {
      keyCode: 40
    });

    _react2.fireEvent.keyDown(input, {
      keyCode: 40
    });

    _react2.fireEvent.keyDown(input, {
      keyCode: 38
    });

    _react2.fireEvent.keyDown(input, {
      keyCode: 13
    }); // enter


    expect(onSelect).not.toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
  ['small', 'medium', 'large'].forEach(function (dropHeight) {
    test(dropHeight + " drop height", function (done) {
      var _render14 = (0, _react2.render)(_react["default"].createElement(_.TextInput, {
        "data-testid": "test-input",
        id: "item",
        name: "item",
        suggestions: ['test', 'test1'],
        dropHeight: dropHeight
      })),
          getByTestId = _render14.getByTestId;

      _react2.fireEvent.focus(getByTestId('test-input'));

      setTimeout(function () {
        (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();
        done();
      }, 50);
    });
  });
  test('should return focus to input on select',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var onSelect, _render15, getByPlaceholderText, input, selection;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onSelect = jest.fn();
            _render15 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
              "data-testid": "test-input-focus",
              id: "input-focus",
              name: "input-focus",
              placeholder: "Type to search...",
              suggestions: ['option0', 'option1', 'option2'],
              onSelect: onSelect
            }))), getByPlaceholderText = _render15.getByPlaceholderText;
            input = getByPlaceholderText('Type to search...');
            expect(document.activeElement).not.toEqual(input);

            _react2.fireEvent.focus(input);

            expect(document.activeElement).not.toEqual(input);
            _context.next = 8;
            return (0, _react2.waitForElement)(function () {
              return _dom.screen.getByText('option1');
            });

          case 8:
            selection = _context.sent;

            _react2.fireEvent.click(selection);

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
    var inputRef, onSelect, _render16, getByPlaceholderText, input, selection;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            inputRef = {
              current: {}
            };
            onSelect = jest.fn();
            _render16 = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.TextInput, {
              "data-testid": "test-input-focus",
              id: "input-focus",
              name: "input-focus",
              placeholder: "Type to search...",
              suggestions: ['option0', 'option1', 'option2'],
              onSelect: onSelect,
              ref: inputRef
            }))), getByPlaceholderText = _render16.getByPlaceholderText;
            input = getByPlaceholderText('Type to search...');
            expect(document.activeElement).not.toEqual(input);

            _react2.fireEvent.focus(input);

            expect(document.activeElement).not.toEqual(input);
            _context2.next = 9;
            return (0, _react2.waitForElement)(function () {
              return _dom.screen.getByText('option2');
            });

          case 9:
            selection = _context2.sent;

            _react2.fireEvent.click(selection);

            expect(document.activeElement).toEqual(input);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});