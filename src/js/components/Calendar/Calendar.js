import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';

import { Box } from '../Box';
import { Button } from '../Button';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';

import { CalendarPropTypes } from './propTypes';
import {
  StyledCalendar,
  StyledDay,
  StyledDayButton,
  StyledDayContainer,
  StyledWeek,
  StyledWeeks,
  StyledWeeksContainer,
} from './StyledCalendar';
import {
  addDays,
  addMonths,
  betweenDates,
  daysApart,
  endOfMonth,
  handleOffset,
  sameDayOrAfter,
  sameDayOrBefore,
  startOfMonth,
  subtractDays,
  subtractMonths,
  withinDates,
} from './utils';
import { setHoursWithOffset } from '../../utils/dates';
import { useThemeValue } from '../../utils/useThemeValue';

const getLocaleString = (value, locale) =>
  value?.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const currentlySelectedString = (value, locale) => {
  let selected;
  if (value instanceof Date) {
    selected = `Currently selected ${getLocaleString(value, locale)};`;
  } else if (value?.length) {
    selected = `Currently selected ${value.map((item) => {
      let dates;
      if (!Array.isArray(item)) {
        dates = `${getLocaleString(item, locale)}`;
      } else {
        const start =
          item[0] !== undefined ? getLocaleString(item[0], locale) : 'none';
        const end =
          item[1] !== undefined ? getLocaleString(item[1], locale) : 'none';
        dates = `${start} through ${end}`;
      }
      return dates;
    })}`;
  } else {
    selected = 'No date selected';
  }

  return selected;
};

// calendar value may be a single date, multiple dates, a range of dates
// supplied as ISOstrings.
const normalizeInput = (dateValue) => {
  let result;
  if (dateValue instanceof Date) {
    result = dateValue;
  }
  // date may be an empty string ''
  else if (typeof dateValue === 'string' && dateValue.length) {
    result = setHoursWithOffset(dateValue);
  } else if (Array.isArray(dateValue)) {
    result = dateValue.map((d) => normalizeInput(d));
  }
  return result;
};

const normalizeOutput = (dateValue, outputFormat) => {
  let result;

  const normalize = (value) => {
    let normalizedValue = value.toISOString();
    if (normalizedValue && outputFormat === 'no timezone') {
      [normalizedValue] = handleOffset(normalizedValue)
        .toISOString()
        .split('T');
    }
    return normalizedValue;
  };

  if (dateValue instanceof Date) {
    result = normalize(dateValue);
  } else if (typeof dateValue === 'undefined') {
    result = undefined;
  } else {
    result = dateValue.map((d) => normalizeOutput(d, outputFormat));
  }
  return result;
};

// format value to [[]] for internal functions
const normalizeRange = (value, activeDate) => {
  let range = value;
  if (range instanceof Date)
    range =
      activeDate === 'start' ? [[undefined, range]] : [[range, undefined]];
  else if (Array.isArray(range) && !Array.isArray(range[0])) range = [range];

  return range;
};

const getReference = (reference, value, activeDate) => {
  let nextReference;
  if (value) {
    if (Array.isArray(value)) {
      if (value[0] instanceof Date) {
        // if we just selected an end date, active date will be 'start'
        // and we should set the reference to the end date
        if (activeDate === 'start' && value[1] instanceof Date) {
          [, nextReference] = value;
        } else {
          [nextReference] = value;
        }
      } else if (Array.isArray(value[0])) {
        // if we just selected an end date, active date will be 'start'
        // and we should set the reference to the end date
        if (activeDate === 'start' && value[0][1]) {
          // eslint-disable-next-line prefer-destructuring
          nextReference = value[0][1];
        } else {
          nextReference = value[0][0] ? value[0][0] : value[0][1];
        }
      } else {
        nextReference = new Date();
        nextReference.setHours(0, 0, 0, 0);
      }
    } else nextReference = value;
  } else if (reference) {
    nextReference = reference;
  } else {
    nextReference = new Date();
    nextReference.setHours(0, 0, 0, 0);
  }
  return nextReference;
};

