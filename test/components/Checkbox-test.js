var __path__ = '../../src/js/components/CheckBox';

var expect = require('expect');
var assert = require('assert');

describe('Grommet CheckBox', function() {
  it('loads a basic CheckBox', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var CheckBox = require(__path__);

    var Component = TestUtils.renderIntoDocument(<CheckBox id="sample-check" label="Test me" />);

    var checkBoxInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'check-box');
    var checkBoxLabel = TestUtils.findRenderedDOMComponentWithClass(Component, 'check-box__label');

    expect(checkBoxInstance).toExist();
    expect(checkBoxLabel).toExist();
    assert.equal(checkBoxInstance.getDOMNode().textContent, 'Test me');
  });

  it('loads a custom className CheckBox', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var CheckBox = require(__path__);

    var Component = TestUtils.renderIntoDocument(<CheckBox id="sample-check" className="testing" label="Custom class" />);

    var checkBoxInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'testing');
    var checkBoxLabel = TestUtils.findRenderedDOMComponentWithClass(checkBoxInstance, 'check-box__label');

    expect(checkBoxInstance).toExist();
    expect(checkBoxLabel).toExist();
    assert.equal(checkBoxInstance.getDOMNode().textContent, 'Custom class');
  });
});