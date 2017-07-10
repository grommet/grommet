// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Tiles from '../../src/js/components/Tiles';
import Tile from '../../src/js/components/Tile';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Tiles', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Tiles>
        <Tile>
          First
        </Tile>
        <Tile>
          Second
        </Tile>
        <Tile>
          Third
        </Tile>
      </Tiles>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
