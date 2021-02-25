import React from 'react';
import renderer from 'react-test-renderer';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { cleanup, fireEvent, render, act } from '@testing-library/react';
import { FormNextLink, FormPreviousLink } from 'grommet-icons';
import { Box, Button, Calendar, Grommet, Text } from '../..';

const DATE = '2020-01-15T00:00:00-08:00';
const DATES = [
  '2020-01-12T00:00:00-08:00',
  ['2020-01-08T00:00:00-08:00', '2020-01-10T00:00:00-08:00'],
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
    component.unmount();
  });

  test('disabled', () => {
    // need to set the date to avoid snapshot drift over time
    // have disabled date be distinct from selected date
    const disabledDate = new Date(DATE);
    disabledDate.setDate(disabledDate.getDate() + 1);
    const component = renderer.create(
      <Grommet>
        <Calendar date={DATE} disabled={[disabledDate.toDateString()]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('dates', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar dates={DATES} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('daysOfWeek', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar daysOfWeek dates={DATES} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
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
    component.unmount();
  });

  test('fill', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar fill date={DATE} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
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
    component.unmount();
  });

  test('reference', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar reference={DATE} animate={false} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('showAdjacentDays', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar date={DATE} animate={false} />
        <Calendar date={DATE} animate={false} showAdjacentDays={false} />
        <Calendar date={DATE} animate={false} showAdjacentDays="trim" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
  });

  test('header', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar
          date={DATE}
          onSelect={() => {}}
          size="small"
          bounds={['2020-09-08', '2020-12-13']}
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
    component.unmount();
  });

  test('children', () => {
    const component = renderer.create(
      <Grommet>
        <Calendar date={DATE} fill animate={false}>
          {({ day }) => <Box>{day}</Box>}
        </Calendar>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    component.unmount();
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
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-17T/));
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
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-17T/));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('first day sunday week monday', () => {
    // When the first day of the month is Sunday,
    // and the request of firstDayOfWeek
    // is Monday, we are verifing we are not missing a week, issue 3253.
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

  test('change months', () => {
    jest.useFakeTimers();
    const { container, getByLabelText } = render(
      <Grommet>
        <Calendar date={DATE} />
      </Grommet>,
    );
    // Change the Calendar from January to December
    fireEvent.click(getByLabelText('December 2019'));
    act(() => {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
    // Change the Calendar back to January
    fireEvent.click(getByLabelText('January 2020'));
    act(() => {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select date with range', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <Grommet>
        <Calendar date={DATE} onSelect={onSelect} range animate={false} />
      </Grommet>,
    );
    // expect to be selecting end date of range, because date serves
    // as start. since selected date is < date we should set it as start
    fireEvent.click(getByText('11'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/2020-01-11T/));
    fireEvent.click(getByText('20'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2020-01-11T/),
        expect.stringMatching(/^2020-01-20T/),
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
          dates={[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]}
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    // select date greater than January 1st
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2020-01-03T/),
        expect.stringMatching(/^2020-01-05T/),
      ],
    ]);
    // select date less than January 3rd
    // activeDate is end, since this is before the start
    // date we should update the date
    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/2020-01-01T/));
  });

  test('select date with same start date', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          dates={[['2020-01-01T00:00:00-08:00', '2020-01-03T00:00:00-08:00']]}
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    // selecting same starting day
    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-03T/));
  });

  test('select date with same date twice', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          reference="2020-01-01T00:00:00-08:00"
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-03T/));
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toBeCalledWith(undefined);
  });

  test('select date with same end date', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          dates={[['2020-01-01T00:00:00-08:00', '2020-01-03T00:00:00-08:00']]}
          onSelect={onSelect}
          range
          animate={false}
        />
      </Grommet>,
    );
    // selecting same ending day
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-01T/));
  });

  test('range as array', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          dates={[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]}
          onSelect={onSelect}
          range="array"
          animate={false}
        />
      </Grommet>,
    );
    // select date greater than January 1st
    // activeDate by default is start
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2020-01-03T/),
        expect.stringMatching(/^2020-01-05T/),
      ],
    ]);
    // select date less than January 3rd
    // activeDate is end, since this is before the start
    // date we should update the date
    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
    expect(onSelect).toBeCalledWith([
      [expect.stringMatching(/^2020-01-01T/), undefined],
    ]);

    // should select end date again
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2020-01-01T/),
        expect.stringMatching(/^2020-01-03T/),
      ],
    ]);

    // should select start date, if great than end date, clear end date
    fireEvent.click(getByLabelText('Sun Jan 05 2020'));
    expect(onSelect).toBeCalledWith([
      [expect.stringMatching(/^2020-01-05T/), undefined],
    ]);
  });

  test('activeDate start', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          activeDate="start"
          dates={[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]}
          onSelect={onSelect}
          range="array"
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2020-01-03T/),
        expect.stringMatching(/^2020-01-05T/),
      ],
    ]);
  });

  test('activeDate end', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          activeDate="end"
          dates={[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]}
          onSelect={onSelect}
          range="array"
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toBeCalledWith([
      [
        expect.stringMatching(/^2020-01-01T/),
        expect.stringMatching(/^2020-01-03T/),
      ],
    ]);
  });
});

describe('Calendar Keyboard events', () => {
  let onSelect;
  let App;

  beforeEach(() => {
    onSelect = jest.fn();
    App = () => (
      <Grommet>
        <Calendar
          bounds={['2020-01-01', '2020-01-31']}
          date={DATE}
          onSelect={onSelect}
          animate={false}
        />
      </Grommet>
    );
  });

  afterEach(cleanup);

  test('onEnter', async () => {
    const { getByText } = render(<App />);
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    fireEvent.mouseOut(getByText('15'));
    // Jan 15th is set to active
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-15T/));
  });

  test('onKeyUp', () => {
    const { getByText } = render(<App />);
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'ArrowUp',
      keyCode: 38,
      which: 38,
    });
    // press enter to change date to active
    fireEvent.keyDown(getByText('15'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    // Jan 8th is set to active
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-08T/));
  });

  test('onKeyDown', () => {
    const { getByText } = render(<App />);
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'ArrowDown',
      keyCode: 40,
      which: 40,
    });
    // press enter to change date to active
    fireEvent.keyDown(getByText('15'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    // Jan 22th is set to active
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-22T/));
  });

  test('onKeyLeft', () => {
    const { getByText } = render(<App />);
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'ArrowLeft',
      keyCode: 37,
      which: 37,
    });
    // press enter to change date to active
    fireEvent.keyDown(getByText('15'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    // Jan 14th is set to active
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-14T/));
  });

  test('onKeyRight', () => {
    const { getByText } = render(<App />);
    fireEvent.mouseOver(getByText('15'));
    fireEvent.click(getByText('15'));
    fireEvent.keyDown(getByText('15'), {
      key: 'ArrowRight',
      keyCode: 39,
      which: 39,
    });
    // press enter to change date to active
    fireEvent.keyDown(getByText('15'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    // Jan 16th is set to active
    expect(onSelect).toBeCalledWith(expect.stringMatching(/^2020-01-16T/));
  });
});
