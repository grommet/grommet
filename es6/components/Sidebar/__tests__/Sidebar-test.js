import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Avatar } from '../../Avatar';
import { Grommet } from '../../Grommet';
import { Sidebar } from '..';
var src = '';
describe('Sidebar', function () {
  afterEach(cleanup);
  test('renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Sidebar, {
      id: "test id",
      name: "test name"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('header', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Sidebar, {
      header: /*#__PURE__*/React.createElement(Avatar, {
        src: src
      })
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('footer', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Sidebar, {
      footer: /*#__PURE__*/React.createElement(Avatar, {
        src: src
      })
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Sidebar, null, /*#__PURE__*/React.createElement(Avatar, {
      src: src
    }), "children test")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('all', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Sidebar, {
      footer: /*#__PURE__*/React.createElement(Avatar, null, "SY"),
      header: /*#__PURE__*/React.createElement(Avatar, {
        src: src
      }),
      background: "brand"
    }, "test all props and children")));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});