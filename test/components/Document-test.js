var __path__ = '../../src/js/components/Document';

var expect = require('expect');
var assert = require('assert');

describe('Grommet Document', function() {
  it('loads a basic Document', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var GrommetDocument = require(__path__);

    var Component = TestUtils.renderIntoDocument(<GrommetDocument><h2>Document</h2></GrommetDocument>);

    var documentInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'document');

    expect(documentInstance).toExist();
    assert.equal(documentInstance.getDOMNode().textContent, 'Document');
  });

  it('loads a Document with custom header color', function() {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var GrommetDocument = require(__path__);

    var Component = TestUtils.renderIntoDocument(<GrommetDocument colorIndex="1"><h2>Document with Color 1</h2></GrommetDocument>);

    var documentInstance = TestUtils.findRenderedDOMComponentWithClass(Component, 'header-color-index-1');

    expect(documentInstance).toExist();
    assert.equal(documentInstance.getDOMNode().textContent, 'Document with Color 1');
  });
});