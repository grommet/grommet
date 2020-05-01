import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { Distribution } from '..';
describe('Distribution', function () {
  test('renders', function () {
    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Distribution, {
      values: []
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('values renders', function () {
    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Distribution, {
      values: [{
        value: 20
      }, {
        value: 3
      }, {
        value: 2
      }, {
        value: 1
      }]
    }, function (value) {
      return /*#__PURE__*/React.createElement("span", null, value.value);
    }))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('gap renders', function () {
    var _render3 = render( /*#__PURE__*/React.createElement(Grommet, null, ['xsmall', 'small', 'medium', 'large'].map(function (gap) {
      return /*#__PURE__*/React.createElement(Distribution, {
        key: gap,
        gap: gap,
        values: [{
          value: 3
        }, {
          value: 2
        }, {
          value: 1
        }]
      }, function (value) {
        return /*#__PURE__*/React.createElement("span", null, value.value);
      });
    }))),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
});