const buildDisplayBounds = (reference, firstDayOfWeek) => {
  let start = new Date(reference);
  start.setDate(1); // first of month

  // In case Sunday is the first day of the month, and the user asked for Monday
  // to be the first day of the week, then we need to include Sunday and six
  // days prior.
  start =
    start.getDay() === 0 && firstDayOfWeek === 1
      ? (start = subtractDays(start, 6))
      : // beginning of week
        (start = subtractDays(start, start.getDay() - firstDayOfWeek));

  const end = addDays(start, 7 * 5 + 7); // 5 weeks to end of week
  return [start, end];
};

const monthBounds = (reference) => {
  const start = new Date(reference);
  start.setDate(1); // first of month
  const end = endOfMonth(start);
  return [start, end];
};

const disabledCalendarPreviousMonthButton = (date, reference, bounds) => {
  if (!bounds) return false;

  const lastBound = new Date(bounds[1]);

  return !sameDayOrBefore(lastBound, reference) && !betweenDates(date, bounds);
};

const disabledCalendarNextMonthButton = (date, reference, bounds) => {
  if (!bounds) return false;

  const firstBound = new Date(bounds[0]);

  return !sameDayOrAfter(firstBound, reference) && !betweenDates(date, bounds);
};

export const getOutputFormat = (dates) => {
  if (typeof dates === 'string' && dates?.indexOf('T') === -1) {
    return 'no timezone';
  }
  if (Array.isArray(dates)) {
    return getOutputFormat(dates[0]);
  }
  return 'date timezone';
};

const millisecondsPerYear = 31557600000;

const CalendarDay = forwardRef(
  (
    {
      activeProp,
      children,
      day,
      disabledProp,
      fill,
      size,
      isInRange,
      isSelected,
      otherMonth,
      rangePosition,
      buttonProps = {},
      responsive,
    },
    ref,
  ) => {
    const { passThemeFlag } = useThemeValue();
    return (
      <StyledDayContainer
        role="gridcell"
        aria-selected={isSelected}
        inRange={isInRange}
        isSelected={isSelected}
        rangePosition={rangePosition}
        sizeProp={size}
        fillContainer={fill}
        responsive={responsive}
      >
        <StyledDayButton
          aria-disabled={disabledProp}
          disabledProp={disabledProp}
          fill={fill}
          plain
          tabIndex={activeProp?.getTime() === day?.getTime() ? 0 : -1}
          responsive={responsive}
          {...buttonProps}
          ref={activeProp?.getTime() === day?.getTime() ? ref : undefined}
        >
          {({ hover }) => (
            <StyledDay
              disabledProp={disabledProp}
              hover={hover}
              inRange={isInRange}
              isSelected={isSelected}
              otherMonth={otherMonth}
              sizeProp={size}
              fillContainer={fill}
              responsive={responsive}
              {...passThemeFlag}
            >
              {children}
            </StyledDay>
          )}
        </StyledDayButton>
      </StyledDayContainer>
    );
  },
);

const CalendarCustomDay = ({
  'aria-selected': ariaSelected,
  children,
  fill,
  size,
  buttonProps,
  responsive,
}) => {
  if (!buttonProps) {
    return (
      <StyledDayContainer
        aria-selected={ariaSelected}
        role="gridcell"
        sizeProp={size}
        fillContainer={fill}
        responsive={responsive}
      >
        {children}
      </StyledDayContainer>
    );
  }

  return (
    <StyledDayContainer
      aria-selected={ariaSelected}
      role="gridcell"
      sizeProp={size}
      fillContainer={fill}
      responsive={responsive}
    >
      <StyledDayButton fill={fill} responsive={responsive} {...buttonProps}>
        {children}
      </StyledDayButton>
    </StyledDayContainer>
  );
};

