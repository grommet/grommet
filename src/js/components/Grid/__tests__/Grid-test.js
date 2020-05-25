import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { Grid } from '..';

describe('Grid', () => {
  test('renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('a11yTitle renders', () => {
    const { container, getByLabelText } = render(
      <MnetUIBase>
        <Grid a11yTitle="My Grid" />
      </MnetUIBase>,
    );
    const gridWithLabel = getByLabelText('My Grid');
    expect(gridWithLabel).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('rows renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid rows={['small', 'large', 'medium']} />
        <Grid rows="small" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('columns renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid columns={['1/2', '2/4']} />
        <Grid columns={['1/3', '2/3']} />
        <Grid columns={['1/4', '3/4']} />
        <Grid columns="small" />
        <Grid columns={{ count: 'fit', size: 'small' }} />
        <Grid columns={{ count: 'fill', size: ['small', 'medium'] }} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('areas renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid
          rows={['xxsmall', 'medium', 'xsmall']}
          columns={['3/4', '1/4']}
          areas={[
            { name: 'header', start: [0, 0], end: [0, 1] },
            { name: 'main', start: [1, 0], end: [1, 0] },
            { name: 'sidebar', start: [1, 1], end: [1, 1] },
            { name: 'footer', start: [2, 0], end: [2, 1] },
          ]}
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('areas renders when given an array of string arrays', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid
          rows={['xxsmall', 'medium', 'xsmall']}
          columns={['3/4', '1/4']}
          areas={[
            ['header', 'header'],
            ['sidebar', 'main'],
            ['footer', 'footer'],
          ]}
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('justify renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid justify="start" />
        <Grid justify="center" />
        <Grid justify="end" />
        <Grid justify="stretch" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('align renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid align="start" />
        <Grid align="center" />
        <Grid align="end" />
        <Grid align="stretch" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('justifyContent renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid justifyContent="start" />
        <Grid justifyContent="center" />
        <Grid justifyContent="between" />
        <Grid justifyContent="around" />
        <Grid justifyContent="end" />
        <Grid justifyContent="stretch" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('alignContent renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid alignContent="start" />
        <Grid alignContent="center" />
        <Grid alignContent="between" />
        <Grid alignContent="around" />
        <Grid alignContent="end" />
        <Grid alignContent="stretch" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('gap renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid gap="small" />
        <Grid gap="medium" />
        <Grid gap="large" />
        <Grid gap={{ row: 'small' }} />
        <Grid gap={{ row: 'medium' }} />
        <Grid gap={{ row: 'large' }} />
        <Grid gap={{ column: 'small' }} />
        <Grid gap={{ column: 'medium' }} />
        <Grid gap={{ column: 'large' }} />
        <Grid gap={{ row: 'small', column: 'medium' }} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fill renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid fill />
        <Grid fill={false} />
        <Grid fill="horizontal" />
        <Grid fill="vertical" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('responsive', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid responsive />
        <Grid responsive={false} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('as renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid as="article" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('proxies tag', () => {
    const tagComponent = renderer.create(
      <MnetUIBase>
        <Grid tag="article" />
      </MnetUIBase>,
    );
    const asComponent = renderer.create(
      <MnetUIBase>
        <Grid as="article" />
      </MnetUIBase>,
    );
    expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
  });

  test('pad', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Grid pad="small" />
        <Grid pad="medium" />
        <Grid pad="large" />
        <Grid pad={{ horizontal: 'small' }} />
        <Grid pad={{ vertical: 'small' }} />
        <Grid pad={{ bottom: 'small' }} />
        <Grid pad={{ left: 'small' }} />
        <Grid pad={{ right: 'small' }} />
        <Grid pad={{ start: 'small' }} />
        <Grid pad={{ end: 'small' }} />
        <Grid pad={{ top: 'small' }} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
