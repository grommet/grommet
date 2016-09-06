// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';

import Article from '../../src/js/components/Article';
import Heading from '../../src/js/components/Heading';
import Section from '../../src/js/components/Section';

// needed because this:
// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('Article', () => {
  it('has correct default options', () => {
    const component = renderer.create(
      <Article>
        <Heading>
          Title
        </Heading>
        <Section>
          <h2>
            Heading
          </h2>
          <p>
            Lorem ipsum ...
          </p>
        </Section>
      </Article>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
