"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _reactTestingLibrary = require("react-testing-library");

var _portal = require("../../../utils/portal");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Select', function () {
  beforeEach(_portal.createPortal);
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Select, {
      id: "test-select",
      options: ['one', 'two']
    }));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('opens', function (done) {
    window.scrollTo = jest.fn();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      placeholder: "test select",
      id: "test-select",
      options: ['one', 'two']
    })),
        getByPlaceholderText = _render.getByPlaceholderText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    (0, _portal.expectPortal)('test-select__drop').toMatchSnapshot();
    setTimeout(function () {
      expect(document.activeElement).toMatchSnapshot();
      done();
    }, 100);
  });
  test('complex options and children', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      placeholder: "test select",
      options: [{
        test: 'one'
      }, {
        test: 'two'
      }]
    }, function (option) {
      return _react.default.createElement("span", null, option.test);
    })),
        getByPlaceholderText = _render2.getByPlaceholderText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    (0, _portal.expectPortal)('test-select__drop').toMatchSnapshot();
  });
  test('search', function () {
    jest.useFakeTimers();
    var onSearch = jest.fn();

    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      placeholder: "test select",
      options: ['one', 'two'],
      onSearch: onSearch
    })),
        getByPlaceholderText = _render3.getByPlaceholderText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select'));

    (0, _portal.expectPortal)('test-select__drop').toMatchSnapshot();
    setTimeout(function () {
      jest.runAllTimers();
      expect(document.activeElement).toMatchSnapshot();
      document.activeElement.value = 'a';

      _reactTestingLibrary.fireEvent.input(document.activeElement);

      expect(onSearch).toBeCalledWith('a');
    }, 200);
  }); // NOTE: This isn't really a test for Select
  // test('closes drop on esc', () => {
  //   const onClose = jest.fn();
  //   const component = mount(
  //     <Select id='test-select' options={['one', 'two']} onClose={onClose} />
  //   );
  //
  //   fireEvent.keyDown(
  //     component.getDOMNode(),
  //     { key: 'Down', keyCode: 40, which: 40 }
  //   );
  //
  //   expectPortal('test-select__drop').toMatchSnapshot();
  //   expect(component.getDOMNode()).toMatchSnapshot();
  //
  //   fireEvent.keyDown(
  //     document.getElementById('test-select__drop'),
  //     { key: 'Esc', keyCode: 27, which: 27 }
  //   );
  //
  //   expect(onClose).toBeCalled();
  //   expect(document.getElementById('test-select__drop')).toBeNull();
  //   expect(component.getDOMNode()).toMatchSnapshot();
  // });

  test('select an option', function () {
    window.scrollTo = jest.fn();
    var onChange = jest.fn();

    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      placeholder: "test select",
      options: ['one', 'two'],
      onChange: onChange
    })),
        getByPlaceholderText = _render4.getByPlaceholderText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select')); // pressing enter here nothing will happen


    _reactTestingLibrary.fireEvent.click(document.getElementById('test-select__drop').querySelector('button'));

    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });
  test('select an option with complex options', function () {
    window.scrollTo = jest.fn();
    var onChange = jest.fn();

    var _render5 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      plain: true,
      value: _react.default.createElement("span", null, "one"),
      options: [{
        test: 'one'
      }, {
        test: 'two'
      }],
      onChange: onChange
    }, function (option) {
      return _react.default.createElement("span", null, option.test);
    })),
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('one')); // pressing enter here nothing will happen


    _reactTestingLibrary.fireEvent.click(document.getElementById('test-select__drop').querySelector('button'));

    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });
  test('select an option with enter', function () {
    window.scrollTo = jest.fn();
    var onChange = jest.fn();

    var _render6 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      placeholder: "test select",
      options: ['one', 'two'],
      onChange: onChange
    })),
        getByPlaceholderText = _render6.getByPlaceholderText,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select'));

    _reactTestingLibrary.fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    _reactTestingLibrary.fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Up',
      keyCode: 38,
      which: 38
    });

    _reactTestingLibrary.fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });

    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: 'one'
    }));
    expect(window.scrollTo).toBeCalled();
  });
  test('size', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Select, {
      id: "test-select",
      size: "large",
      options: ['one', 'two'],
      selected: [],
      value: [],
      onChange: function onChange() {}
    }));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('multiple', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Select, {
      id: "test-select",
      multiple: true,
      options: ['one', 'two'],
      selected: [],
      value: []
    }));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('multiple values', function () {
    var _render7 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      placeholder: "test select",
      multiple: true,
      options: ['one', 'two'],
      selected: [0, 1],
      value: ['one', 'two']
    })),
        getByPlaceholderText = _render7.getByPlaceholderText,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    (0, _portal.expectPortal)('test-select__drop').toMatchSnapshot();
  });
  test('select another option', function () {
    var onChange = jest.fn();

    var _render8 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      placeholder: "test select",
      multiple: true,
      options: ['one', 'two'],
      onChange: onChange,
      value: ['two'],
      selected: [1]
    })),
        getByPlaceholderText = _render8.getByPlaceholderText,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select'));

    _reactTestingLibrary.fireEvent.click(document.getElementById('test-select__drop').querySelector('button'));

    expect(onChange).toBeCalled();
  });
  test('deselect an option', function () {
    var onChange = jest.fn();

    var _render9 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      placeholder: "test select",
      multiple: true,
      options: ['one', 'two'],
      onChange: onChange,
      value: ['one'],
      selected: [0]
    })),
        getByPlaceholderText = _render9.getByPlaceholderText,
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select'));

    _reactTestingLibrary.fireEvent.click(document.getElementById('test-select__drop').querySelector('button'));

    expect(onChange).toBeCalled();
  });
  test('disabled', function () {
    var _render10 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Select, {
      id: "test-select",
      placeholder: "test select",
      disabled: true,
      options: ['one', 'two']
    })),
        getByPlaceholderText = _render10.getByPlaceholderText,
        container = _render10.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
  });
});