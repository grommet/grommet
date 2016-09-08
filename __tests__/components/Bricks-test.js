// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Brick from '../../src/js/components/Brick';
import Bricks from '../../src/js/components/Bricks';
import FakeIcon from '../mocks/FakeIcon';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Bricks', () => {
  it('renders with the correct default options', () => {
    const component = renderer.create(
      <Bricks>
        <Brick label="First" />
        <Brick label="Second" />
        <Brick label="Third" />
        <Brick label="Fourth" />
      </Bricks>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when setting the type of Brick children', () => {
    const component = renderer.create(
      <Bricks>
        <Brick label="First" type="small" />
        <Brick label="Second" type="large" />
        <Brick label="Third" type="wide" />
        <Brick label="Fourth" type="tall" />
      </Bricks>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly when setting the colorIndex of Brick children', () => {
    const component = renderer.create(
      <Bricks>
        <Brick label="First" colorIndex="neutral-1" />
        <Brick label="Second" colorIndex="neutral-2" />
        <Brick label="Third" colorIndex="neutral-3" />
        <Brick label="Fourth" colorIndex="neutral-4" />
      </Bricks>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a complex example with multiple custon props', () => {
    const component = renderer.create(
      <Bricks>
        <Brick colorIndex="neutral-1" type="large"
          href="http://www.grommet.io/" texture="/img/carousel-1.png" />
        <Brick label="Second" colorIndex="neutral-2" type="tall" />
        <Brick label="Third" colorIndex="neutral-3">
          <FakeIcon />
        </Brick>
        <Brick label="Fourth" colorIndex="neutral-4" />
      </Bricks>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
