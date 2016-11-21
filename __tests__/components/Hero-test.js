// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Hero from '../../src/js/components/Hero';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Hero', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Hero>
        <h1>
          This is a Hero
        </h1>
      </Hero>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('transfers random props', () => {
    const component = renderer.create(
      <Hero data-flavor="coconut">
        <h1>
          This is a Hero
        </h1>
      </Hero>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
