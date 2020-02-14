"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _react2 = require("@testing-library/react");

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Grid', function () {
  test('renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, null)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('a11yTitle renders', function () {
    var _render = (0, _react2.render)(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      a11yTitle: "My Grid"
    }))),
        container = _render.container,
        getByLabelText = _render.getByLabelText;

    var gridWithLabel = getByLabelText('My Grid');
    expect(gridWithLabel).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test('rows renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      rows: ['small', 'large', 'medium']
    }), _react["default"].createElement(_.Grid, {
      rows: "small"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('columns renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      columns: ['1/2', '2/4']
    }), _react["default"].createElement(_.Grid, {
      columns: ['1/3', '2/3']
    }), _react["default"].createElement(_.Grid, {
      columns: ['1/4', '3/4']
    }), _react["default"].createElement(_.Grid, {
      columns: "small"
    }), _react["default"].createElement(_.Grid, {
      columns: {
        count: 'fit',
        size: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      columns: {
        count: 'fill',
        size: ['small', 'medium']
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('areas renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      rows: ['xxsmall', 'medium', 'xsmall'],
      columns: ['3/4', '1/4'],
      areas: [{
        name: 'header',
        start: [0, 0],
        end: [0, 1]
      }, {
        name: 'main',
        start: [1, 0],
        end: [1, 0]
      }, {
        name: 'sidebar',
        start: [1, 1],
        end: [1, 1]
      }, {
        name: 'footer',
        start: [2, 0],
        end: [2, 1]
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('areas renders when given an array of string arrays', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      rows: ['xxsmall', 'medium', 'xsmall'],
      columns: ['3/4', '1/4'],
      areas: [['header', 'header'], ['sidebar', 'main'], ['footer', 'footer']]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justify renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      justify: "start"
    }), _react["default"].createElement(_.Grid, {
      justify: "center"
    }), _react["default"].createElement(_.Grid, {
      justify: "end"
    }), _react["default"].createElement(_.Grid, {
      justify: "stretch"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('align renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      align: "start"
    }), _react["default"].createElement(_.Grid, {
      align: "center"
    }), _react["default"].createElement(_.Grid, {
      align: "end"
    }), _react["default"].createElement(_.Grid, {
      align: "stretch"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justifyContent renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      justifyContent: "start"
    }), _react["default"].createElement(_.Grid, {
      justifyContent: "center"
    }), _react["default"].createElement(_.Grid, {
      justifyContent: "between"
    }), _react["default"].createElement(_.Grid, {
      justifyContent: "around"
    }), _react["default"].createElement(_.Grid, {
      justifyContent: "end"
    }), _react["default"].createElement(_.Grid, {
      justifyContent: "stretch"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignContent renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      alignContent: "start"
    }), _react["default"].createElement(_.Grid, {
      alignContent: "center"
    }), _react["default"].createElement(_.Grid, {
      alignContent: "between"
    }), _react["default"].createElement(_.Grid, {
      alignContent: "around"
    }), _react["default"].createElement(_.Grid, {
      alignContent: "end"
    }), _react["default"].createElement(_.Grid, {
      alignContent: "stretch"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      gap: "small"
    }), _react["default"].createElement(_.Grid, {
      gap: "medium"
    }), _react["default"].createElement(_.Grid, {
      gap: "large"
    }), _react["default"].createElement(_.Grid, {
      gap: {
        row: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      gap: {
        row: 'medium'
      }
    }), _react["default"].createElement(_.Grid, {
      gap: {
        row: 'large'
      }
    }), _react["default"].createElement(_.Grid, {
      gap: {
        column: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      gap: {
        column: 'medium'
      }
    }), _react["default"].createElement(_.Grid, {
      gap: {
        column: 'large'
      }
    }), _react["default"].createElement(_.Grid, {
      gap: {
        row: 'small',
        column: 'medium'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      fill: true
    }), _react["default"].createElement(_.Grid, {
      fill: false
    }), _react["default"].createElement(_.Grid, {
      fill: "horizontal"
    }), _react["default"].createElement(_.Grid, {
      fill: "vertical"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('as renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      as: "article"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('proxies tag', function () {
    var tagComponent = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      tag: "article"
    })));

    var asComponent = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      as: "article"
    })));

    expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
  });
  test('pad', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Grid, {
      pad: "small"
    }), _react["default"].createElement(_.Grid, {
      pad: "medium"
    }), _react["default"].createElement(_.Grid, {
      pad: "large"
    }), _react["default"].createElement(_.Grid, {
      pad: {
        horizontal: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      pad: {
        vertical: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      pad: {
        bottom: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      pad: {
        left: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      pad: {
        right: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      pad: {
        start: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      pad: {
        end: 'small'
      }
    }), _react["default"].createElement(_.Grid, {
      pad: {
        top: 'small'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});