function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import { cleanup, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Grommet } from '../../Grommet';
import { Image } from '..';
var opacityTypes = ['weak', 'medium', 'strong', '0.3', true, false];
var SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII='; // eslint-disable-line max-len

test('image should have no violations', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _render, container, results;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
            src: SRC,
            a11yTitle: "Alt Text"
          }))), container = _render.container;
          _context.next = 3;
          return axe(container);

        case 3:
          results = _context.sent;
          expect(results).toHaveNoViolations();
          cleanup();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('Image renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Image renders with aria-label', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
    a11yTitle: "aria-label-text",
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Image fit renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
    fit: "cover",
    src: SRC
  }), /*#__PURE__*/React.createElement(Image, {
    fit: "contain",
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
opacityTypes.forEach(function (opacity) {
  test("Image opacity of " + opacity + " renders", function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
      opacity: opacity,
      src: SRC
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
test('Image fillProp renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
    fill: true,
    src: SRC
  }), /*#__PURE__*/React.createElement(Image, {
    fill: false,
    src: SRC
  }), /*#__PURE__*/React.createElement(Image, {
    fill: "horizontal",
    src: SRC
  }), /*#__PURE__*/React.createElement(Image, {
    fill: "vertical",
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});