import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
import 'jest-axe/extend-expect';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { WorldMap } from '..';

describe('WorldMap', () => {
  afterEach(cleanup);

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

  test('onClick handlers', () => {
    const onPlaceClick = jest.fn();
    const onContinentClick = jest.fn();

    const { getByLabelText } = render(
      <Grommet>
        <WorldMap
          places={[
            {
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              color: 'accent-1',
              onClick: onPlaceClick,
            },
          ]}
          continents={[
            {
              name: 'Africa',
              color: 'accent-1',
              onClick: onContinentClick,
            },
          ]}
        />
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Sydney'));
    expect(onPlaceClick).toHaveBeenCalledTimes(1);
    expect(onPlaceClick).toHaveBeenCalledWith('Sydney');

    fireEvent.click(getByLabelText('Africa'));
    expect(onContinentClick).toHaveBeenCalledTimes(1);
    expect(onContinentClick).toHaveBeenCalledWith('Africa');
  });

  test('onHover handlers', () => {
    const onPlaceHover = jest.fn();
    const onContinentHover = jest.fn();

    const { getByLabelText } = render(
      <Grommet>
        <WorldMap
          places={[
            {
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              color: 'accent-1',
              onHover: onPlaceHover,
            },
          ]}
          continents={[
            {
              name: 'Africa',
              color: 'accent-1',
              onHover: onContinentHover,
            },
          ]}
        />
      </Grommet>,
    );
    fireEvent.mouseEnter(getByLabelText('Sydney'));
    expect(onPlaceHover).toHaveBeenCalledTimes(1);
    expect(onPlaceHover).toHaveBeenCalledWith(true);
    expect(onPlaceHover).not.toHaveBeenCalledWith(false);

    fireEvent.mouseLeave(getByLabelText('Sydney'));
    expect(onPlaceHover).toHaveBeenCalledTimes(2);
    expect(onPlaceHover).toHaveBeenCalledWith(false);

    fireEvent.mouseEnter(getByLabelText('Africa'));
    expect(onContinentHover).toHaveBeenCalledTimes(1);
    expect(onContinentHover).toHaveBeenCalledWith(true);
    expect(onContinentHover).not.toHaveBeenCalledWith(false);

    fireEvent.mouseLeave(getByLabelText('Africa'));
    expect(onContinentHover).toHaveBeenCalledTimes(2);
    expect(onContinentHover).toHaveBeenCalledWith(false);
  });
});
