"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _domTestingLibrary = require("dom-testing-library");

var _Grommet = require("../../Grommet");

var _Keyboard = require("../../Keyboard");

var _portal = require("../../../utils/portal");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('MaskedInput', function () {
  beforeEach(_portal.createPortal);
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(_.MaskedInput, {
      name: "item"
    })),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('mask', function (done) {
    var onChange = jest.fn();
    var onFocus = jest.fn();

    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_.MaskedInput, {
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

    _reactTestingLibrary.fireEvent.focus(getByTestId('test-input'));

    setTimeout(function () {
      (0, _portal.expectPortal)('masked-input-drop__item').toMatchSnapshot();
      expect(onChange).not.toBeCalled();
      expect(onFocus).toBeCalled();
      done();
    }, 300);
  });
  test('option via mouse', function (done) {
    var onChange = jest.fn(function (event) {
      return event.target.value;
    });

    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_.MaskedInput, {
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

    _reactTestingLibrary.fireEvent.focus(getByTestId('test-input'));

    setTimeout(function () {
      (0, _portal.expectPortal)('masked-input-drop__item').toMatchSnapshot();

      _reactTestingLibrary.fireEvent.click((0, _domTestingLibrary.getByText)(document, 'aa'));

      expect(container.firstChild).toMatchSnapshot();
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveReturnedWith('aa!');
      done();
    }, 500);
  });
  test('option via keyboard', function (done) {
    var onChange = jest.fn(function (event) {
      return event.target.value;
    });

    var _render4 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_.MaskedInput, {
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

    _reactTestingLibrary.fireEvent.focus(input);

    setTimeout(function () {
      // pressing enter here nothing will happen
      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter


      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 40
      }); // down


      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 40
      }); // down


      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 38
      }); // up


      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter


      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveReturnedWith('aa!');
      done();
    }, 300);
  });
  test('Escape events should propagage if there is no drop', function (done) {
    var callback = jest.fn();

    var _render5 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_Keyboard.Keyboard, {
      onEsc: callback
    }, _react["default"].createElement(_.MaskedInput, {
      "data-testid": "test-masked-input",
      id: "item",
      name: "item"
    })))),
        getByTestId = _render5.getByTestId;

    _reactTestingLibrary.fireEvent.change(getByTestId('test-masked-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      _reactTestingLibrary.fireEvent.keyDown(getByTestId('test-masked-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27
      });

      expect(callback).toBeCalled();
      done();
    }, 50);
  });
  test('next and previous without options', function (done) {
    var onChange = jest.fn();

    var _render6 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_.MaskedInput, {
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
        getByTestId = _render6.getByTestId,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');

    _reactTestingLibrary.fireEvent.focus(input);

    setTimeout(function () {
      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 40
      });

      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 40
      });

      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 38
      });

      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter


      expect(onChange).not.toBeCalled();
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 300);
  });
  test('event target props are available option via mouse', function (done) {
    var onChangeMock = jest.fn(function (event) {
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

    var _render7 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_.MaskedInput, {
      "data-testid": "test-event-target-select-by-mouse",
      plain: true,
      size: "large",
      id: "input-id",
      name: "input-name",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChangeMock
    })),
        getByTestId = _render7.getByTestId,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.focus(getByTestId('test-event-target-select-by-mouse'));

    setTimeout(function () {
      (0, _portal.expectPortal)('masked-input-drop__input-id').toMatchSnapshot();

      _reactTestingLibrary.fireEvent.click((0, _domTestingLibrary.getByText)(document, 'aa'));

      expect(container.firstChild).toMatchSnapshot();
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveReturnedWith(expect.objectContaining({
        target: expect.objectContaining({
          id: 'input-id',
          name: 'input-name',
          value: 'aa!'
        })
      }));
      done();
    }, 500);
  });
  test('event target props are available option via keyboard', function (done) {
    var onChangeMock = jest.fn(function (event) {
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

    var _render8 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_.MaskedInput, {
      "data-testid": "test-event-target-select-by-keyboard",
      id: "input-id",
      name: "input-name",
      size: "medium",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChangeMock
    })),
        getByTestId = _render8.getByTestId,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-event-target-select-by-keyboard');

    _reactTestingLibrary.fireEvent.focus(input);

    setTimeout(function () {
      // pressing enter here nothing will happen
      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter


      expect(onChangeMock).not.toBeCalled();

      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 40
      }); // down


      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 40
      }); // down


      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 38
      }); // up


      _reactTestingLibrary.fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter


      expect(onChangeMock).toBeCalled();
      expect(onChangeMock).toBeCalledTimes(1);
      expect(onChangeMock).toHaveReturnedWith(expect.objectContaining({
        target: expect.objectContaining({
          id: 'input-id',
          name: 'input-name',
          value: 'aa!'
        })
      }));
      done();
    }, 300);
  });
  test('applies custom global.hover theme to options', function (done) {
    var customTheme = {
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
    var onChange = jest.fn(function (event) {
      return event.target.value;
    });

    var _render9 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_Grommet.Grommet, {
      theme: customTheme
    }, _react["default"].createElement(_.MaskedInput, {
      "data-testid": "test-global-hover-theme",
      plain: true,
      size: "large",
      id: "global-hover-theme",
      name: "global-hover-theme",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb', 'cc'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChange
    }))),
        getByTestId = _render9.getByTestId,
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.focus(getByTestId('test-global-hover-theme'));

    setTimeout(function () {
      var optionButton = (0, _domTestingLibrary.getByText)(document, 'bb').closest('button');

      _reactTestingLibrary.fireEvent.mouseOver(optionButton);

      expect(optionButton).toMatchSnapshot();
      done();
    }, 500);
  });
});