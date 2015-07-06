// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../mocks/components/Activity-mock';

var GrommetTestUtils = require('../../../src/utils/test/GrommetTestUtils');
var IndexQuery = require('../../../src/js/utils/IndexQuery');
var expect = require('expect');

describe('Grommet Activity', function() {
  it('loads a basic Activity component', function() {

    var Activity = require(__path__).successActivity();

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Component = TestUtils.renderIntoDocument(<Activity />);

    GrommetTestUtils.componentShouldExist(Component, 'index');
  });

  it('loads Activity component with query', function(done) {

    var Activity = require(__path__).successActivity();

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var query = '';
    var _onQuery = function(data) {
      query = data.text;
    };
    var queryProp = IndexQuery.create('');
    var Component = TestUtils.renderIntoDocument(
      <Activity query={queryProp} onQuery={_onQuery} />
    );

    GrommetTestUtils.componentShouldExist(Component, 'index');
    GrommetTestUtils.componentShouldExist(Component, 'search__input');

    var searchNode = TestUtils.findRenderedDOMComponentWithClass(Component, 'search__input');
    TestUtils.Simulate.change(searchNode, {target: {value: 'New Query'}});

    setTimeout(function() {
      expect(query).toBe('New Query');
      done();
    }, 10);
  });

  /*
  it("updates Activity query when changing parent data", function (done) {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Activity = require(__path__).successActivity();

    var TestParent = React.createFactory(React.createClass({
      getInitialState: function() {
        return { query: IndexQuery.create('testing') };
      },
      render: function() {
        return <Activity query={this.state.query} />;
      }
    }));

    var Component = TestUtils.renderIntoDocument(new TestParent());

    GrommetTestUtils.componentShouldExist(Component, 'index');
    GrommetTestUtils.componentShouldExist(Component, 'search__input');

    var searchNode = TestUtils.findRenderedDOMComponentWithClass(Component, 'search__input');
    expect(searchNode.getDOMNode().value).toBe('testing');

    Component.setState({
      query: IndexQuery.create('new query')
    });

    setTimeout(function() {
      var searchNode = TestUtils.findRenderedDOMComponentWithClass(Component, 'search__input');
      expect(searchNode.getDOMNode().value).toBe('new query');
      done();
    }, 10);
  });
  */
});
