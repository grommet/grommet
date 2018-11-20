import React from 'react';
import PropTypes from 'prop-types';
import 'jest-styled-components';
import { cleanup, render } from 'react-testing-library';
import { Grommet, Box, Diagram, Stack } from '../..';

var Context = function Context(_ref) {
  var children = _ref.children;
  return React.createElement(Grommet, null, React.createElement(Stack, null, React.createElement(Box, {
    direction: "row"
  }, React.createElement(Box, {
    id: "1",
    pad: "medium"
  }), React.createElement(Box, {
    id: "2",
    pad: "medium"
  })), children));
};

Context.propTypes = {
  children: PropTypes.node.isRequired
};
describe('Diagram', function () {
  afterEach(cleanup);
  test('basic', function () {
    var _render = render(React.createElement(Context, null, React.createElement(Diagram, {
      connections: [{
        fromTarget: '1',
        toTarget: '2'
      }]
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('type', function () {
    var _render2 = render(React.createElement(Context, null, React.createElement(Diagram, {
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
    var _render3 = render(React.createElement(Context, null, React.createElement(Diagram, {
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
    var _render4 = render(React.createElement(Context, null, React.createElement(Diagram, {
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
    var _render5 = render(React.createElement(Context, null, React.createElement(Diagram, {
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
    var _render6 = render(React.createElement(Context, null, React.createElement(Diagram, {
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