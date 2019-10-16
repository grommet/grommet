"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _react2 = require("@testing-library/react");

var _dom = require("@testing-library/dom");

var _portal = require("../../../utils/portal");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Menu', function () {
  beforeEach(_portal.createPortal);
  afterEach(_react2.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
      icon: _react["default"].createElement("svg", null),
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
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
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
  test('justify content', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null, ['start', 'center', 'end', 'between', 'around', 'stretch'].map(function (justifyContent) {
      return _react["default"].createElement(_.Menu, {
        key: justifyContent,
        label: justifyContent + " Menu",
        messages: {
          openMenu: 'Abrir Menu'
        },
        items: [{
          label: 'Item 1'
        }, {
          label: 'Item 2'
        }],
        justifyContent: justifyContent
      });
    })));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('open and close on click', function () {
    window.scrollTo = jest.fn();

    var _render = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
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
        getByLabelText = _render.getByLabelText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();

    _react2.fireEvent.click(getByLabelText('Open Menu'));

    expect(container.firstChild).toMatchSnapshot();
    (0, _portal.expectPortal)('test-menu__drop').toMatchSnapshot();

    _react2.fireEvent.click(getByLabelText('Close Menu'));

    expect(document.getElementById('test-menu__drop')).toBeNull();
    expect(window.scrollTo).toBeCalled();
  });
  test('close by clicking outside', function (done) {
    var _render2 = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
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

    _react2.fireEvent.click(getByText('Test'));

    (0, _portal.expectPortal)('test-menu__drop').toMatchSnapshot();
    (0, _react2.fireEvent)(document, new MouseEvent('mousedown', {
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

    var _render3 = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
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

    _react2.fireEvent.click(getByText('Test')); // click in the first menu item


    _react2.fireEvent.click((0, _dom.getByText)(document, 'Item 1'));

    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('navigate through suggestions and select', function () {
    var onClick = jest.fn();

    var _render4 = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2',
        onClick: onClick
      }]
    }))),
        getByLabelText = _render4.getByLabelText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot(); // Pressing space opens drop
    // First tab moves to first item
    // Second tab moves to second item
    // Enter selects the item

    _react2.fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Space',
      keyCode: 32,
      which: 32
    });

    _react2.fireEvent.keyDown(document.activeElement.firstChild, {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });

    _react2.fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });

    _react2.fireEvent.keyDown(document.activeElement, {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });

    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('close on esc', function () {
    var _render5 = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByLabelText = _render5.getByLabelText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    _react2.fireEvent.keyDown(getByLabelText('Close Menu'), {
      key: 'Esc',
      keyCode: 27,
      which: 27
    });

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('close on tab', function () {
    var _render6 = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByLabelText = _render6.getByLabelText,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    _react2.fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('with dropAlign renders', function () {
    var _render7 = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
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

    _react2.fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });

    (0, _portal.expectPortal)('test-menu__drop').toMatchSnapshot();
  });
  test('disabled', function () {
    var _render8 = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_.Menu, {
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

    _react2.fireEvent.click(getByText('Test'));

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
});