"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _domTestingLibrary = require("dom-testing-library");

var _portal = require("../../../utils/portal");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('MaskedInput', function () {
  beforeEach(_portal.createPortal);
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.MaskedInput, {
      name: "item"
    })),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('mask', function (done) {
    var onChange = jest.fn();
    var onFocus = jest.fn();

    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.MaskedInput, {
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
    var onChange = jest.fn();

    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.MaskedInput, {
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

    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.MaskedInput, {
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

    var _render5 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.MaskedInput, {
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
});