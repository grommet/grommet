import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { RangeSelector } from '..';

describe('RangeSelector', () => {
  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <RangeSelector values={[20, 30]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('color', () => {
    const component = renderer.create(
      <Grommet>
        <RangeSelector color="accent-1" values={[20, 30]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('direction', () => {
    const component = renderer.create(
      <Grommet>
        <RangeSelector direction="horizontal" values={[20, 30]} />
        <RangeSelector direction="vertical" values={[20, 30]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('invert', () => {
    const component = renderer.create(
      <Grommet>
        <RangeSelector invert values={[20, 30]} />
        <RangeSelector invert={false} values={[20, 30]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('max', () => {
    const component = renderer.create(
      <Grommet>
        <RangeSelector max={50} values={[20, 30]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('min', () => {
    const component = renderer.create(
      <Grommet>
        <RangeSelector min={10} values={[20, 30]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('opacity', () => {
    const component = renderer.create(
      <Grommet>
        {['weak', 'medium', 'strong'].map(opacity => (
          <RangeSelector key={opacity} opacity={opacity} values={[20, 30]} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('round', () => {
    const component = renderer.create(
      <Grommet>
        {['xsmall', 'small', 'medium', 'large', 'full'].map(round => (
          <RangeSelector key={round} round={round} values={[20, 30]} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        {[
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'full',
        ].map(size => (
          <RangeSelector key={size} size={size} values={[20, 30]} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('step renders correct values', () => {
    let values;
    const setValues = newValues => {
      values = newValues;
    };
    const onChange = jest.fn(nextValues => setValues(nextValues));
    const { container, getByLabelText } = render(
      <Grommet>
        <RangeSelector values={[0, 100]} step={3} onChange={onChange} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const lowerControl = getByLabelText('Lower Bounds');
    fireEvent.mouseDown(lowerControl);
    // fireEvent.mouseDown(lowerControl);
    fireEvent.mouseMove(document, { clientX: 31, clientY: 20 });
    fireEvent.mouseUp(document);
    expect(onChange).toBeCalled();
    expect(values).toStrictEqual([33, 100]);

    const upperControl = getByLabelText('Upper Bounds');
    fireEvent.mouseDown(upperControl);
    fireEvent.mouseMove(document, { clientX: 80, clientY: 15 });
    fireEvent.mouseUp(document);
    expect(onChange).toBeCalled();
    expect(values).toStrictEqual([0, 81]);
  });

  test('handle keyboard', () => {
    const onChange = jest.fn();
    const { container, getByLabelText } = render(
      <Grommet>
        <RangeSelector values={[20, 30]} onChange={onChange} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const lowerControl = getByLabelText('Lower Bounds');
    fireEvent.keyDown(lowerControl, { key: 'Left', keyCode: 37 });
    expect(onChange).toBeCalled();

    fireEvent.keyDown(lowerControl, { key: 'Right', keyCode: 39 });
    expect(onChange).toBeCalled();

    const upperControl = getByLabelText('Upper Bounds');
    fireEvent.keyDown(upperControl, { key: 'Right', keyCode: 39 });
    expect(onChange).toBeCalled();

    fireEvent.keyDown(upperControl, { key: 'Left', keyCode: 37 });
    expect(onChange).toBeCalled();
  });

  test('handle mouse', () => {
    const onChange = jest.fn();
    const { container, getByLabelText } = render(
      <Grommet>
        <RangeSelector values={[20, 30]} onChange={onChange} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(container.firstChild.firstChild, {
      clientX: 0,
      clientY: 0,
    });
    expect(onChange).toBeCalled();

    const lowerControl = getByLabelText('Lower Bounds');
    fireEvent.mouseDown(lowerControl);
    fireEvent.mouseMove(document, { clientX: 0, clientY: 0 });
    fireEvent.mouseUp(document);
    expect(onChange).toBeCalled();

    const upperControl = getByLabelText('Upper Bounds');
    fireEvent.mouseDown(upperControl);
    fireEvent.mouseMove(document, { clientX: 0, clientY: 0 });
    fireEvent.mouseUp(document);
    expect(onChange).toBeCalled();
  });
});
