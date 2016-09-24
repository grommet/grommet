// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Tiles from '../../src/js/components/Tiles';
import Tile from '../../src/js/components/Tile';
import Box from '../../src/js/components/Box';
import Header from '../../src/js/components/Header';
import Footer from '../../src/js/components/Footer';
import Menu from '../../src/js/components/Menu';

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
  it('renders with the Not flush, Centered Example', () => {
    const component = renderer.create(
      <Tiles flush={false}
        justify="center" colorIndex="light-2" full="horizontal">
        <Tile align="start" colorIndex="light-1">
          <Header tag="h4" size="small" pad={{"horizontal": "small"}}>
            <strong>
              Tile 1
            </strong>
          </Header>
          <Box pad="small">
            <p>
              Tile summary content.
            </p>
          </Box>
          <Footer justify="between">
            <span />
            <Menu inline={false}
              dropAlign={{"bottom": "bottom", "right": "right"}}>
              <a>
                action 1
              </a>
              <a>
                action 2
              </a>
              <a>
                action 3
              </a>
            </Menu>
          </Footer>
        </Tile>
        <Tile align="start" colorIndex="light-1">
          <Header tag="h4" size="small" pad={{"horizontal": "small"}}>
            <strong>
              Tile 2
            </strong>
          </Header>
          <Box pad="small">
            <p>
              Tile summary content.
            </p>
          </Box>
          <Footer justify="between">
            <span />
            <Menu inline={false}
              dropAlign={{"bottom": "bottom", "right": "right"}}>
              <a>
                action 1
              </a>
              <a>
                action 2
              </a>
              <a>
                action 3
              </a>
            </Menu>
          </Footer>
        </Tile>
      </Tiles>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders with the Fill, Flush Example.', () => {
    const component = renderer.create(
      <Tiles fill={true}>
        <Tile align="start" colorIndex="neutral-1">
          <Header tag="h4" size="small" pad={{"horizontal": "small"}}>
            <strong>
              Tile 1
            </strong>
          </Header>
          <Box pad="small">
            <p>
              Tile summary content.
            </p>
          </Box>
        </Tile>
        <Tile align="start" colorIndex="neutral-2">
          <Header tag="h4" size="small" pad={{"horizontal": "small"}}>
            <strong>
              Tile 2
            </strong>
          </Header>
          <Box pad="small">
            <p>
              Tile summary content.
            </p>
          </Box>
        </Tile>
        <Tile align="start" colorIndex="neutral-3">
          <Header tag="h4" size="small" pad={{"horizontal": "small"}}>
            <strong>
              Tile 3
            </strong>
          </Header>
          <Box pad="small">
            <p>
              Tile summary content.
            </p>
          </Box>
        </Tile>
      </Tiles>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
