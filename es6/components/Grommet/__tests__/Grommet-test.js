function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render } from 'react-testing-library';
import { hpe as hpeTheme } from 'grommet-theme-hpe';
import { Grommet } from '..';
import { AnnounceContext } from '../../../contexts';

var TestAnnouncer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TestAnnouncer, _Component);

  function TestAnnouncer() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TestAnnouncer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var announce = this.props.announce;
    announce('hello', 'assertive');
  };

  _proto.render = function render() {
    return React.createElement("div", null, "hi");
  };

  return TestAnnouncer;
}(Component);

_defineProperty(TestAnnouncer, "propTypes", {
  announce: PropTypes.func.isRequired
});

describe('Grommet', function () {
  afterEach(cleanup);
  test('basic', function () {
    var component = renderer.create(React.createElement(Grommet, null));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('hpe theme', function () {
    var component = renderer.create(React.createElement(Grommet, {
      theme: hpeTheme
    }, "Grommet App"));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('full', function () {
    var component = renderer.create(React.createElement(Grommet, {
      full: true
    }, "Grommet App"));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('announce', function (done) {
    var _render = render(React.createElement(Grommet, null, React.createElement(AnnounceContext.Consumer, null, function (announce) {
      return React.createElement(TestAnnouncer, {
        announce: announce
      });
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot(); // no style, no need for expectPortal

    expect(document.body.querySelector('[aria-live]')).toMatchSnapshot();
    setTimeout(function () {
      // should clear the aria-live container
      expect(document.body.querySelector('[aria-live]')).toMatchSnapshot();
      done();
    }, 600); // wait the aria-live container to clear
  });
});