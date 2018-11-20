"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _reactTestingLibrary = require("react-testing-library");

var _domTestingLibrary = require("dom-testing-library");

var _portal = require("../../../utils/portal");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Menu', function () {
  beforeEach(_portal.createPortal);
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      icon: _react.default.createElement("svg", null),
      label: "Test Menu",
      id: "test-menu",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    })));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('custom message', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      label: "Test Menu",
      messages: {
        openMenu: 'Abrir Menu'
      },
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    })));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('open and close on click', function () {
    window.scrollTo = jest.fn();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2',
        onClick: function onClick() {}
      }, {
        label: 'Item 3',
        href: '/test'
      }]
    }))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByText('Test'));

    expect(container.firstChild).toMatchSnapshot();
    (0, _portal.expectPortal)('test-menu__drop').toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Test'));

    expect(document.getElementById('test-menu__drop')).toBeNull();
    expect(window.scrollTo).toBeCalled();
  });
  test('close by clicking outside', function (done) {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByText('Test'));

    (0, _portal.expectPortal)('test-menu__drop').toMatchSnapshot();
    (0, _reactTestingLibrary.fireEvent)(document, new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    }));
    setTimeout(function () {
      expect(document.getElementById('test-menu__drop')).toBeNull();
      done();
    }, 50);
  });
  test('select an item', function () {
    var onClick = jest.fn();

    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1',
        onClick: onClick
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render3.getByText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Test')); // click in the first menu item


    _reactTestingLibrary.fireEvent.click((0, _domTestingLibrary.getByText)(document, 'Item 1'));

    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('navigate through suggestions and select', function () {
    var onClick = jest.fn();

    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1',
        onClick: onClick
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render4.getByText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot(); // pressing down 3x: first opens the drop,
    // second moves to the first suggestion
    // third moves to the last suggestion

    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    }); // moves to the first suggestion


    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Up',
      keyCode: 38,
      which: 38
    }); // select that by pressing enter


    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });

    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('close on esc', function () {
    var _render5 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Esc',
      keyCode: 27,
      which: 27
    });

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('close on tab', function () {
    var _render6 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render6.getByText,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('with dropAlign renders', function () {
    var _render7 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      id: "test-menu",
      dropAlign: {
        top: 'top',
        right: 'right'
      },
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render7.getByText,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    (0, _portal.expectPortal)('test-menu__drop').toMatchSnapshot();
  });
  test('disabled', function () {
    var _render8 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Menu, {
      id: "test-menu",
      disabled: true,
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2',
        onClick: function onClick() {}
      }, {
        label: 'Item 3',
        href: '/test'
      }]
    })), {
      attachTo: document.body.firstChild
    }),
        getByText = _render8.getByText,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();

    _reactTestingLibrary.fireEvent.click(getByText('Test'));

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
});