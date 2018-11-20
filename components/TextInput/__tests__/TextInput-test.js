"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _domTestingLibrary = require("dom-testing-library");

var _portal = require("../../../utils/portal");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextInput', function () {
  beforeEach(_portal.createPortal);
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.TextInput, {
      name: "item"
    })),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('suggestions', function (done) {
    var onChange = jest.fn();
    var onFocus = jest.fn();

    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.TextInput, {
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

    _reactTestingLibrary.fireEvent.focus(getByTestId('test-input'));

    _reactTestingLibrary.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();
      expect(onChange).toBeCalled();
      expect(onFocus).toBeCalled();
      (0, _reactTestingLibrary.fireEvent)(document, new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      }));
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });
  test('complex suggestions', function (done) {
    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextInput, {
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

    _reactTestingLibrary.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();
      (0, _reactTestingLibrary.fireEvent)(document, new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      }));
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });
  test('close suggestion drop', function (done) {
    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      suggestions: ['test', 'test1']
    }))),
        getByTestId = _render4.getByTestId,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();

      _reactTestingLibrary.fireEvent.keyDown(getByTestId('test-input'), {
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

    var _render5 = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextInput, {
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

    _reactTestingLibrary.fireEvent.change(getByTestId('test-input'), {
      target: {
        value: ' '
      }
    });

    setTimeout(function () {
      (0, _portal.expectPortal)('text-input-drop__item').toMatchSnapshot();

      _reactTestingLibrary.fireEvent.click((0, _domTestingLibrary.getByText)(document, 'test1'));

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

    var _render6 = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextInput, {
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


    expect(onSelect).toBeCalledWith(expect.objectContaining({
      suggestion: 'test'
    }));
  });
  test('handles next and previous without suggestion', function () {
    var onSelect = jest.fn();

    var _render7 = (0, _reactTestingLibrary.render)(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      onSelect: onSelect
    }))),
        getByTestId = _render7.getByTestId,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');

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


    expect(onSelect).not.toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});