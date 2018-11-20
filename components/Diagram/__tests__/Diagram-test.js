"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Context = function Context(_ref) {
  var children = _ref.children;
  return _react.default.createElement(_.Grommet, null, _react.default.createElement(_.Stack, null, _react.default.createElement(_.Box, {
    direction: "row"
  }, _react.default.createElement(_.Box, {
    id: "1",
    pad: "medium"
  }), _react.default.createElement(_.Box, {
    id: "2",
    pad: "medium"
  })), children));
};

Context.propTypes = {
  children: _propTypes.default.node.isRequired
};
describe('Diagram', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(Context, null, _react.default.createElement(_.Diagram, {
      connections: [{
        fromTarget: '1',
        toTarget: '2'
      }]
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('type', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(Context, null, _react.default.createElement(_.Diagram, {
      connections: [{
        fromTarget: '1',
        toTarget: '2',
        type: 'direct'
      }, {
        fromTarget: '1',
        toTarget: '2',
        type: 'curved'
      }, {
        fromTarget: '1',
        toTarget: '2',
        type: 'rectilinear'
      }]
    }))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('color', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(Context, null, _react.default.createElement(_.Diagram, {
      connections: [{
        fromTarget: '1',
        toTarget: '2',
        color: 'brand'
      }]
    }))),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('offset', function () {
    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(Context, null, _react.default.createElement(_.Diagram, {
      connections: [{
        fromTarget: '1',
        toTarget: '2',
        offset: 'xsmall'
      }, {
        fromTarget: '1',
        toTarget: '2',
        offset: 'small'
      }, {
        fromTarget: '1',
        toTarget: '2',
        offset: 'medium'
      }]
    }))),
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('thickness', function () {
    var _render5 = (0, _reactTestingLibrary.render)(_react.default.createElement(Context, null, _react.default.createElement(_.Diagram, {
      connections: [{
        fromTarget: '1',
        toTarget: '2',
        thickness: 'hair'
      }, {
        fromTarget: '1',
        toTarget: '2',
        thickness: 'xxsmall'
      }, {
        fromTarget: '1',
        toTarget: '2',
        thickness: 'xsmall'
      }, {
        fromTarget: '1',
        toTarget: '2',
        thickness: 'small'
      }, {
        fromTarget: '1',
        toTarget: '2',
        thickness: 'medium'
      }, {
        fromTarget: '1',
        toTarget: '2',
        thickness: '5px'
      }]
    }))),
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('anchor', function () {
    var _render6 = (0, _reactTestingLibrary.render)(_react.default.createElement(Context, null, _react.default.createElement(_.Diagram, {
      connections: [{
        fromTarget: '1',
        toTarget: '2',
        anchor: 'center'
      }, {
        fromTarget: '1',
        toTarget: '2',
        anchor: 'horizontal'
      }, {
        fromTarget: '1',
        toTarget: '2',
        anchor: 'vertical'
      }]
    }))),
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
  });
});