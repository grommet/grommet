"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('List', function () {
  afterEach(_react2.cleanup);
  test('empty', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, null)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('data strings', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two']
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('data objects', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onClickItem', function () {
    var onClickItem = jest.fn();

    var _render = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: [{
        a: 'alpha'
      }, {
        a: 'beta'
      }],
      onClickItem: onClickItem
    }))),
        container = _render.container,
        getByText = _render.getByText;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('beta'));

    expect(onClickItem).toBeCalledWith(expect.objectContaining({
      item: {
        a: 'beta'
      }
    }));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('background string', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two'],
      background: "accent-1"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('background array', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two', 'three', 'four'],
      background: ['accent-1', 'accent-2']
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border boolean', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two'],
      border: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border side', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two'],
      border: "horizontal"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border object', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two'],
      border: {
        color: 'accent-1',
        side: 'horizontal',
        size: 'large'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children render', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two']
    }, function (item, index) {
      return item + " - " + index;
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('itemProps', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two'],
      itemProps: {
        1: {
          background: 'accent-1',
          border: {
            side: 'horizontal',
            size: 'small'
          },
          pad: 'large'
        }
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad string', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two'],
      pad: "large"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad object', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: ['one', 'two'],
      pad: {
        horizontal: 'large'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('primaryKey', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }],
      primaryKey: "a"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('secondaryKey', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.List, {
      data: [{
        a: 'one',
        b: 1
      }, {
        a: 'two',
        b: 2
      }],
      primaryKey: "a",
      secondaryKey: "b"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});