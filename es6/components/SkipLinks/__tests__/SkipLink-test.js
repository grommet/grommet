import React from 'react';
import 'jest-styled-components';
import { act, cleanup, render, fireEvent } from '@testing-library/react';
import { Grommet, SkipLinks, SkipLink, SkipLinkTarget } from '../..';
describe('SkipLink', function () {
  afterEach(cleanup);
  test('basic', function () {
    jest.useFakeTimers();

    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(SkipLinks, {
      id: "skip-links"
    }, /*#__PURE__*/React.createElement(SkipLink, {
      id: "main",
      label: "Main Content"
    }), /*#__PURE__*/React.createElement(SkipLink, {
      id: "footer",
      label: "Footer"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SkipLinkTarget, {
      id: "main"
    }), "Main Content", /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: "main content",
      onChange: function onChange() {}
    })), /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement(SkipLinkTarget, {
      id: "footer"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: "footer",
      onChange: function onChange() {}
    })))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    document.getElementById('skip-links').querySelector('a').focus();
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(document.activeElement);
    document.getElementById('skip-links').querySelector('a').blur();
    act(function () {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});