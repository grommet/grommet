// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../../src/js/components/index/IndexMeter');

var GrommetTestUtils = require('../../../src/utils/test/GrommetTestUtils');
var rewire = require('rewire');
var expect = require('expect');

describe('Grommet IndexMeter', function() {
  it('loads a basic IndexMeter component', function(done) {

    var IndexMeter = rewire(__path__);
    var IndexActions = require('../../mocks/components/IndexActions-mock').successGetAggregateAction();
    IndexMeter.__set__('IndexActions', IndexActions);

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var params = {
      attribute: 'status'
    };

    var Component = TestUtils.renderIntoDocument(<IndexMeter params={params} />);

    IndexActions.getAggregate.completed.listen(function () {
      GrommetTestUtils.componentShouldExist(Component, 'meter');
      GrommetTestUtils.componentShouldExist(Component, 'meter__legend');
      done();
    });
  });

  it('invokes the callback function  whenever a click happens in the series', function(done) {
    var IndexMeter = rewire(__path__);
    var IndexActions = require('../../mocks/components/IndexActions-mock').successGetAggregateAction();
    IndexMeter.__set__('IndexActions', IndexActions);

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var params = {
      attribute: 'status'
    };

    var seriesClicked = false;
    var _onClick = function() {
      seriesClicked = true;

    };

    var Component = TestUtils.renderIntoDocument(<IndexMeter params={params} onClick={_onClick}/>);

    GrommetTestUtils.componentShouldExist(Component, 'meter');
    GrommetTestUtils.componentShouldExist(Component, 'meter__legend');

    IndexActions.getAggregate.completed.listen(function () {
      var meterItemActive = TestUtils.findRenderedDOMComponentWithClass(Component, 'meter__bar--active');

      TestUtils.Simulate.click(meterItemActive.getDOMNode());
      expect(seriesClicked).toBe(true);
      done();
    });
  });

  it('invokes the callback function with query whenever a click happens in the series', function(done) {
    var IndexMeter = rewire(__path__);
    var IndexActions = require('../../mocks/components/IndexActions-mock').successGetAggregateAction();
    IndexMeter.__set__('IndexActions', IndexActions);

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var params = {
      attribute: 'status',
      query: {
        clone: function() {
          return {
            fullText: 'Filter Me',
            replaceAttributeValues: function() {}
          };
        }
      }
    };

    var query;
    var _onClick = function(q) {
      query = q;
    };

    var Component = TestUtils.renderIntoDocument(<IndexMeter params={params} onClick={_onClick}/>);

    GrommetTestUtils.componentShouldExist(Component, 'meter');
    GrommetTestUtils.componentShouldExist(Component, 'meter__legend');

    IndexActions.getAggregate.completed.listen(function () {
      var meterItemActive = TestUtils.findRenderedDOMComponentWithClass(Component, 'meter__bar--active');

      TestUtils.Simulate.click(meterItemActive.getDOMNode());
      expect(query.fullText).toBe('Filter Me');
      done();
    });
  });
});
