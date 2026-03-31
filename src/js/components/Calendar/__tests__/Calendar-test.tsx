import React from 'react';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { axe } from 'jest-axe';
import { fireEvent, render, act, screen } from '@testing-library/react';
import { FormNextLink, FormPreviousLink } from 'grommet-icons';
import { Box, Button, Calendar, Grommet, Text, CalendarProps } from '../..';

const DATE = '2020-01-15T00:00:00-08:00';
const DATES = [
  '2020-01-12T00:00:00-08:00',
  ['2020-01-08T00:00:00-08:00', '2020-01-10T00:00:00-08:00'],
];

describe('Calendar', () => {
  test('Calendar should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Calendar date={DATE} animate={false} />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('render without grommet wrapper', () => {
    const { container } = render(<Calendar date={DATE} animate={false} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('date', () => {
    // need to set the date to avoid snapshot drift over time
    const { container } = render(
      <Grommet>
        <Calendar date={DATE} animate={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('date without time specified', () => {
    // correct date displayed if time is not specified in ISOstring
    const { getByLabelText } = render(
      <Grommet>
        <Calendar date={DATE.split('T')[0]} animate={false} />
      </Grommet>,
    );

    expect(
      getByLabelText('January 2020; Currently selected January 15, 2020;'),
    ).not.toBeUndefined();
  });

  test('disabled', () => {
    const disabledDate = new Date(DATE);
    disabledDate.setDate(disabledDate.getDate() + 1);
    const { asFragment } = render(
      <Grommet>
        <Calendar date={DATE} disabled={[disabledDate.toISOString()]} />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('dates', () => {
    const { container } = render(
      <Grommet>
        <Calendar dates={DATES} animate={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('daysOfWeek', () => {
    const { container } = render(
      <Grommet>
        <Calendar daysOfWeek dates={DATES} animate={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size', () => {
    const { container } = render(
      <Grommet>
        <Calendar size="small" date={DATE} animate={false} />
        <Calendar size="medium" date={DATE} animate={false} />
        <Calendar size="large" date={DATE} animate={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop header size', () => {
    const {} = render(
      <Grommet>
        <Calendar size="small" level={3} date={DATE} />
        <Calendar size="medium" level={2} date={DATE} />
        <Calendar size="large" level={1} date={DATE} />
      </Grommet>,
    );

    // Check for each calendar heading level
    const smallCalendarHeading = screen.getByRole('heading', { level: 3 });
    const mediumCalendarHeading = screen.getByRole('heading', { level: 2 });
    const largeCalendarHeading = screen.getByRole('heading', { level: 1 });

    expect(smallCalendarHeading).toBeInTheDocument();
    expect(mediumCalendarHeading).toBeInTheDocument();
    expect(largeCalendarHeading).toBeInTheDocument();
  });

  test('fill', () => {
    const { container } = render(
      <Grommet>
        <Calendar fill date={DATE} animate={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('firstDayOfWeek', () => {
    const { container } = render(
      <Grommet>
        <Calendar firstDayOfWeek={0} date={DATE} animate={false} />
        <Calendar firstDayOfWeek={1} date={DATE} animate={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('reference', () => {
    const { container } = render(
      <Grommet>
        <Calendar reference={DATE} animate={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('showAdjacentDays', () => {
    const { container } = render(
      <Grommet>
        <Calendar date={DATE} animate={false} />
        <Calendar date={DATE} animate={false} showAdjacentDays={false} />
        <Calendar date={DATE} animate={false} showAdjacentDays="trim" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('header', () => {
    const { container } = render(
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
              <Button onClick={previousInBound ? onPreviousMonth : undefined}>
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
              <Button onClick={nextInBound ? onNextMonth : undefined}>
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

    expect(container.firstChild).toMatchSnapshot();
  });

  test('children', () => {
    const { container } = render(
      <Grommet>
        <Calendar date={DATE} fill animate={false}>
          {({ day }) => <Box>{day}</Box>}
        </Calendar>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
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
    expect(onSelect).toHaveBeenCalledWith(
      expect.stringMatching(/^2020-01-17T/),
    );
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
    expect(onSelect).toHaveBeenCalledWith(
      expect.stringMatching(/^2020-01-17T/),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('read-only with range when no onSelect prop provided', () => {
    const initialRange = [
      ['2020-01-03T00:00:00-08:00', '2020-01-08T00:00:00-08:00'],
    ];
    const { getByLabelText } = render(
      <Grommet>
        <Calendar date={initialRange} range />
      </Grommet>,
    );

    // Verify initial range is set (dates 3-8 should be selected)
    const date3 = getByLabelText('Fri Jan 03 2020').closest('div');
    const date8 = getByLabelText('Wed Jan 08 2020').closest('div');
    const date10 = getByLabelText('Fri Jan 10 2020').closest('div');

    expect(date3).toHaveAttribute('aria-selected', 'true');
    expect(date8).toHaveAttribute('aria-selected', 'true');
    expect(date10).toHaveAttribute('aria-selected', 'false');

    // Click on date outside the range
    fireEvent.click(getByLabelText('Fri Jan 10 2020'));

    // Verify range hasn't changed after click
    expect(date3).toHaveAttribute('aria-selected', 'true');
    expect(date8).toHaveAttribute('aria-selected', 'true');
    expect(date10).toHaveAttribute('aria-selected', 'false');
  });

  test('first day sunday week monday', () => {
    // When the first day of the month is Sunday,
    // and the request of firstDayOfWeek
    // is Monday, we are verifying we are not missing a week, issue 3253.
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
    fireEvent.click(getByLabelText('Go to December 2019'));
    act(() => {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
    // Change the Calendar back to January
    fireEvent.click(getByLabelText('Go to January 2020'));
    act(() => {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
    jest.useRealTimers();
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
    expect(onSelect).toHaveBeenCalledWith(expect.stringMatching(/2020-01-11T/));
    fireEvent.click(getByText('20'));
    expect(onSelect).toHaveBeenCalledWith([
      [
        expect.stringMatching(/^2020-01-11T/),
        expect.stringMatching(/^2020-01-20T/),
      ],
    ]);
  });

  test('disabled previous month button when date is before bounds', () => {
    render(
      <Grommet>
        <Calendar
          date="2019-01-15T00:00:00-08:00"
          onSelect={jest.fn()}
          range
          animate={false}
          bounds={['2020-01-01', '2020-01-31']}
        />
      </Grommet>,
    );

    const previousMonthButton = screen.getByRole('button', {
      name: 'Go to December 2018',
    });
    const nextMonthButton = screen.getByRole('button', {
      name: 'Go to February 2019',
    });

    expect(previousMonthButton).toBeDisabled();
    expect(nextMonthButton).not.toBeDisabled();
  });

  test('disabled next month button when date is after bounds', () => {
    render(
      <Grommet>
        <Calendar
          date="2020-02-15T00:00:00-08:00"
          onSelect={jest.fn()}
          range
          animate={false}
          bounds={['2020-01-01', '2020-01-31']}
        />
      </Grommet>,
    );

    const previousMonthButton = screen.getByRole('button', {
      name: 'Go to January 2020',
    });
    const nextMonthButton = screen.getByRole('button', {
      name: 'Go to March 2020',
    });

    expect(previousMonthButton).not.toBeDisabled();
    expect(nextMonthButton).toBeDisabled();
  });

  test('change to next month when date is before bounds', () => {
    const onReference = jest.fn();
    render(
      <Grommet>
        <Calendar
          date="2019-01-15T00:00:00-08:00"
          onReference={onReference}
          range
          animate={false}
          bounds={['2020-01-01', '2020-01-31']}
        />
      </Grommet>,
    );

    const nextMonthButton = screen.getByRole('button', {
      name: 'Go to February 2019',
    });

    fireEvent.click(nextMonthButton);

    expect(onReference).toHaveBeenCalledWith(
      expect.stringContaining('2019-02-01'),
    );
  });

  test('change to next month when date is after bounds', () => {
    const onReference = jest.fn();
    render(
      <Grommet>
        <Calendar
          date="2021-01-15T00:00:00-08:00"
          onReference={onReference}
          range
          animate={false}
          bounds={['2020-01-01', '2020-01-31']}
        />
      </Grommet>,
    );

    const previousMonthButton = screen.getByRole('button', {
      name: 'Go to December 2020',
    });

    fireEvent.click(previousMonthButton);

    expect(onReference).toHaveBeenCalledWith(
      expect.stringContaining('2020-12-31'),
    );
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
    expect(onSelect).toHaveBeenCalledWith([
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
    expect(onSelect).toHaveBeenCalledWith([
      [
        expect.stringMatching(/^2020-01-03T/),
        expect.stringMatching(/^2020-01-05T/),
      ],
    ]);
    // select date less than January 3rd
    // activeDate is end, since this is before the start
    // date we should update the date
    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
    expect(onSelect).toHaveBeenCalledWith(expect.stringMatching(/2020-01-01T/));
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
    expect(onSelect).toHaveBeenCalledWith(
      expect.stringMatching(/^2020-01-03T/),
    );
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
    expect(onSelect).toHaveBeenCalledWith(
      expect.stringMatching(/^2020-01-03T/),
    );
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toHaveBeenCalledWith(undefined);
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
    expect(onSelect).toHaveBeenCalledWith(
      expect.stringMatching(/^2020-01-01T/),
    );
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
    expect(onSelect).toHaveBeenCalledWith([
      [
        expect.stringMatching(/^2020-01-03T/),
        expect.stringMatching(/^2020-01-05T/),
      ],
    ]);
    // select date less than January 3rd
    // activeDate is end, since this is before the start
    // date we should update the date
    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
    expect(onSelect).toHaveBeenCalledWith([
      [expect.stringMatching(/^2020-01-01T/), undefined],
    ]);

    // should select end date again
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toHaveBeenCalledWith([
      [
        expect.stringMatching(/^2020-01-01T/),
        expect.stringMatching(/^2020-01-03T/),
      ],
    ]);

    // should select start date, if great than end date, clear end date
    fireEvent.click(getByLabelText('Sun Jan 05 2020'));
    expect(onSelect).toHaveBeenCalledWith([
      [expect.stringMatching(/^2020-01-05T/), undefined],
    ]);
  });

  test('range as array with date', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          date={[['2020-01-01T00:00:00-08:00', '2020-01-05T00:00:00-08:00']]}
          onSelect={onSelect}
          range="array"
          animate={false}
        />
      </Grommet>,
    );
    // select date greater than January 1st
    // activeDate by default is start
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toHaveBeenCalledWith([
      [
        expect.stringMatching(/^2020-01-03T/),
        expect.stringMatching(/^2020-01-05T/),
      ],
    ]);
    // select date less than January 3rd
    // activeDate is end, since this is before the start
    // date we should update the date
    fireEvent.click(getByLabelText('Wed Jan 01 2020'));
    expect(onSelect).toHaveBeenCalledWith([
      [expect.stringMatching(/^2020-01-01T/), undefined],
    ]);

    // should select end date again
    fireEvent.click(getByLabelText('Fri Jan 03 2020'));
    expect(onSelect).toHaveBeenCalledWith([
      [
        expect.stringMatching(/^2020-01-01T/),
        expect.stringMatching(/^2020-01-03T/),
      ],
    ]);

    // should select start date, if great than end date, clear end date
    fireEvent.click(getByLabelText('Sun Jan 05 2020'));
    expect(onSelect).toHaveBeenCalledWith([
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
    expect(onSelect).toHaveBeenCalledWith([
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
    expect(onSelect).toHaveBeenCalledWith([
      [
        expect.stringMatching(/^2020-01-01T/),
        expect.stringMatching(/^2020-01-03T/),
      ],
    ]);
  });

  test('daylight savings', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <Grommet>
        <Calendar
          reference="2022-07-14T08:00:00.000Z"
          onSelect={onSelect}
          animate={false}
        />
      </Grommet>,
    );
    fireEvent.click(getByLabelText('Fri Jul 15 2022'));
    expect(onSelect).toHaveBeenCalledWith(
      expect.stringMatching(/^2022-07-15T08:00:00.000Z/),
    );

    // Change the Calendar from July to March
    fireEvent.click(getByLabelText('Go to June 2022'));
    fireEvent.click(getByLabelText('Go to May 2022'));
    fireEvent.click(getByLabelText('Go to April 2022'));
    fireEvent.click(getByLabelText('Go to March 2022'));

    fireEvent.click(getByLabelText('Wed Mar 02 2022'));

    const date = new Date();
    const january = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const july = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    const hasDaylightSavings = january !== july;

    expect(onSelect).toHaveBeenCalledWith(
      // expecting one hour diff bc of daylight savings shift, otherwise no shift
      expect.stringMatching(
        `2022-03-02T0${hasDaylightSavings ? 9 : 8}:00:00.000Z`,
      ),
    );
  });

  test('should render day and range rounding and states', () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          global: {
            colors: {
              blue: '#00C8FF',
              purple: '#F740FF',
            },
            active: {
              background: 'skyblue',
            },
          },
          calendar: {
            day: {
              hover: {
                background: 'blue',
                color: 'red',
              },
              selected: {
                background: 'purple',
                color: '#000000',
                font: {
                  weight: 500,
                },
                hover: {
                  background: '#006750',
                  color: '#FFFFFF',
                },
              },
              inRange: {
                color: 'blue',
                hover: {
                  background: 'rgb(174, 246, 223)',
                  color: 'text-strong',
                },
              },
            },
            range: {
              background: '#CBFAEB',
            },
            medium: {
              day: {
                round: 'full',
              },
              range: {
                round: 'none',
                start: {
                  round: {
                    corner: 'left',
                    size: 'full',
                  },
                },
                end: {
                  round: {
                    corner: 'right',
                    size: 'full',
                  },
                },
              },
            },
          },
        }}
      >
        <Calendar date={DATES} animate={false} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();

    let style: CSSStyleDeclaration;
    const selectedDay = screen.getByText('10');
    fireEvent.mouseOver(selectedDay);
    style = window.getComputedStyle(selectedDay);
    expect(style.background).toEqual('rgb(0, 103, 80)'); // rgb equivalent of selected.hover.background
    expect(style.color).toEqual('rgb(255, 255, 255)');

    const inRangeDay = screen.getByText('9');
    fireEvent.mouseOver(inRangeDay);
    style = window.getComputedStyle(inRangeDay);
    expect(style.background).toEqual('rgb(174, 246, 223)');
    expect(style.color).toEqual('rgb(0, 0, 0)'); // rgb equivalent of text-strong

    const day = screen.getByText('16');
    fireEvent.mouseOver(day);
    style = window.getComputedStyle(day);
    expect(style.background).toEqual('rgb(0, 200, 255)'); // rgb equivalent of theme blue
    expect(style.color).toEqual('rgb(255, 0, 0)'); // rgb equivalent of red
  });

  test('heading text font size', () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          calendar: {
            small: {
              title: {
                size: 'medium',
              },
            },
            medium: {
              title: {
                size: 'large',
              },
            },
            large: {
              title: {
                size: 'xxlarge',
              },
            },
          },
        }}
      >
        <Calendar date={DATE} daysOfWeek size="large" />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('theme title container pad', () => {
    const customTheme = {
      calendar: {
        medium: {
          title: {
            container: {
              pad: {
                horizontal: 'large',
              },
            },
          },
        },
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <Calendar date={DATE} size="medium" animate={false} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Calendar Keyboard events', () => {
  let App: React.FC;

  beforeEach(() => {
    App = () => {
      const [date, setDate] = React.useState<any>(DATE);
      const onSelect = (nextDate: CalendarProps['date']) => {
        setDate(nextDate);
      };
      return (
        <Grommet>
          <Calendar
            bounds={['2020-01-01', '2020-01-31']}
            date={date}
            onSelect={onSelect}
            animate={false}
          />
        </Grommet>
      );
    };
  });

  test('onEnter', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    render(<App />);

    const dateButton = screen.getByRole('button', {
      name: 'Wed Jan 15 2020',
    });
    const firstDateButton = screen.getByRole('button', {
      name: 'Wed Jan 01 2020',
    });
    await user.tab();
    await user.tab();
    await user.type(firstDateButton, '{enter}');
    expect(dateButton.closest('div')).toHaveAttribute('aria-selected', 'false');
    expect(firstDateButton.closest('div')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    jest.useRealTimers();
  });

  test('onArrowUp and onArrowDown', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    render(<App />);

    const firstDateButton = screen.getByRole('button', {
      name: 'Wed Jan 01 2020',
    });
    const eightDateButton = screen.getByRole('button', {
      name: 'Wed Jan 08 2020',
    });
    await user.tab();
    await user.tab();
    await user.type(firstDateButton, '{arrowDown}');
    await user.type(eightDateButton, '{enter}');
    expect(eightDateButton.closest('div')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.type(eightDateButton, '{arrowUp}');
    await user.type(firstDateButton, '{enter}');
    expect(firstDateButton.closest('div')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    jest.useRealTimers();
  });

  test('onArrowRight and onArrowLeft', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: null });
    render(<App />);

    const firstDateButton = screen.getByRole('button', {
      name: 'Wed Jan 01 2020',
    });
    const secondDateButton = screen.getByRole('button', {
      name: 'Thu Jan 02 2020',
    });
    await user.tab();
    await user.tab();
    await user.type(firstDateButton, '{arrowRight}');
    await user.type(secondDateButton, '{space}');
    expect(secondDateButton.closest('div')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.type(secondDateButton, '{arrowLeft}');
    await user.type(firstDateButton, '{space}');
    expect(firstDateButton.closest('div')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    jest.useRealTimers();
  });
});
