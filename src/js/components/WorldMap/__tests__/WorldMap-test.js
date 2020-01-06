import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { WorldMap } from '..';

describe('WorldMap', () => {
  test('default', () => {
    const component = renderer.create(
      <MnetUIBase>
        <WorldMap />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('color', () => {
    const component = renderer.create(
      <MnetUIBase>
        <WorldMap color="brand" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('continents', () => {
    const component = renderer.create(
      <MnetUIBase>
        <WorldMap
          continents={[
            {
              name: 'Africa',
              color: 'accent-1',
              onClick: () => {},
            },
          ]}
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('places', () => {
    const component = renderer.create(
      <MnetUIBase>
        <WorldMap
          places={[
            {
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              color: 'accent-1',
              onClick: () => {},
            },
          ]}
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onSelectPlace', () => {
    const component = renderer.create(
      <MnetUIBase>
        <WorldMap onSelectPlace={() => {}} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fill', () => {
    const component = renderer.create(
      <MnetUIBase>
        <WorldMap fill />
        <WorldMap fill={false} />
        <WorldMap fill="horizontal" />
        <WorldMap fill="vertical" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
