// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../src/js/components/Calendar';

var GrommetTestUtils = require('../mocks/GrommetTestUtils');

var expect = require('expect');

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
    expect(calendarInput.getDOMNode().value).toBe((new Date()).toISOString().slice(0, 10));

  });

  it('selects a previous date from the calendar', function() {

    var Component = GrommetTestUtils.getComponent(__path__);

    GrommetTestUtils.componentShouldExist(Component, 'calendar');
    GrommetTestUtils.componentShouldExist(Component, 'calendar__control');
    GrommetTestUtils.layerShouldNotExist('calendar__layer');

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var calendarIcon = TestUtils.findRenderedDOMComponentWithClass(Component, 'calendar__control');

    TestUtils.Simulate.click(calendarIcon.getDOMNode());

    GrommetTestUtils.layerShouldExist('calendar__layer');

    /**var previousDateNode = GrommetTestUtils.getLayerChildNode('calendar__layer', 'calendar__previous');

    TestUtils.Simulate.click(previousDateNode);

    var dateInThePastNode = GrommetTestUtils.getLayerChildNode('calendar__layer', 'calendar__day');

    TestUtils.Simulate.click(dateInThePastNode);**/
  });

});
