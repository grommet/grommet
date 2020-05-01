import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { InfiniteScroll } from '..';
describe('InfiniteScroll', function () {
  var items = [];

  while (items.length < 4) {
    items.push(items.length);
  }

  test('basic', function () {
    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(InfiniteScroll, null), /*#__PURE__*/React.createElement(InfiniteScroll, {
      items: items
    }, function (item, index, ref) {
      return /*#__PURE__*/React.createElement("div", {
        ref: ref,
        key: index
      }, item);
    }), /*#__PURE__*/React.createElement(InfiniteScroll, {
      items: items
    }, function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      }, item);
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('step', function () {
    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(InfiniteScroll, {
      items: items,
      step: 2
    }, function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      }, item);
    }))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('show', function () {
    var _render3 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(InfiniteScroll, {
      items: items,
      step: 2,
      show: 3
    }, function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      }, item);
    }))),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('renderMarker', function () {
    var _render4 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(InfiniteScroll, {
      items: items,
      step: 2,
      renderMarker: function renderMarker(m) {
        return /*#__PURE__*/React.createElement("div", null, m);
      }
    }, function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      }, item);
    }))),
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('replace', function () {
    var _render5 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(InfiniteScroll, {
      items: items,
      step: 2,
      replace: true
    }, function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index
      }, item);
    }))),
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
  });
});