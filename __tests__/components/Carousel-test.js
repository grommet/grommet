// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react-test-renderer';

import Carousel from '../../src/js/components/Carousel';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Carousel', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Carousel>
        <img src="/img/carousel-1.png" />
        <img src="/img/carousel-2.png" />
      </Carousel>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders class name properties', () => {
    const component = renderer.create(
      <Carousel className="test">
        <img src="/img/carousel-1.png" />
        <img src="/img/carousel-2.png" />
      </Carousel>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders microdata properties', () => {
    const component = renderer.create(
      <Carousel itemScope={true} itemType="http://schema.org/Article"
        itemProp="test">
        <img src="/img/carousel-1.png" />
        <img src="/img/carousel-2.png" />
      </Carousel>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
