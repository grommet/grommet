var __path__ = '../../src/js/components/Form';

var expect = require('expect');
var assert = require('assert');

describe('Grommet Form', function() {
  it('loads a basic Form', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Form = require(__path__);

    var Component = TestUtils.renderIntoDocument(<Form><h2>Form</h2></Form>);

    var formInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'form');

    expect(formInstance).toExist();
    assert.equal(formInstance.getDOMNode().textContent, 'Form');
  });

  it('loads a compact Form', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Form = require(__path__);

    var Component = TestUtils.renderIntoDocument(<Form compact={true}><h2>Form</h2></Form>);

    var formInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'form--compact');

    expect(formInstance).toExist();
    assert.equal(formInstance.getDOMNode().textContent, 'Form');
  });

  it('submits a Form', function(done) {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Form = require(__path__);

    var formSubmited = false;
    var formSubmit = function() {
      formSubmited = true;
    }

    var Component = TestUtils.renderIntoDocument(<Form className="testing" onSubmit={formSubmit}><h2>Form</h2><input type="submit" value="Click" onClick={formSubmit}/></Form>);

    var formInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'testing');

    expect(formInstance).toExist();
    expect(formSubmited).toBe(false);

    var btn = TestUtils.findRenderedDOMComponentWithTag(Component, 'input');
    TestUtils.Simulate.click(btn.getDOMNode());

    setTimeout(function() {
      expect(formSubmited).toBe(true);
      done();
    }, 50);
  });
});