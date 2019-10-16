import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { WorldMap } from '..';

describe('WorldMap', () => {
  test('default', () => {
    const component = renderer.create(
      <Grommet>
        <WorldMap />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('color', () => {
    const component = renderer.create(
      <Grommet>
        <WorldMap color="brand" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('continents', () => {
    const component = renderer.create(
      <Grommet>
        <WorldMap
          continents={[
            {
              name: 'Africa',
              color: 'accent-1',
              onClick: () => {},
            },
          ]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('places', () => {
    const component = renderer.create(
      <Grommet>
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
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onSelectPlace', () => {
    const component = renderer.create(
      <Grommet>
        <WorldMap onSelectPlace={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fill', () => {
    const component = renderer.create(
      <Grommet>
        <WorldMap fill />
        <WorldMap fill={false} />
        <WorldMap fill="horizontal" />
        <WorldMap fill="vertical" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
