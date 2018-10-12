import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { WorldMap } from '..';

test('WorldMap renders', () => {
  const component = renderer.create(
    <Grommet>
      <WorldMap />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('WorldMap color renders', () => {
  const component = renderer.create(
    <Grommet>
      <WorldMap color='brand' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('WorldMap continents renders', () => {
  const component = renderer.create(
    <Grommet>
      <WorldMap
        continents={[{
          name: 'Africa', color: 'accent-1', onClick: () => {},
        }]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('WorldMap places renders', () => {
  const component = renderer.create(
    <Grommet>
      <WorldMap
        places={[{
          name: 'Sydney',
          location: [-33.8830555556, 151.216666667],
          color: 'accent-1',
          onClick: () => {},
        }]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('WorldMap onSelectPlace renders', () => {
  const component = renderer.create(
    <Grommet>
      <WorldMap onSelectPlace={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
