import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { InfiniteScroll } from '..';
describe('InfiniteScroll', function () {
  var items = [];

  while (items.length < 4) {
    items.push(items.length);
  }

  test('basic', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(InfiniteScroll, null), React.createElement(InfiniteScroll, {
      items: items
    }, function (item, index) {
      return React.createElement("div", {
        key: index
      }, item);
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('step', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(InfiniteScroll, {
      items: items,
      step: 2
    }, function (item, index) {
      return React.createElement("div", {
        key: index
      }, item);
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('show', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(InfiniteScroll, {
      items: items,
      step: 2,
      show: 3
    }, function (item, index) {
      return React.createElement("div", {
        key: index
      }, item);
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renderMarker', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(InfiniteScroll, {
      items: items,
      step: 2,
      renderMarker: function renderMarker(m) {
        return React.createElement("div", null, m);
      }
    }, function (item, index) {
      return React.createElement("div", {
        key: index
      }, item);
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});