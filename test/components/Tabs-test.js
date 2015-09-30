// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var path = require('path');
var expect = require('expect');
var React = require('react/addons');

var __path__ = path.join(__dirname, '../../src/js/components/Tabs');
var Tab = require('../../src/js/components/Tab');

var GrommetTestUtils = require('../../src/utils/test/GrommetTestUtils');

describe('Grommet Tabs', function() {
  it('loads a basic Tabs', function() {

    var testTabs = [
      <Tab title="Title">
        Hello
      </Tab>
    ];

    var Component = GrommetTestUtils.getComponent(__path__, testTabs);

    GrommetTestUtils.componentShouldExist(Component, 'tabs');
    GrommetTestUtils.componentShouldExist(Component, 'tabs__content', 'Hello');
    GrommetTestUtils.componentShouldExist(Component, 'tab__label', 'Title');
  });

  it('loads a custom initialIndex', function() {

    var testTabs = [
      <Tab title="Title 1">
        Hello 1
      </Tab>,
      <Tab title="Title 2">
        Hello 2
      </Tab>
    ];

    var Component = GrommetTestUtils.getComponent(__path__, testTabs, {
      initialIndex: 1
    });

    GrommetTestUtils.componentShouldExist(Component, 'tabs');
    GrommetTestUtils.componentShouldExist(Component, 'tabs__content', 'Hello 2');
    GrommetTestUtils.componentShouldExist(Component, 'tab--active', 'Title 2');
  });

  it('changes current tab', function() {

    var testTabs = [
      <Tab title="Title 1">
        Hello 1
      </Tab>,
      <Tab title="Title 2">
        Hello 2
      </Tab>
    ];

    var Component = GrommetTestUtils.getComponent(__path__, testTabs);

    GrommetTestUtils.componentShouldExist(Component, 'tabs');
    GrommetTestUtils.componentShouldExist(Component, 'tabs__content', 'Hello 1');
    GrommetTestUtils.componentShouldExist(Component, 'tab--active', 'Title 1');

    var TestUtils = React.addons.TestUtils;

    var tabs = TestUtils.scryRenderedDOMComponentsWithClass(Component, 'tab__link');

    expect(tabs.length).toBe(2);

    TestUtils.Simulate.click(tabs[1].getDOMNode());

    GrommetTestUtils.componentShouldExist(Component, 'tabs');
    GrommetTestUtils.componentShouldExist(Component, 'tabs__content', 'Hello 2');
    GrommetTestUtils.componentShouldExist(Component, 'tab--active', 'Title 2');
  });

});
