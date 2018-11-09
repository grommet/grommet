import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Grommet, SkipLinks, SkipLink, SkipLinkTarget } from '../..';
describe('SkipLink', function () {
  afterEach(cleanup);
  test('basic', function () {
    jest.useFakeTimers();

    var _render = render(React.createElement(Grommet, null, React.createElement(SkipLinks, {
      id: "skip-links"
    }, React.createElement(SkipLink, {
      id: "main",
      label: "Main Content"
    }), React.createElement(SkipLink, {
      id: "footer",
      label: "Footer"
    })), React.createElement("div", null, React.createElement(SkipLinkTarget, {
      id: "main"
    }), "Main Content", React.createElement("input", {
      type: "text",
      value: "main content",
      onChange: function onChange() {}
    })), React.createElement("footer", null, React.createElement(SkipLinkTarget, {
      id: "footer"
    }), React.createElement("input", {
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
    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
  });
});