// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('expect');
var assert = require('assert');
var App = require('../../src/js/components/App');

module.exports = {
  getComponent: function(path, testBody, props) {
    var JSXComponent = require(path);

    return TestUtils.renderIntoDocument(<div><JSXComponent {...props}>{testBody}</JSXComponent></div>);
  },
  componentShouldExist: function(component, className, assertContent) {
    var instance = TestUtils.findRenderedDOMComponentWithClass(component, className);

    expect(instance).toExist();
    if (assertContent) {
      assert.equal(instance.getDOMNode().textContent, assertContent);
    }
  },
  componentShouldNotExist: function(component, className) {
    var instance = TestUtils.scryRenderedDOMComponentsWithClass(component, className);

    expect(instance.length).toBe(0);
  },
  layerShouldExist: function(assertContent) {
    expect(document.body.getElementsByClassName('layer').length).toBe(1);
    if (assertContent) {
      expect(document.body.getElementsByClassName('layer')[0].textContent).toBe('Testing Layer');
    }
  }
};
