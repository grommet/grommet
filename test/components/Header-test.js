var __path__ = '../../src/js/components/Header';

var expect = require('expect');
var assert = require('assert');

describe('Grommet Header specs', function() {
	it('loads a basic Header', function() {

		var React = require('react/addons');
		var TestUtils = React.addons.TestUtils;
		var Header = require(__path__);
    
    var Component = TestUtils.renderIntoDocument(<Header><h2>Header</h2></Header>);

    var headerInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'header');

    expect(headerInstance).toExist();
    assert.equal(headerInstance.getDOMNode().textContent, 'Header');
	});
});	