// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Animate from '../../src/js/components/Animate';
import Paragraph from '../../src/js/components/Paragraph';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Animate', () => {
  it('renders with the correct default options', () => {
    const component = renderer.create(
      <Animate enter={{ animation: "fade", duration: 1000 }}
        leave={{ animation: "fade", duration: 1000 }}>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Paragraph>
      </Animate>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with a component set as a span', () => {
    const component = renderer.create(
      <Animate enter={{ animation: "fade", duration: 1000 }}
        leave={{ animation: "fade", duration: 1000 }} component="span">
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Paragraph>
      </Animate>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with visibility set to true', () => {
    const component = renderer.create(
      <Animate enter={{ animation: "fade", duration: 1000 }}
        leave={{ animation: "fade", duration: 1000 }} visibility={true}>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Paragraph>
      </Animate>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with keep set to true', () => {
    const component = renderer.create(
      <Animate enter={{ animation: "fade", duration: 1000 }}
        leave={{ animation: "fade", duration: 1000 }} keep={true}>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Paragraph>
      </Animate>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