const Calendar = forwardRef(
  (
    {
      activeDate: activeDateProp,
      animate = true,
      bounds: boundsProp,
      children,
      date: dateProp,
      dates: datesProp,
      daysOfWeek,
      disabled,
      initialFocus, // internal only for DateInput
      fill,
      firstDayOfWeek = 0,
      header,
      level,
      locale = 'en-US',
      messages,
      onReference,
      onSelect,
      range,
      reference: referenceProp,
      responsive: responsiveProp = true,
      showAdjacentDays = true,
      size = 'medium',
      timestamp: timestampProp,
      ...rest
    },
    ref,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const announce = useContext(AnnounceContext);
    const { format } = useContext(MessageContext);

    // If fill is true the responsive behavior isn't needed.
    const responsive = responsiveProp && !fill;

    // set activeDate when caller changes it, allows us to change
    // it internally too
    const [activeDate, setActiveDate] = useState(
      dateProp && typeof dateProp === 'string' && range ? 'end' : 'start',
    );
    useEffect(() => {
      if (activeDateProp) setActiveDate(activeDateProp);
    }, [activeDateProp]);

    const [value, setValue] = useState(normalizeInput(dateProp || datesProp));
    useEffect(() => {
      const val = dateProp || datesProp;
      setValue(normalizeInput(val));
    }, [dateProp, datesProp]);

    const [reference, setReference] = useState(
      getReference(normalizeInput(referenceProp), value, activeDate),
    );
    useEffect(() => {
      if (value) {
        setReference(
          getReference(normalizeInput(referenceProp), value, activeDate),
        );
      }
    }, [referenceProp, value, activeDate]);

    const [outputFormat, setOutputFormat] = useState(
      getOutputFormat(dateProp || datesProp),
    );
    useEffect(() => {
      setOutputFormat(getOutputFormat(dateProp || datesProp));
    }, [dateProp, datesProp]);

    // normalize bounds
    const [bounds, setBounds] = useState(boundsProp);
    useEffect(() => {
      if (boundsProp) setBounds(boundsProp);
      else setBounds(undefined);
    }, [boundsProp]);

    // calculate the bounds we display based on the reference
    const [displayBounds, setDisplayBounds] = useState(
      buildDisplayBounds(reference, firstDayOfWeek),
    );
    const [targetDisplayBounds, setTargetDisplayBounds] = useState();
    const [slide, setSlide] = useState();
    const [animating, setAnimating] = useState();

    // When the reference changes, we need to update the displayBounds.
    // This is easy when we aren't animating. If we are animating,
    // we temporarily increase the displayBounds to be the union of the old
    // and new ones and set slide to drive the animation. We keep track
    // of where we are heading via targetDisplayBounds. When the animation
    // finishes, we prune displayBounds down to where we are headed and
    // clear the slide and targetDisplayBounds.
    useEffect(() => {
      const nextDisplayBounds = buildDisplayBounds(reference, firstDayOfWeek);

      // Checks if the difference between the current and next DisplayBounds is
      // greater than a year. If that's the case, calendar should update without
      // animation.
      if (
        nextDisplayBounds[0].getTime() !== displayBounds[0].getTime() &&
        nextDisplayBounds[1].getTime() !== displayBounds[1].getTime()
      ) {
        let diffBoundsAboveYear = false;
        if (nextDisplayBounds[0].getTime() < displayBounds[0].getTime()) {
          if (
            displayBounds[0].getTime() - nextDisplayBounds[0].getTime() >
            millisecondsPerYear
          ) {
            diffBoundsAboveYear = true;
          }
        } else if (
          nextDisplayBounds[1].getTime() > displayBounds[1].getTime()
        ) {
          if (
            nextDisplayBounds[1].getTime() - displayBounds[1].getTime() >
            millisecondsPerYear
          ) {
            diffBoundsAboveYear = true;
          }
        }
        if (!animate || diffBoundsAboveYear) {
          setDisplayBounds(nextDisplayBounds);
        } else {
          setTargetDisplayBounds(nextDisplayBounds);
        }
      }
    }, [animate, firstDayOfWeek, reference, displayBounds]);

    useEffect(() => {
      // if the reference timezone has changed (e.g., controlled component),
      // both ends of the displayBounds should inherit that new timestamp
      if (targetDisplayBounds) {
        if (
          targetDisplayBounds[0].getTime() < displayBounds[0].getTime() ||
          targetDisplayBounds[1].getTime() > displayBounds[1].getTime()
        ) {
          setDisplayBounds([targetDisplayBounds[0], targetDisplayBounds[1]]);
        }
        if (targetDisplayBounds[0].getTime() < displayBounds[0].getTime()) {
          // only animate if the duration is within a year
          if (
            displayBounds[0].getTime() - targetDisplayBounds[0].getTime() <
              millisecondsPerYear &&
            daysApart(displayBounds[0], targetDisplayBounds[0])
          ) {
            setSlide({
              direction: 'down',
              weeks: daysApart(displayBounds[0], targetDisplayBounds[0]) / 7,
            });
            setAnimating(true);
          }
        } else if (
          targetDisplayBounds[1].getTime() > displayBounds[1].getTime()
        ) {
          if (
            targetDisplayBounds[1].getTime() - displayBounds[1].getTime() <
              millisecondsPerYear &&
            daysApart(targetDisplayBounds[1], displayBounds[1])
          ) {
            setSlide({
              direction: 'up',
              weeks: daysApart(targetDisplayBounds[1], displayBounds[1]) / 7,
            });
            setAnimating(true);
          }
        }
        return undefined;
      }

      setSlide(undefined);
      return undefined;
    }, [animating, displayBounds, targetDisplayBounds]);

    // Last step in updating the displayBounds. Allows for pruning
    // displayBounds and cleaning up states to occur after animation.
    useEffect(() => {
      if (animating && targetDisplayBounds) {
        // Wait for animation to finish before cleaning up.
        const timer = setTimeout(
          () => {
            setDisplayBounds(targetDisplayBounds);
            setTargetDisplayBounds(undefined);
            setSlide(undefined);
            setAnimating(false);
          },
          400, // Empirically determined.
        );
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [animating, targetDisplayBounds]);

    // We have to deal with reference being the end of a month with more
    // days than the month we are changing to. So, we always set reference
    // to the first of the month before changing the month.
    const previousMonth = useMemo(
      () => endOfMonth(subtractMonths(startOfMonth(reference), 1)),
      [reference],
    );
    const nextMonth = useMemo(
      () => startOfMonth(addMonths(startOfMonth(reference), 1)),
      [reference],
    );
    const initialFocusDate = showAdjacentDays
      ? new Date(displayBounds[0])
      : startOfMonth(reference);
    const [focus, setFocus] = useState();
    const [active, setActive] = useState(initialFocusDate);
    const focusableDateRef = useRef(undefined);

    useEffect(() => {
      if (focusableDateRef?.current && initialFocus === 'days')
        focusableDateRef.current.focus();
    }, [initialFocus, focusableDateRef]);

    const handleReference = useCallback(
      (nextReference) => {
        setReference(nextReference);
        if (onReference) onReference(nextReference.toISOString());
      },
      [onReference],
    );

    const changeReference = useCallback(
      (nextReference) => {
        if (betweenDates(nextReference, bounds)) handleReference(nextReference);
      },
      [handleReference, bounds],
    );

    const changeCalendarMonth = (messageId, newMonth) => {
      handleReference(newMonth);
      const referenceStartOfMonth = startOfMonth(reference);
      const firstOfMonth = new Date(
        newMonth.getFullYear(),
        newMonth.getMonth(),
        1,
        referenceStartOfMonth.getHours(),
        referenceStartOfMonth.getMinutes(),
        referenceStartOfMonth.getSeconds(),
      );
      setActive(firstOfMonth);

      announce(
        format({
          id: messageId,
          messages,
          values: {
            date: newMonth.toLocaleDateString(locale, {
              month: 'long',
              year: 'numeric',
            }),
          },
        }),
      );
    };

    const handleRange = useCallback(
      (selectedDate) => {
        let result;
        const priorRange = normalizeRange(value, activeDate);
        // deselect when date clicked was the start/end of the range
        if (selectedDate.getTime() === priorRange?.[0]?.[0]?.getTime()) {
          result = [[undefined, priorRange[0][1]]];
          setActiveDate('start');
        } else if (selectedDate.getTime() === priorRange?.[0]?.[1]?.getTime()) {
          result = [[priorRange[0][0], undefined]];
          setActiveDate('end');
        }
        // selecting start date
        else if (activeDate === 'start') {
          if (!priorRange) {
            result = [[selectedDate, undefined]];
          } else if (!priorRange[0][1]) {
            result = [[selectedDate, priorRange[0][1]]];
          } else if (selectedDate.getTime() < priorRange[0][1].getTime()) {
            result = [[selectedDate, priorRange[0][1]]];
          } else if (selectedDate.getTime() > priorRange[0][1].getTime()) {
            result = [[selectedDate, undefined]];
          }
          setActiveDate('end');
        }
        // selecting end date
        else if (!priorRange) {
          result = [[undefined, selectedDate]];
          setActiveDate('start');
        } else if (selectedDate.getTime() < priorRange[0][0].getTime()) {
          result = [[selectedDate, undefined]];
          setActiveDate('end');
        } else if (selectedDate.getTime() > priorRange[0][0].getTime()) {
          result = [[priorRange[0][0], selectedDate]];
          setActiveDate('start');
        }

        // If no dates selected, always return undefined; else format
        // result according to specified range value.
        if (result[0].includes(undefined)) {
          if (range === 'array') {
            result = !result[0][0] && !result[0][1] ? undefined : result;
          } else {
            result = result[0].find((d) => d !== undefined);
          }
        }
        setValue(result);
        return result;
      },
      [activeDate, value, range],
    );

    const selectDate = useCallback(
      (selectedDate) => {
        let nextValue;

        if (range || Array.isArray(value?.[0])) {
          nextValue = handleRange(selectedDate);
        } else {
          nextValue = selectedDate;
        }

        if (onSelect) {
          nextValue = normalizeOutput(nextValue, outputFormat);
          onSelect(nextValue);
        }
      },
      [handleRange, onSelect, outputFormat, range, value],
    );

    const onClick = (selectedDate) => {
      selectDate(selectedDate);
      announce(
        `Selected ${getLocaleString(selectedDate, locale)}`,
        'assertive',
      );
      setActive(selectedDate);
    };

    const renderCalendarHeader = () => {
      const PreviousIcon =
        size === 'small'
          ? theme.calendar.icons.small.previous
          : theme.calendar.icons.previous;

      const NextIcon =
        size === 'small'
          ? theme.calendar.icons.small.next
          : theme.calendar.icons.next;

      const monthAndYear = reference.toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric',
      });

      // theme.calendar.heading.level should be removed in v3 of grommet
      // theme.calendar[size].title should be used instead
      let headingLevel;
      if (level !== undefined) {
        headingLevel = level;
      } else if (size === 'small') {
        headingLevel =
          (theme.calendar.heading && theme.calendar.heading.level) || 4;
      } else {
        headingLevel =
          ((theme.calendar.heading && theme.calendar.heading.level) || 4) - 1;
      }

      const { container: containerTheme, ...textTheme } =
        theme.calendar[size]?.title || undefined;

      return (
        <Box direction="row" justify="between" align="center">
          <Header flex pad={containerTheme.pad}>
            {Object.keys(textTheme).length !== 0 ? (
              <Text {...textTheme}>{monthAndYear}</Text>
            ) : (
              <Heading
                level={headingLevel}
                size={size}
                margin="none"
                overflowWrap="normal"
              >
                {monthAndYear}
              </Heading>
            )}
          </Header>
          <Box flex={false} direction="row" align="center">
            <Button
              a11yTitle={format({
                id: 'calendar.previous',
                messages,
                values: {
                  date: previousMonth.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  }),
                },
              })}
              icon={<PreviousIcon size={size !== 'small' ? size : undefined} />}
              disabled={disabledCalendarPreviousMonthButton(
                previousMonth,
                reference,
                bounds,
              )}
              onClick={() =>
                changeCalendarMonth('calendar.previousMove', previousMonth)
              }
            />
            <Button
              a11yTitle={format({
                id: 'calendar.next',
                messages,
                values: {
                  date: nextMonth.toLocaleDateString(locale, {
                    month: 'long',
                    year: 'numeric',
                  }),
                },
              })}
              icon={<NextIcon size={size !== 'small' ? size : undefined} />}
              disabled={disabledCalendarNextMonthButton(
                nextMonth,
                reference,
                bounds,
              )}
              onClick={() =>
                changeCalendarMonth('calendar.nextMove', nextMonth)
              }
            />
          </Box>
        </Box>
      );
    };

    const renderDaysOfWeek = () => {
      let day = new Date(displayBounds[0]);
      const days = [];
      while (days.length < 7) {
        days.push(
          <StyledDayContainer
            role="gridcell"
            key={days.length}
            sizeProp={size}
            fillContainer={fill}
            responsive={responsive}
          >
            <StyledDay
              sizeProp={size}
              fillContainer={fill}
              responsive={responsive}
            >
              {day.toLocaleDateString(locale, { weekday: 'narrow' })}
            </StyledDay>
          </StyledDayContainer>,
        );
        day = addDays(day, 1);
      }
      return <StyledWeek role="row">{days}</StyledWeek>;
    };

    const weeks = [];
    let day = new Date(displayBounds[0]);
    let days;
    let firstDayInMonth;
    let blankWeek = false;

    while (day.getTime() < displayBounds[1].getTime()) {
      if (day.getDay() === firstDayOfWeek) {
        if (days) {
          weeks.push(
            <StyledWeek role="row" key={day.getTime()} fillContainer={fill}>
              {days}
            </StyledWeek>,
          );
        }
        days = [];
      }

      const otherMonth = day.getMonth() !== reference.getMonth();
      if (!showAdjacentDays && otherMonth) {
        days.push(
          <StyledDayContainer
            key={day.getTime()}
            sizeProp={size}
            fillContainer={fill}
            responsive={responsive}
          >
            <StyledDay
              sizeProp={size}
              fillContainer={fill}
              responsive={responsive}
            />
          </StyledDayContainer>,
        );

        if (
          weeks.length === 5 &&
          /* If the length days array is less than the current getDate()
          we know that all days in the array are from the next month. */
          days.length < day.getDate()
        ) {
          blankWeek = true;
        }
      } else if (
        /* Do not show adjacent days in 6th row if all days
        fall in the next month */
        showAdjacentDays === 'trim' &&
        otherMonth &&
        weeks.length === 5 &&
        /* If the length days array is less than the current getDate()
        we know that all days in the array are from the next month. */
        days.length < day.getDate()
      ) {
        blankWeek = true;
        days.push(
          <StyledDayContainer
            key={day.getTime()}
            sizeProp={size}
            fillContainer={fill}
            responsive={responsive}
          >
            <StyledDay
              sizeProp={size}
              fillContainer={fill}
              responsive={responsive}
            />
          </StyledDayContainer>,
        );
      } else {
        const dateObject = day;
        // this.dayRefs[dateObject] = React.createRef();
        let selected = false;
        let inRange = false;
        let rangePosition;

        const [selectedState] = withinDates(
          day,
          range ? normalizeRange(value, activeDate) : value,
        );
        if (selectedState === 2) {
          selected = true;
          [, rangePosition] = withinDates(
            day,
            range ? normalizeRange(value, activeDate) : value,
          );
        } else if (selectedState === 1) {
          inRange = true;
        }
        const dayDisabled = !!(
          withinDates(day, normalizeInput(disabled))[0] ||
          (bounds && !betweenDates(day, normalizeInput(bounds)))
        );
        if (
          !firstDayInMonth &&
          !dayDisabled &&
          day.getMonth() === reference.getMonth()
        ) {
          firstDayInMonth = dateObject;
        }

        if (!children) {
          days.push(
            <CalendarDay
              activeProp={active}
              day={day}
              key={day.getTime()}
              disabledProp={dayDisabled}
              buttonProps={{
                a11yTitle: day.toDateString(),
                onClick: dayDisabled ? () => {} : () => onClick(dateObject),
              }}
              isInRange={inRange}
              isSelected={selected}
              otherMonth={day.getMonth() !== reference.getMonth()}
              rangePosition={rangePosition}
              size={size}
              fill={fill}
              ref={focusableDateRef}
              responsive={responsive}
            >
              {day.getDate()}
            </CalendarDay>,
          );
        } else {
          days.push(
            <CalendarCustomDay
              key={day.getTime()}
              aria-selected={selected}
              buttonProps={
                onSelect
                  ? {
                      a11yTitle: day.toDateString(),
                      active: active && active.getTime() === day.getTime(),
                      disabled: dayDisabled,
                      onClick: dayDisabled
                        ? () => {}
                        : () => onClick(dateObject),
                    }
                  : null
              }
              size={size}
              fill={fill}
              responsive={responsive}
            >
              {children({
                date: day,
                day: day.getDate(),
                isInRange: inRange,
                isSelected: selected,
              })}
            </CalendarCustomDay>,
          );
        }
      }
      day = addDays(day, 1);
    }
    weeks.push(
      <StyledWeek
        // if a week contains only blank days, for screen reader accessibility
        // we don't want to set role="row"
        role={!blankWeek ? 'row' : undefined}
        key={day.getTime()}
        fillContainer={fill}
      >
        {days}
      </StyledWeek>,
    );

    // track if we need to focus when element becomes available
    const [needsFocus, setNeedsFocus] = useState(false);
    // while the calendar contains focus, and is not animating, set
    // the focus to the active date

    // Focus management effect
    useEffect(() => {
      if (!animating && active && focus) {
        setNeedsFocus(true);
      }
    }, [animating, active, focus]);

    useEffect(() => {
      if (needsFocus && focusableDateRef?.current) {
        focusableDateRef.current.focus();
        setNeedsFocus(false); // Reset flag after focus
      }
    }, [active, reference, displayBounds, needsFocus, focusableDateRef]);

    useEffect(() => {
      if (bounds && active) {
        const normalizedBounds = normalizeInput(bounds);
        if (!betweenDates(active, normalizedBounds)) {
          const diff1 = Math.abs(
            active.getTime() - normalizedBounds[0].getTime(),
          );
          const diff2 = Math.abs(
            active.getTime() - normalizedBounds[1].getTime(),
          );
          const closerDate = diff1 < diff2 ? 0 : 1;
          setActive(normalizedBounds[closerDate]);
        }
      }
    }, [active, bounds]);

    return (
      <StyledCalendar
        ref={ref}
        sizeProp={size}
        fillContainer={fill}
        responsive={responsive}
        {...passThemeFlag}
        {...rest}
      >
        <Box fill={fill}>
          {header
            ? header({
                date: reference,
                locale,
                onPreviousMonth: () => {
                  changeReference(previousMonth);
                  setActive(previousMonth);
                  announce(
                    format({
                      id: 'calendar.previous',
                      messages,
                      values: {
                        date: previousMonth.toLocaleDateString(locale, {
                          month: 'long',
                          year: 'numeric',
                        }),
                      },
                    }),
                  );
                },
                onNextMonth: () => {
                  changeReference(nextMonth);
                  setActive(nextMonth);
                  announce(
                    format({
                      id: 'calendar.next',
                      messages,
                      values: {
                        date: nextMonth.toLocaleDateString(locale, {
                          month: 'long',
                          year: 'numeric',
                        }),
                      },
                    }),
                  );
                },
                previousInBound: betweenDates(previousMonth, bounds),
                nextInBound: betweenDates(nextMonth, bounds),
              })
            : renderCalendarHeader(previousMonth, nextMonth)}
          <Box fill role="grid">
            {daysOfWeek && renderDaysOfWeek()}
            <Keyboard
              onUp={(event) => {
                const nextActive = addDays(active, -7);
                event.preventDefault();
                event.stopPropagation(); // so the page doesn't scroll
                if (
                  !!betweenDates(nextActive, normalizeInput(bounds)) ||
                  !bounds
                ) {
                  setActive(nextActive);
                  if (
                    !betweenDates(nextActive, displayBounds) ||
                    (!showAdjacentDays &&
                      !betweenDates(nextActive, monthBounds(reference)))
                  ) {
                    changeReference(nextActive);
                  }
                }
              }}
              onDown={(event) => {
                const nextActive = addDays(active, 7);
                event.preventDefault();
                event.stopPropagation(); // so the page doesn't scroll
                if (
                  !!betweenDates(nextActive, normalizeInput(bounds)) ||
                  !bounds
                ) {
                  setActive(nextActive);
                  if (
                    !betweenDates(nextActive, displayBounds) ||
                    (!showAdjacentDays &&
                      !betweenDates(nextActive, monthBounds(reference)))
                  ) {
                    changeReference(nextActive);
                  }
                }
              }}
              onLeft={() => {
                const nextActive = addDays(active, -1);
                if (
                  !!betweenDates(nextActive, normalizeInput(bounds)) ||
                  !bounds
                ) {
                  setActive(nextActive);
                  if (
                    !betweenDates(nextActive, displayBounds) ||
                    (!showAdjacentDays &&
                      !betweenDates(nextActive, monthBounds(reference)))
                  ) {
                    changeReference(nextActive);
                  }
                }
              }}
              onRight={() => {
                const nextActive = addDays(active, 1);
                if (
                  !!betweenDates(nextActive, normalizeInput(bounds)) ||
                  !bounds
                ) {
                  setActive(nextActive);
                  if (
                    !betweenDates(nextActive, displayBounds) ||
                    (!showAdjacentDays &&
                      !betweenDates(nextActive, monthBounds(reference)))
                  ) {
                    changeReference(nextActive);
                  }
                }
              }}
            >
              <StyledWeeksContainer
                role="rowgroup"
                aria-label={`${reference.toLocaleDateString(locale, {
                  month: 'long',
                  year: 'numeric',
                })}; ${currentlySelectedString(value, locale)}`}
                sizeProp={size}
                fillContainer={fill}
                responsive={responsive}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={() => {
                  setFocus(false);
                }}
                {...passThemeFlag}
              >
                <StyledWeeks
                  slide={slide}
                  sizeProp={size}
                  fillContainer={fill}
                  {...passThemeFlag}
                >
                  {weeks}
                </StyledWeeks>
              </StyledWeeksContainer>
            </Keyboard>
          </Box>
        </Box>
      </StyledCalendar>
    );
  },
);

Calendar.displayName = 'Calendar';
Calendar.propTypes = CalendarPropTypes;

export { Calendar };
