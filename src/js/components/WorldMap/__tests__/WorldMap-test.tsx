import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Text } from '../../Text';
import { WorldMap } from '..';

describe('WorldMap', () => {
  test('default', () => {
    const { container } = render(
      <Grommet>
        <WorldMap />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('color', () => {
    const { container } = render(
      <Grommet>
        <WorldMap color="brand" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('continents', () => {
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });

  test('places', () => {
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onSelectPlace and events of places', () => {
    const onClick = jest.fn();
    const onHover = jest.fn();
    const { container, getByLabelText } = render(
      <Grommet>
        <WorldMap
          places={[
            {
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              onClick,
              onHover,
            },
          ]}
          onSelectPlace={() => {}}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByLabelText('Sydney'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onHover).toHaveBeenCalledTimes(1);

    fireEvent.mouseOut(getByLabelText('Sydney'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByLabelText('Sydney'));
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.focus(getByLabelText('Sydney'));
    fireEvent.blur(getByLabelText('Sydney'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('events on continents', () => {
    const onClick = jest.fn();
    const onHover = jest.fn();
    const { container, getByLabelText } = render(
      <Grommet>
        <WorldMap
          continents={[
            {
              name: 'Africa',
              onClick,
              onHover,
            },
          ]}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByLabelText('Africa'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onHover).toHaveBeenCalledTimes(1);

    fireEvent.mouseOut(getByLabelText('Africa'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByLabelText('Africa'));
    expect(onClick).toHaveBeenCalledTimes(1);

    fireEvent.focus(getByLabelText('Africa'));
    fireEvent.blur(getByLabelText('Africa'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fill', () => {
    const { container } = render(
      <Grommet>
        <WorldMap fill />
        <WorldMap fill={false} />
        <WorldMap fill="horizontal" />
        <WorldMap fill="vertical" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
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

  test('places content', () => {
    const { container } = render(
      <Grommet>
        <WorldMap
          places={[
            {
              name: 'Sydney',
              location: [-33.8830555556, 151.216666667],
              color: 'accent-1',
              content: <Text>Sydney</Text>,
              dropProps: {
                align: { left: 'right' },
                elevation: 'medium',
                margin: { left: 'small' },
              },
            },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
