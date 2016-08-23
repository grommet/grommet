// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Tabs from '../../src/js/components/Tabs';
import Tab from '../../src/js/components/Tab';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TABS;

function setup(props) {
  return shallow(<Tabs {...props}/>);
}

test('loads a basic Tabs', (t) => {
  t.plan(2);
  const tabsElement = setup();

  if (tabsElement.props().role.indexOf('tablist') > -1) {
    t.pass('Tabs has role');
  } else {
    t.fail('Tabs does not have role');
  }

  if (tabsElement.props().children[0].props.className.indexOf(CLASS_ROOT)
    > -1) {
    t.pass('Tabs has class');
  } else {
    t.fail('Tabs does not have class');
  }
});

test('updates activeIndex state when activeIndex prop changes', (t) => {
  t.plan(4);
  const tabsElement = setup({ activeIndex: 0, responsive: false });

  // test defaultProps state.
  t.equal(tabsElement.state('activeIndex'), 0);
  // test state updating when activeIndex is truthy.
  tabsElement.instance().componentWillReceiveProps({activeIndex: 1});
  t.equal(tabsElement.state('activeIndex'), 1);
  // test state updating when activeIndex is non-integer.
  tabsElement.instance().componentWillReceiveProps({activeIndex: null});
  t.equal(tabsElement.state('activeIndex'), 1);
  // test state updating when activeIndex is falsey.
  tabsElement.instance().componentWillReceiveProps({activeIndex: 0});
  t.equal(tabsElement.state('activeIndex'), 0);
});

test('change activeIndex when through _activateTab function', (t) => {
  t.plan(2);

  const tabsElement = setup({ activeIndex: 0, responsive: false });
  t.equals(tabsElement.state('activeIndex'), 0);
  tabsElement.instance()._activateTab(1);

  t.equals(tabsElement.state('activeIndex'), 1);
});

test('call componentWillReceiveProps', (t) => {
  t.plan(2);
  const spy = sinon.spy(Tabs.prototype, "componentWillReceiveProps");
  const tabsElement = setup({ activeIndex: 0});
  t.equals(spy.calledOnce, false);
  tabsElement.setProps({ activeIndex: 0 });
  tabsElement.setProps({ activeIndex: 2 });
  t.equals(spy.callCount, 2);
});

test('active child tab', (t) => {
  t.plan(4);
  const tabsElement = shallow(
    <Tabs activeIndex={0}>
      <Tab title="Tab Title">
        <h1>test</h1>
      </Tab>
      <Tab title="Tab Title 2">
        <h1>test 2</h1>
      </Tab>
    </Tabs>
  );
  t.equal(tabsElement.find(Tab).first().props().title, 'Tab Title');
  t.equal(tabsElement.find(Tab).first().props().active, true);
  t.equal(tabsElement.find(Tab).last().props().title, 'Tab Title 2');
  t.equal(tabsElement.find(Tab).last().props().active, false);
});

test('activate when calling onRequestForActive', (t) => {
  t.plan(2);
  const tabsElement = shallow(
    <Tabs activeIndex={0}>
      <Tab title="Tab Title">
        <h1>test</h1>
      </Tab>
      <Tab title="Tab Title 2">
        <h1>test 2</h1>
      </Tab>
    </Tabs>
  );

  t.equals(tabsElement.state('activeIndex'), 0);
  tabsElement.find(Tab).last().props().onRequestForActive();
  t.equals(tabsElement.state('activeIndex'), 1);
});
