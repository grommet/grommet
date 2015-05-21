// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../../src/js/components/index/IndexDonut';

var GrommetTestUtils = require('../../mocks/GrommetTestUtils');
var rewire = require('rewire');
var expect = require('expect');

describe('Grommet IndexDonut', function() {
  it('loads a basic IndexDonut component', function(done) {

    var IndexDonut = rewire(__path__);
    var IndexActions = require('../../mocks/components/IndexActions-mock').successGetAggregateAction();
    IndexDonut.__set__('IndexActions', IndexActions);

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var params = {
      attribute: 'status'
    };

    var Component = TestUtils.renderIntoDocument(<IndexDonut params={params} />);

    IndexActions.getAggregate.completed.listen(function () {
      GrommetTestUtils.componentShouldExist(Component, 'donut');
      GrommetTestUtils.componentShouldExist(Component, 'donut__legend');
      done();
    });
  });

  it('invokes the callback function  whenever a click happens in the series', function(done) {
    var IndexDonut = rewire(__path__);
    var IndexActions = require('../../mocks/components/IndexActions-mock').successGetAggregateAction();
    IndexDonut.__set__('IndexActions', IndexActions);

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var params = {
      attribute: 'status'
    };

    var seriesClicked = false;
    var _onClick = function() {
      seriesClicked = true;

    };

    var Component = TestUtils.renderIntoDocument(<IndexDonut params={params} onClick={_onClick}/>);

    GrommetTestUtils.componentShouldExist(Component, 'donut');
    GrommetTestUtils.componentShouldExist(Component, 'donut__legend');

    IndexActions.getAggregate.completed.listen(function () {
      var donutItemActive = TestUtils.findRenderedDOMComponentWithClass(Component, 'donut__slice--active');

      TestUtils.Simulate.click(donutItemActive.getDOMNode());
      expect(seriesClicked).toBe(true);
      done();
    });
  });

  it('invokes the callback function with query whenever a click happens in the series', function(done) {
    var IndexDonut = rewire(__path__);
    var IndexActions = require('../../mocks/components/IndexActions-mock').successGetAggregateAction();
    IndexDonut.__set__('IndexActions', IndexActions);

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var params = {
      attribute: 'status',
      query: {
        clone: function() {
          return {
            fullText: 'Filter Me',
            replaceAttributeValues: function() {}
          }
        }
      }
    };

    var query;
    var _onClick = function(q) {
      query = q;
    };

    var Component = TestUtils.renderIntoDocument(<IndexDonut params={params} onClick={_onClick}/>);

    GrommetTestUtils.componentShouldExist(Component, 'donut');
    GrommetTestUtils.componentShouldExist(Component, 'donut__legend');

    IndexActions.getAggregate.completed.listen(function () {
      var donutItemActive = TestUtils.findRenderedDOMComponentWithClass(Component, 'donut__slice--active');

      TestUtils.Simulate.click(donutItemActive.getDOMNode());
      expect(query.fullText).toBe('Filter Me');
      done();
    });
  });
});
