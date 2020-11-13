import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { render, fireEvent } from '@testing-library/react';

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

  test('onSelectPlace and events of places', () => {
    const onClick = jest.fn();
    const onHover = jest.fn();
    const { container, getByTestId } = render(
      <Grommet>
        <WorldMap
          places={[
            {
              'data-testid': 'Sydney',
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              onClick,
              onHover,
            },
          ]}
          data-testid="worldmap"
          onSelectPlace={() => {}}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByTestId('Sydney'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onHover).toHaveBeenCalledTimes(1);

    fireEvent.mouseOut(getByTestId('Sydney'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByTestId('Sydney'));
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.focus(getByTestId('Sydney'));
    fireEvent.blur(getByTestId('Sydney'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('events on continents', () => {
    const onClick = jest.fn();
    const onHover = jest.fn();
    const { container, getByTestId } = render(
      <Grommet>
        <WorldMap
          continents={[
            {
              'data-testid': 'Africa',
              name: 'Africa',
              onClick,
              onHover,
            },
          ]}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByTestId('Africa'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onHover).toHaveBeenCalledTimes(1);

    fireEvent.mouseOut(getByTestId('Africa'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByTestId('Africa'));
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.focus(getByTestId('Africa'));
    fireEvent.blur(getByTestId('Africa'));
    expect(container.firstChild).toMatchSnapshot();
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
