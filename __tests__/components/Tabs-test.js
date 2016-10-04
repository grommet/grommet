// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Tabs from '../../src/js/components/Tabs';
import Tab from '../../src/js/components/Tab';

import { findAllByType } from '../utils/renderer-finder';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Tabs', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Tabs>
        <Tab title="Tab Title">
          <h1>test</h1>
        </Tab>
        <Tab title="Tab Title 2">
          <h1>test 2</h1>
        </Tab>
      </Tabs>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('has correct initialIndex=0 rendering', () => {
    const component = renderer.create(
      <Tabs activeIndex={0}>
        <Tab title="Tab Title">
          <h1>test</h1>
        </Tab>
        <Tab title="Tab Title 2">
          <h1>test 2</h1>
        </Tab>
      </Tabs>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // activating the second panel
    const panelHeaders = findAllByType(tree, 'button');
    panelHeaders[1].props.onClick();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
