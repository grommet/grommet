// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var __path__ = path.join(__dirname, '../../src/js/components/Calendar');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

var expect = require('expect');
var today = (new Date()).toISOString().slice(0, 10);

describe('Grommet Calendar', function() {
  beforeEach(function() {
    var elements = document.body.getElementsByClassName('calendar__layer');

    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  });

  it('loads a basic Calendar', function() {
    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'calendar');
    GrommetTestUtils.componentShouldExist(Component, 'calendar__input');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var calendarInput = TestUtils.findRenderedDOMComponentWithClass(Component, 'calendar__input');
    expect(calendarInput.getDOMNode().value).toBe(today);

  });

  it('selects a date from the past', function(done) {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Calendar = require(__path__);

    var TestParent = React.createFactory(React.createClass({
      getInitialState: function () {
        return {
          value: today
        };
      },

      _onChange: function (date) {
        expect(new Date(date).getTime()).toBeLessThan(new Date(today).getTime());
        this.setState({value: date});
        done();
      },

      render: function() {
        return (
          <Calendar onChange={this._onChange} value={this.state.value} />
        );
      }
    }));

    var Component = TestUtils.renderIntoDocument(new TestParent());

    GrommetTestUtils.componentShouldExist(Component, 'calendar');
    GrommetTestUtils.componentShouldExist(Component, 'calendar__control');
    GrommetTestUtils.layerShouldNotExist('calendar__drop');

    var calendarIcon = TestUtils.findRenderedDOMComponentWithClass(Component, 'calendar__control');

    TestUtils.Simulate.click(calendarIcon.getDOMNode());

    GrommetTestUtils.layerShouldExist('calendar__drop');

    var previousDateNode = GrommetTestUtils.getLayerChildNode('calendar__drop', 'calendar__previous');

    TestUtils.Simulate.click(previousDateNode);

    var dateInThePastNode = GrommetTestUtils.getLayerChildNode('calendar__drop', 'calendar__day');

    TestUtils.Simulate.click(dateInThePastNode);

  });

  it('selects a date from the future', function(done) {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Calendar = require(__path__);

    var TestParent = React.createFactory(React.createClass({
      getInitialState: function () {
        return {
          value: today
        };
      },

      _onChange: function (date) {
        expect(new Date(date).getTime()).toBeMoreThan(new Date(today).getTime());
        this.setState({value: date});

        done();
      },

      render: function() {
        return (
          <Calendar className="specialCalendar" onChange={this._onChange} value={this.state.value} />
        );
      }
    }));

    var Component = TestUtils.renderIntoDocument(new TestParent());

    GrommetTestUtils.componentShouldExist(Component, 'calendar');
    GrommetTestUtils.componentShouldExist(Component, 'calendar__control');
    GrommetTestUtils.layerShouldNotExist('calendar__drop');

    var calendarIcon = TestUtils.findRenderedDOMComponentWithClass(Component, 'calendar__control');

    TestUtils.Simulate.click(calendarIcon.getDOMNode());

    GrommetTestUtils.layerShouldExist('calendar__drop');

    var nextDateNode = GrommetTestUtils.getLayerChildNode('calendar__drop', 'calendar__next');

    TestUtils.Simulate.click(nextDateNode);
    TestUtils.Simulate.click(nextDateNode);
    TestUtils.Simulate.click(nextDateNode);

    var dateInTheFuture = GrommetTestUtils.getLayerChildNode('calendar__drop', 'calendar__day');

    TestUtils.Simulate.click(dateInTheFuture);

    var calendar = TestUtils.findRenderedDOMComponentWithClass(Component, 'calendar');
    React.unmountComponentAtNode(calendar.getDOMNode().parentNode);

  });

  it('enters a date manually', function(done) {

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Calendar = require(__path__);

    var TestParent = React.createFactory(React.createClass({
      getInitialState: function () {
        return {
          value: today
        };
      },

      _onChange: function (date) {
        expect(new Date(date).getTime()).toBeMoreThan(new Date(today).getTime());
        this.setState({value: date});

        done();
      },

      render: function() {
        return (
          <Calendar onChange={this._onChange} value={this.state.value} />
        );
      }
    }));

    var Component = TestUtils.renderIntoDocument(new TestParent());

    GrommetTestUtils.componentShouldExist(Component, 'calendar');
    GrommetTestUtils.componentShouldExist(Component, 'calendar__input');

    var inputNode = TestUtils.findRenderedDOMComponentWithClass(Component, 'calendar__input');
    TestUtils.Simulate.change(inputNode, { target: { value: '2015-12-20' }});

  });
});
