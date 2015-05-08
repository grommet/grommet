var __path__ = '../../src/js/components/FormFields';

var expect = require('expect');
var assert = require('assert');

describe('Grommet FormFields', function() {
  it('loads a basic FormFields', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var FormFields = require(__path__);

    var Component = TestUtils.renderIntoDocument(<FormFields><h2>FormFields</h2></FormFields>);

    var formFieldsInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'form-fields');

    expect(formFieldsInstance).toExist();
    assert.equal(formFieldsInstance.getDOMNode().textContent, 'FormFields');
  });

  it('loads a custom class FormFields', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var FormFields = require(__path__);

    var Component = TestUtils.renderIntoDocument(<FormFields className="testing"><h2>FormFields Custom</h2></FormFields>);

    var formFieldsInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'testing');

    expect(formFieldsInstance).toExist();
    assert.equal(formFieldsInstance.getDOMNode().textContent, 'FormFields Custom');
  });
});