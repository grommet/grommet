// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import renderer from 'react-test-renderer';

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

    // activating the second panel
    const panelHeaders = findAllByType(tree, 'button');
    panelHeaders[1].props.onClick();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has correct activeIndex=0 rendering', () => {
    class TestTab extends Component {
      constructor () {
        super();
        this.state = {
          activeIndex: 0
        };
      }
      render () {
        const { activeIndex } = this.state;
        return (
          <Tabs activeIndex={activeIndex}
            onActive={activeIndex => this.setState({ activeIndex })}>
            <Tab title="Tab Title">
              <h1>test</h1>
            </Tab>
            <Tab title="Tab Title 2">
              <h1>test 2</h1>
            </Tab>
          </Tabs>
        );
      }
    }
    const component = renderer.create(
      <TestTab />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // click the second tab, shouldn't change since we've set activeIndex
    const panelHeaders = findAllByType(tree, 'button');
    panelHeaders[1].props.onClick();

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
