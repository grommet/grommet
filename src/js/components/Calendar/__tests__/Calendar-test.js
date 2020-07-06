import React from 'react';
import renderer from 'react-test-renderer';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { cleanup, fireEvent, render, act } from '@testing-library/react';
import { FormNextLink, FormPreviousLink } from 'grommet-icons';
import { Box, Button, Calendar, Grommet, Text } from '../..';

const DATE = '2018-01-15T00:00:00-08:00';
const DATES = [
  '2018-01-12T00:00:00-08:00',
  ['2018-01-8T00:00:00-08:00', '2018-01-10T00:00:00-08:00'],
];

describe('Calendar', () => {
  afterEach(cleanup);

  test('Calendar should have no accessbility violations', async () => {
    const { container } = render(
      <Grommet>
        <Calendar date={DATE} animate={false} />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('date', () => {
    // need to set the date to avoid snapshot drift over time
    const component = renderer.create(
      <Grommet>
        <Calendar date={DATE} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('dates', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar dates={DATES} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('daysOfWeek', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar daysOfWeek dates={DATES} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar size="small" date={DATE} animate={false} />
        <Calendar size="medium" date={DATE} animate={false} />
        <Calendar size="large" date={DATE} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('firstDayOfWeek', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar firstDayOfWeek={0} date={DATE} animate={false} />
        <Calendar firstDayOfWeek={1} date={DATE} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('reference', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar reference={DATE} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('header', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar
          date={DATE}
          onSelect={() => {}}
          size="small"
          bounds={['2018-09-08', '2018-12-13']}
          header={({
            date,
            locale,
            onPreviousMonth,
            onNextMonth,
            previousInBound,
            nextInBound,
          }) => (
            <Box direction="row" align="center" justify="between">
              <Button onClick={previousInBound && onPreviousMonth}>
                <Box>
                  <FormPreviousLink />
                </Box>
              </Button>
              <Text size="small">
                <strong>
                  {date.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  })}
                </strong>
              </Text>
              <Button onClick={nextInBound && onNextMonth}>
                <Box>
                  <FormNextLink />
                </Box>
              </Button>
            </Box>
          )}
          animate={false}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('select date', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Calendar date={DATE} onSelect={onSelect} animate={false} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('17'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2018-01-17T/));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select dates', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Calendar dates={DATES} onSelect={onSelect} animate={false} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('17'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2018-01-17T/));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('first day sunday week monday', () => {
    // the first day of the month is on Sunday but the
    // user wants the week to start on Monday
    const { container } = render(
      <Grommet>
        <Calendar
          firstDayOfWeek={1}
          date="2020-03-01T00:00:00-08:00"
          animate={false}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('animate', () => {
    jest.useFakeTimers();
    const { container, getByLabelText } = render(
      <Grommet>
        <Calendar date={DATE} />
      </Grommet>,
    );
    fireEvent.click(getByLabelText('December 2017'));
    act(() => {
      jest.advanceTimersByTime(400);
    });
    fireEvent.click(getByLabelText('January 2018'));
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onEnter', async () => {
    const onSelect = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Calendar
          bounds={['2018-01-14', '2018-01-16']}
          date={DATE}
          onSelect={onSelect}
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    fireEvent.mouseOut(getByText('15'));
    // snapshot shows Jan 15th as being set to active
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onKeyUp', () => {
    const onSelect = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Calendar
          bounds={['2018-01-14', '2018-01-16']}
          date={DATE}
          onSelect={onSelect}
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'ArrowUp',
      keyCode: 38,
      which: 38,
    });
    fireEvent.mouseOut(getByText('15'));
    // snapshot shows Jan 8th as being set to active
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onKeyDown', () => {
    const onSelect = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Calendar
          bounds={['2018-01-14', '2018-01-16']}
          date={DATE}
          onSelect={onSelect}
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'ArrowDown',
      keyCode: 40,
      which: 40,
    });
    fireEvent.mouseOut(getByText('15'));
    // snapshot shows Jan 22th as being set to active
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onKeyLeft', () => {
    const onSelect = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Calendar
          bounds={['2018-01-14', '2018-01-16']}
          date={DATE}
          onSelect={onSelect}
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'ArrowLeft',
      keyCode: 37,
      which: 37,
    });
    fireEvent.mouseOut(getByText('15'));
    // snapshot shows Jan 14th as being set to active
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onKeyRight', () => {
    const onSelect = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Calendar
          bounds={['2018-01-14', '2018-01-16']}
          date={DATE}
          onSelect={onSelect}
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'ArrowRight',
      keyCode: 39,
      which: 39,
    });
    fireEvent.mouseOut(getByText('15'));
    // snapshot shows Jan 16th as being set to active
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select date with range', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <Grommet>
        <Calendar date={DATE} onSelect={onSelect} range animate={false} />
      </Grommet>,
    );
    fireEvent.click(getByText('11'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2018-01-11T/),
        expect.stringMatching(/^2018-01-15T/),
      ],
    ]);
    fireEvent.click(getByText('20'));
    expect(onSelect).toHaveBeenNthCalledWith(2, [
      [
        expect.stringMatching(/^2018-01-11T/),
        expect.stringMatching(/^2018-01-20T/),
      ],
    ]);
  });

  test('select date with range no date set', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <Grommet>
        <Calendar
          reference="2020-07-01T00:00:00-08:00"
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.click(getByText('17'));
    fireEvent.click(getByText('20'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2020-07-17T/),
        expect.stringMatching(/^2020-07-20T/),
      ],
    ]);
  });

  test('select date greater and less than', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          dates={[['2018-01-01T00:00:00-08:00', '2018-01-05T00:00:00-08:00']]}
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    // select date greater than January 1st
    fireEvent.click(getByLabelText('Wed Jan 03 2018'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2018-01-03T/),
        expect.stringMatching(/^2018-01-05T/),
      ],
    ]);
    // select date less than January 3rd
    fireEvent.click(getByLabelText('Mon Jan 01 2018'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2018-01-01T/),
        expect.stringMatching(/^2018-01-05T/),
      ],
    ]);
  });

  test('select date with same start date', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          dates={[['2018-01-01T00:00:00-08:00', '2018-01-03T00:00:00-08:00']]}
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    // selecting same starting day
    fireEvent.click(getByLabelText('Mon Jan 01 2018'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2018-01-03T/));
  });

  test('select date with same date twice', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          reference="2018-01-01T00:00:00-08:00"
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Wed Jan 03 2018'));
    expect(onSelect).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching(/^2018-01-03T/),
    );
    fireEvent.click(getByLabelText('Wed Jan 03 2018'));
    expect(onSelect).toHaveBeenNthCalledWith(2, undefined);
  });

  test('select date with same end date', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          dates={[['2018-01-01T00:00:00-08:00', '2018-01-03T00:00:00-08:00']]}
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    // selecting same ending day
    fireEvent.click(getByLabelText('Wed Jan 03 2018'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2018-01-01T/));
  });

  test('undefined dates', () => {
    const { container } = render(
      <Grommet>
        <Calendar dates={[undefined]} animate={false} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
