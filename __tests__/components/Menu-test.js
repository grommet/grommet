// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Menu from '../../src/js/components/Menu';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Menu', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Menu>
        <a href="#" className="active">
          First
        </a>
        <a href="#">
          Second
        </a>
        <a href="#">
          Third
        </a>
      </Menu>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
