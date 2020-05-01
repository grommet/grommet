"use strict";

var _react = _interopRequireDefault(require("react"));

require("core-js/stable");

require("regenerator-runtime/runtime");

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _dom = require("@testing-library/dom");

var _grommetIcons = require("grommet-icons");

var _portal = require("../../../utils/portal");

var _Grommet = require("../../Grommet");

var _Keyboard = require("../../Keyboard");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe('MaskedInput', function () {
  beforeEach(_portal.createPortal);
  afterEach(_react2.cleanup);
  test('basic', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
      name: "item"
    })),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('icon', function () {
    var _render2 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Search, null),
      name: "item"
    })),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('icon reverse', function () {
    var _render3 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Search, null),
      reverse: true,
      name: "item"
    })),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('mask', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var onChange, onFocus, _render4, getByTestId, container;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onChange = jest.fn();
            onFocus = jest.fn();
            _render4 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
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
            })), getByTestId = _render4.getByTestId, container = _render4.container;
            expect(container.firstChild).toMatchSnapshot();

            _react2.fireEvent.focus(getByTestId('test-input'));

            _context.next = 7;
            return (0, _react2.waitForElement)(function () {
              return _dom.screen.getByText('aa');
            });

          case 7:
            (0, _portal.expectPortal)('masked-input-drop__item').toMatchSnapshot();
            expect(onChange).not.toBeCalled();
            expect(onFocus).toBeCalled();

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('option via mouse', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var onChange, _render5, getByTestId, container, option;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            onChange = jest.fn(function (event) {
              return event.target.value;
            });
            _render5 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
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
              onChange: onChange
            })), getByTestId = _render5.getByTestId, container = _render5.container;
            expect(container.firstChild).toMatchSnapshot();

            _react2.fireEvent.focus(getByTestId('test-input'));

            _context2.next = 6;
            return (0, _react2.waitForElement)(function () {
              return (0, _dom.getByText)(document, 'aa');
            });

          case 6:
            option = _context2.sent;
            (0, _portal.expectPortal)('masked-input-drop__item').toMatchSnapshot();

            _react2.fireEvent.click(option);

            expect(container.firstChild).toMatchSnapshot();
            expect(onChange).toHaveBeenCalled();
            expect(onChange).toHaveReturnedWith('aa!');

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  test('option via keyboard', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var onChange, _render6, getByTestId, container, input;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            onChange = jest.fn(function (event) {
              return event.target.value;
            });
            _render6 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
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
              onChange: onChange
            })), getByTestId = _render6.getByTestId, container = _render6.container;
            expect(container.firstChild).toMatchSnapshot();
            input = getByTestId('test-input');

            _react2.fireEvent.focus(input);

            _context3.next = 7;
            return (0, _react2.waitForElement)(function () {
              return _dom.screen.getByText('aa');
            });

          case 7:
            // pressing enter here nothing will happen
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


            expect(onChange).toHaveBeenCalled();
            expect(onChange).toHaveReturnedWith('aa!');

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('Escape events should propagage if there is no drop', function () {
    var callback = jest.fn();

    var _render7 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
      onEsc: callback
    }, /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item"
    })))),
        getByTestId = _render7.getByTestId;

    _react2.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    _react2.fireEvent.keyDown(getByTestId('test-input'), {
      key: 'Esc',
      keyCode: 27,
      which: 27
    });

    expect(callback).toBeCalled();
  });
  test('next and previous without options', function () {
    var onChange = jest.fn();

    var _render8 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      mask: [{
        length: [1, 2],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      onChange: onChange
    })),
        getByTestId = _render8.getByTestId,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');

    _react2.fireEvent.focus(input);

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


    expect(onChange).not.toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('event target props are available option via mouse', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var onChangeMock, _render9, getByTestId, container;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            onChangeMock = jest.fn(function (event) {
              var _event$target = event.target,
                  value = _event$target.value,
                  id = _event$target.id,
                  name = _event$target.name;
              return {
                target: {
                  id: id,
                  value: value,
                  name: name
                }
              };
            });
            _render9 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
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
              onChange: onChangeMock
            })), getByTestId = _render9.getByTestId, container = _render9.container;
            expect(container.firstChild).toMatchSnapshot();

            _react2.fireEvent.focus(getByTestId('test-input'));

            _context4.next = 6;
            return (0, _react2.waitForElement)(function () {
              return _dom.screen.getByText('aa');
            });

          case 6:
            (0, _portal.expectPortal)('masked-input-drop__item').toMatchSnapshot();

            _react2.fireEvent.click((0, _dom.getByText)(document, 'aa'));

            expect(container.firstChild).toMatchSnapshot();
            expect(onChangeMock).toHaveBeenCalled();
            expect(onChangeMock).toHaveReturnedWith(expect.objectContaining({
              target: expect.objectContaining({
                id: 'item',
                name: 'item',
                value: 'aa!'
              })
            }));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('event target props are available option via keyboard', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var onChangeMock, _render10, getByTestId, container, input;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            onChangeMock = jest.fn(function (event) {
              var _event$target2 = event.target,
                  value = _event$target2.value,
                  id = _event$target2.id,
                  name = _event$target2.name;
              return {
                target: {
                  id: id,
                  value: value,
                  name: name
                }
              };
            });
            _render10 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
              "data-testid": "test-input",
              id: "item",
              name: "item",
              size: "medium",
              mask: [{
                length: [1, 2],
                options: ['aa', 'bb'],
                regexp: /^[ab][ab]$|^[ab]$/
              }, {
                fixed: '!'
              }],
              onChange: onChangeMock
            })), getByTestId = _render10.getByTestId, container = _render10.container;
            expect(container.firstChild).toMatchSnapshot();
            input = getByTestId('test-input');

            _react2.fireEvent.focus(input);

            _context5.next = 7;
            return (0, _react2.waitForElement)(function () {
              return _dom.screen.getByText('aa');
            });

          case 7:
            // pressing enter here nothing will happen
            _react2.fireEvent.keyDown(input, {
              keyCode: 13
            }); // enter


            expect(onChangeMock).not.toBeCalled();

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


            expect(onChangeMock).toBeCalled();
            expect(onChangeMock).toBeCalledTimes(1);
            expect(onChangeMock).toHaveReturnedWith(expect.objectContaining({
              target: expect.objectContaining({
                id: 'item',
                name: 'item',
                value: 'aa!'
              })
            }));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test('applies custom global.hover theme to options', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var customTheme, onChange, _render11, getByTestId, container, optionButton;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            customTheme = {
              global: {
                hover: {
                  background: {
                    color: 'lightgreen'
                  },
                  color: {
                    dark: 'lightgrey',
                    light: 'brand'
                  }
                }
              }
            };
            onChange = jest.fn(function (event) {
              return event.target.value;
            });
            _render11 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, {
              theme: customTheme
            }, /*#__PURE__*/_react["default"].createElement(_.MaskedInput, {
              "data-testid": "test-input",
              plain: true,
              size: "large",
              id: "item",
              name: "item",
              mask: [{
                length: [1, 2],
                options: ['aa', 'bb', 'cc'],
                regexp: /^[ab][ab]$|^[ab]$/
              }, {
                fixed: '!'
              }],
              onChange: onChange
            }))), getByTestId = _render11.getByTestId, container = _render11.container;
            expect(container.firstChild).toMatchSnapshot();

            _react2.fireEvent.focus(getByTestId('test-input'));

            _context6.next = 7;
            return (0, _react2.waitForElement)(function () {
              return _dom.screen.getByText('aa');
            });

          case 7:
            optionButton = (0, _dom.getByText)(document, 'bb').closest('button');

            _react2.fireEvent.mouseOver(optionButton);

            expect(optionButton).toMatchSnapshot();

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
});