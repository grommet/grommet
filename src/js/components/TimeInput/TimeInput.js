import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Clock as GrommetClockIcon } from 'grommet-icons/icons/Clock';

import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormContext } from '../Form';
import { Keyboard } from '../Keyboard';
import {
  StyledTimeInputDisplay,
  StyledTimeInputField,
  StyledTimeInputSegment,
  StyledTimeInputSeparator,
  StyledTimeInputContainer,
  StyledTimeInput,
} from './StyledTimeInput';
import { TimeInputPopup } from './TimeInputPopup';
import { TimeInputPropTypes } from './propTypes';
import { useSectionedTimeField } from './useSectionedTimeField';
import {
  getSectionAriaMeta,
  getSectionName,
  pad,
  SECTION_HOUR,
  SECTION_MINUTE,
  SECTION_PERIOD,
  SECTION_SECOND,
} from './utils';

const sectionTypeToSection = {
  hours: SECTION_HOUR,
  minutes: SECTION_MINUTE,
  seconds: SECTION_SECOND,
  meridiem: SECTION_PERIOD,
};

const getSectionKey = (section) => {
  if (section === SECTION_HOUR) return 'hour';
  if (section === SECTION_MINUTE) return 'minute';
  if (section === SECTION_SECOND) return 'second';
  return 'period';
};

const getSectionToken = (section) => {
  if (section === SECTION_HOUR) return 'hh';
  if (section === SECTION_MINUTE) return 'mm';
  if (section === SECTION_SECOND) return 'ss';
  return 'aa';
};

const getDisplaySectionKey = (section) => {
  if (section === SECTION_HOUR) return 'hour';
  if (section === SECTION_MINUTE) return 'minute';
  if (section === SECTION_SECOND) return 'second';
  return 'period';
};

const getDisplaySectionPrefix = (section, index) => {
  if (index === 0) return '';
  return section === SECTION_PERIOD ? ' ' : ':';
};

const getDisplaySectionText = ({ key, section, sections }) => {
  if (sections[key] === undefined) return getSectionToken(section);
  if (section === SECTION_PERIOD) return sections[key];
  return pad(sections[key]);
};

const getSectionOrder = (format, views) => {
  const normalizedViews =
    Array.isArray(views) && views.length
      ? views
      : ['hours', 'minutes', 'seconds'];

  const numericSections = normalizedViews
    .filter((view) => view !== 'meridiem')
    .map((view) => sectionTypeToSection[view])
    .filter((section) => section !== undefined);

  if (format === '12') {
    const includePeriod =
      normalizedViews.includes('meridiem') || normalizedViews.includes('hours');
    if (includePeriod) return [...numericSections, SECTION_PERIOD];
  }

  return numericSections;
};

const buildPlaceholder = (sectionOrder) =>
  sectionOrder
    .map((section, index) => {
      const token = getSectionToken(section);
      if (index === 0) return token;
      return `${section === SECTION_PERIOD ? ' ' : ':'}${token}`;
    })
    .join('');

const normalizeStep = (step) => {
  const parsed = Number(step);
  if (!Number.isFinite(parsed) || parsed <= 0) return 1;
  return Math.max(1, Math.floor(parsed));
};

// When `format` isn't explicitly provided, default to the 12/24-hour
// convention the browser's default locale uses, rather than hardcoding one.
const getDefaultFormat = () => {
  try {
    const { hour12 } = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
    }).resolvedOptions();
    return hour12 ? '12' : '24';
  } catch {
    return '24';
  }
};

const DEFAULT_FORMAT = getDefaultFormat();

const TimeInput = forwardRef(
  (
    {
      defaultValue,
      disabled,
      format = DEFAULT_FORMAT,
      id,
      messages,
      minuteStep = 1,
      name,
      onChange,
      readOnly = false,
      value: valueArg,
      ...rest
    },
    refArg,
  ) => {
    const { theme, passThemeFlag } = useThemeValue();
    const announce = useContext(AnnounceContext);
    const { format: formatMessage } = useContext(MessageContext);
    const formContext = useContext(FormContext);
    const { useFormInput } = formContext;

    const inputRef = useForwardedRef(refArg);
    const containerRef = useRef();

    const [value, setValue] = useFormInput({
      name,
      value: valueArg,
      initialValue: defaultValue || '',
    });

    const { inForm } = formContext.useFormField({});
    const formFieldLabelId = inForm && id ? `grommet-${id}__label` : undefined;
    const groupLabel = formFieldLabelId
      ? undefined
      : formatMessage({ id: 'timeInput.inputLabel', messages });

    const [open, setOpen] = useState(false);
    const [iconFocused, setIconFocused] = useState(false);
    const [segmentFocused, setSegmentFocused] = useState(false);
    const segmentRefs = useRef({});

    const {
      // Keep internal visual parity with TextInput/Form behavior while
      // maintaining the agreed external TimeInput API surface.
      plain: plainProp,
      focusIndicator: focusIndicatorProp,
      ...inputRest
    } = rest;

    const normalizedMinuteStep = useMemo(
      () => normalizeStep(minuteStep),
      [minuteStep],
    );

    const handleInvalid = useCallback(() => {
      const error = formatMessage({ id: 'timeInput.invalidTime', messages });
      announce(error, 'assertive');
    }, [announce, formatMessage, messages]);

    const announceCurrentValue = useCallback(
      (nextSections) => {
        if (
          nextSections.hour === undefined ||
          nextSections.minute === undefined ||
          nextSections.second === undefined
        )
          return;

        const period = format === '12' ? ` ${nextSections.period || 'AM'}` : '';

        announce(
          formatMessage({
            id: 'timeInput.currentValue',
            messages,
            values: {
              hour: nextSections.hour,
              minute: nextSections.minute,
              second: nextSections.second,
              period,
            },
          }),
          'polite',
        );
      },
      [announce, format, formatMessage, messages],
    );

    const sectionOrder = useMemo(() => getSectionOrder(format), [format]);

    const firstSection = sectionOrder[0] || SECTION_HOUR;
    const lastSection = sectionOrder[sectionOrder.length - 1] || SECTION_HOUR;

    const {
      activeSection,
      applyDigit,
      clearActiveSection,
      commitSections,
      displayValue,
      incrementSection,
      moveSection,
      parsePasted,
      sections,
      setActiveSection,
      setSectionValue,
      pendingDigits,
    } = useSectionedTimeField({
      format,
      sectionOrder,
      minuteStep: normalizedMinuteStep,
      value,
      onCommit: (_nextSections, nextValue) => {
        if (!nextValue) {
          setValue('');
          onChange?.({ value: undefined });
          return;
        }

        setValue(nextValue);
        onChange?.({ value: nextValue });
        announceCurrentValue(_nextSections);
      },
      onInvalid: handleInvalid,
    });

    // Builds the announcement text for a given section: its current value
    // (e.g. "3 hours") if it has one, or just the section name (e.g. "hours
    // selected") when it doesn't yet. Called explicitly on every navigation
    // and edit interaction so screen readers hear meaningful feedback instead
    // of the raw separator/placeholder characters in the native input value.
    const getSectionValueAnnouncement = useCallback(
      (section) => {
        const sectionName = getSectionName(
          section,
          format,
          formatMessage,
          messages,
        );

        if (section === SECTION_PERIOD) {
          if (sections.period === undefined) {
            return formatMessage({
              id: 'timeInput.activeSection',
              messages,
              values: { section: sectionName },
            });
          }

          return formatMessage({
            id: 'timeInput.activePeriodValue',
            messages,
            values: { period: sections.period },
          });
        }

        const sectionKey = getSectionKey(section);
        const sectionValue = sections[sectionKey];

        if (sectionValue === undefined) {
          return formatMessage({
            id: 'timeInput.activeSection',
            messages,
            values: { section: sectionName },
          });
        }

        return formatMessage({
          id: 'timeInput.activeSectionValue',
          messages,
          values: {
            value: sectionValue,
            section: sectionName,
          },
        });
      },
      [format, formatMessage, messages, sections],
    );

    const focusSection = useCallback((section) => {
      const target = segmentRefs.current[section];
      if (target) {
        target.focus();
      }
    }, []);

    const placeholder = useMemo(
      () => buildPlaceholder(sectionOrder),
      [sectionOrder],
    );
    const inputValue = displayValue || placeholder;
    const hasDisplayValue = !!displayValue;
    const displaySections = useMemo(() => {
      // Merge sections with pending digits for display
      const displaySectionsData = { ...sections };
      const pendingSection = Object.keys(pendingDigits)[0];
      if (pendingSection && pendingDigits[pendingSection] !== undefined) {
        displaySectionsData[pendingSection] = pendingDigits[pendingSection];
      }

      return sectionOrder.map((section, index) => {
        const key = getDisplaySectionKey(section);

        return {
          section,
          prefix: getDisplaySectionPrefix(section, index),
          text: getDisplaySectionText({
            key,
            section,
            sections: displaySectionsData,
          }),
          filled: displaySectionsData[key] !== undefined,
        };
      });
    }, [sectionOrder, sections, pendingDigits]);

    const onDisplaySectionMouseDown = useCallback(
      (section, event) => {
        if (readOnly) return;
        if (disabled) return;
        if (event.button !== 0) return;
        if (event.defaultPrevented) return;
        event.preventDefault();
        event.stopPropagation();
        setSegmentFocused(true);
        setActiveSection(section);
        focusSection(section);
      },
      [disabled, focusSection, readOnly, setSegmentFocused, setActiveSection],
    );

    const onDisplayMouseDown = useCallback(
      (event) => {
        if (readOnly) return;
        if (event.button !== 0) return;
        if (event.defaultPrevented) return;

        const sectionNode = event.target.closest?.('[data-section]');
        if (sectionNode?.dataset?.section !== undefined) {
          const section = Number(sectionNode.dataset.section);
          if (!Number.isNaN(section)) {
            onDisplaySectionMouseDown(section, event);
            return;
          }
        }

        const nodes = Array.from(
          event.currentTarget.querySelectorAll('[data-section]'),
        );

        if (nodes.length) {
          const x = event.clientX;

          const sectionsWithRects = nodes
            .map((node) => ({
              node,
              rect: node.getBoundingClientRect(),
            }))
            .sort((a, b) => a.rect.left - b.rect.left);

          const sectionFromBounds = sectionsWithRects.find(
            ({ rect }) => x >= rect.left && x <= rect.right,
          );

          if (sectionFromBounds?.node?.dataset?.section !== undefined) {
            const section = Number(sectionFromBounds.node.dataset.section);
            if (!Number.isNaN(section)) {
              onDisplaySectionMouseDown(section, event);
              return;
            }
          }

          const zones = sectionsWithRects.map(({ rect }, index) => {
            const prev = sectionsWithRects[index - 1];
            const next = sectionsWithRects[index + 1];

            const start =
              prev !== undefined
                ? (prev.rect.right + rect.left) / 2
                : Number.NEGATIVE_INFINITY;
            const end =
              next !== undefined
                ? (rect.right + next.rect.left) / 2
                : Number.POSITIVE_INFINITY;

            return { index, start, end };
          });

          const zone =
            zones.find(({ start, end }) => x >= start && x <= end) ||
            zones[0] ||
            null;

          if (zone) {
            const matched = sectionsWithRects[zone.index]?.node;
            if (matched?.dataset?.section !== undefined) {
              const section = Number(matched.dataset.section);
              if (!Number.isNaN(section)) {
                onDisplaySectionMouseDown(section, event);
                return;
              }
            }
          }
        }

        event.preventDefault();
        setSegmentFocused(true);
        setActiveSection(firstSection);
        focusSection(firstSection);
      },
      [
        firstSection,
        focusSection,
        onDisplaySectionMouseDown,
        readOnly,
        setSegmentFocused,
        setActiveSection,
      ],
    );

    const openPicker = useCallback(() => {
      if (disabled || readOnly) return;
      setActiveSection(firstSection);
      setOpen(true);
    }, [disabled, firstSection, readOnly, setActiveSection]);

    const closePicker = useCallback(() => {
      setOpen(false);
      setTimeout(() => {
        focusSection(activeSection);
      }, 0);
    }, [activeSection, focusSection]);

    const onSegmentFocus = useCallback(
      (section) => {
        if (!segmentFocused && !readOnly && !disabled && !open) {
          announce(formatMessage({ id: 'timeInput.openDrop', messages }));
        }
        setSegmentFocused(true);
        if (readOnly || disabled) return;
        setActiveSection(section);
      },
      [
        announce,
        disabled,
        formatMessage,
        messages,
        open,
        readOnly,
        segmentFocused,
        setActiveSection,
      ],
    );

    const onSegmentBlur = useCallback(() => {
      requestAnimationFrame(() => {
        const { activeElement } = document;
        const isSegmentFocused = Object.values(segmentRefs.current).includes(
          activeElement,
        );
        if (
          !isSegmentFocused &&
          activeElement === document.body &&
          !readOnly &&
          !disabled
        ) {
          focusSection(activeSection);
          return;
        }
        if (!isSegmentFocused) {
          setSegmentFocused(false);
        }
      });
    }, [activeSection, disabled, focusSection, readOnly]);

    const onSegmentKeyDown = useCallback(
      (section, event) => {
        if (readOnly || disabled) return;
        const { key } = event;

        if (activeSection !== section) {
          setActiveSection(section);
        }

        if (key === 'ArrowRight') {
          event.preventDefault();
          const next = moveSection(1);
          setActiveSection(next);
          focusSection(next);
          return;
        }
        if (key === 'ArrowLeft') {
          event.preventDefault();
          const next = moveSection(-1);
          setActiveSection(next);
          focusSection(next);
          return;
        }
        if (key === 'Home') {
          event.preventDefault();
          setActiveSection(firstSection);
          focusSection(firstSection);
          return;
        }
        if (key === 'End') {
          event.preventDefault();
          setActiveSection(lastSection);
          focusSection(lastSection);
          return;
        }
        if (key === 'ArrowUp') {
          event.preventDefault();
          incrementSection(section, open ? -1 : 1);
          return;
        }
        if (key === 'ArrowDown') {
          if (event.altKey) {
            event.preventDefault();
            openPicker();
            return;
          }
          event.preventDefault();
          incrementSection(section, open ? 1 : -1);
          return;
        }
        if (key === 'Delete' || key === 'Backspace') {
          event.preventDefault();
          clearActiveSection();
          return;
        }
        if (key === 'Enter') {
          event.preventDefault();
          if (open) closePicker();
          return;
        }
        if (key === 'Escape' && open) {
          event.preventDefault();
          closePicker();
          return;
        }
        if (key === ' ' || key === 'Spacebar') {
          event.preventDefault();
          openPicker();
          return;
        }

        if (format === '12' && section === SECTION_PERIOD) {
          const lower = key.toLowerCase();
          if (lower === 'a') {
            event.preventDefault();
            setSectionValue(SECTION_PERIOD, 'AM');
          } else if (lower === 'p') {
            event.preventDefault();
            setSectionValue(SECTION_PERIOD, 'PM');
          }
          return;
        }

        if (/^\d$/.test(key)) {
          event.preventDefault();
          const next = applyDigit(Number(key));
          const targetSection = next ?? section;
          setActiveSection(targetSection);
          if (targetSection === section) {
            event.currentTarget.focus();
          } else {
            focusSection(targetSection);
          }
        }
      },
      [
        activeSection,
        applyDigit,
        clearActiveSection,
        closePicker,
        disabled,
        firstSection,
        focusSection,
        format,
        incrementSection,
        lastSection,
        moveSection,
        open,
        openPicker,
        readOnly,
        setActiveSection,
        setSectionValue,
      ],
    );

    useEffect(() => {
      if (!segmentFocused) return;
      if (readOnly || disabled) return;

      const activeSegment = segmentRefs.current[activeSection];
      if (activeSegment && document.activeElement !== activeSegment) {
        activeSegment.focus();
      }
    }, [activeSection, disabled, readOnly, segmentFocused]);

    const onSegmentPaste = useCallback(
      (event) => {
        if (readOnly) {
          event.preventDefault();
          return;
        }
        const pasted = event.clipboardData.getData('text');
        const parsed = parsePasted(pasted);
        if (!parsed) {
          handleInvalid();
          event.preventDefault();
          return;
        }

        commitSections(parsed);
        event.preventDefault();
      },
      [commitSections, handleInvalid, parsePasted, readOnly],
    );

    const hoursOptions = useMemo(
      () =>
        Array.from({ length: format === '12' ? 12 : 24 }, (_, index) =>
          format === '12' ? index + 1 : index,
        ),
      [format],
    );

    const minuteOptions = useMemo(
      () =>
        Array.from(
          { length: Math.ceil(60 / normalizedMinuteStep) },
          (_, index) => index * normalizedMinuteStep,
        ).filter((valueAtIndex) => valueAtIndex < 60),
      [normalizedMinuteStep],
    );

    const secondOptions = useMemo(
      () => Array.from({ length: 60 }, (_, index) => index),
      [],
    );

    const showActiveSection =
      (segmentFocused || open) && !readOnly && !disabled;

    return (
      <Keyboard onEsc={open ? closePicker : undefined}>
        <Box>
          <StyledTimeInputContainer
            ref={containerRef}
            direction="row"
            border={!plainProp}
            fill
            round={
              theme.timeInput?.container?.round ||
              theme.global?.control?.border?.radius
            }
            disabled={disabled}
            readOnlyProp={readOnly}
            focusIndicator={(focusIndicatorProp ?? true) && !iconFocused}
            {...passThemeFlag}
          >
            <StyledTimeInputField {...passThemeFlag}>
              <StyledTimeInputDisplay
                role="group"
                aria-label={groupLabel}
                aria-labelledby={formFieldLabelId}
                onMouseDown={onDisplayMouseDown}
                {...passThemeFlag}
              >
                {displaySections.map(({ section, prefix, text, filled }) => (
                  <React.Fragment key={section}>
                    {!!prefix && (
                      <StyledTimeInputSeparator
                        $filled={hasDisplayValue}
                        {...passThemeFlag}
                      >
                        {prefix}
                      </StyledTimeInputSeparator>
                    )}
                    <StyledTimeInputSegment
                      ref={(segmentNode) => {
                        segmentRefs.current[section] = segmentNode;
                      }}
                      tabIndex={
                        !readOnly && !disabled && activeSection === section
                          ? 0
                          : -1
                      }
                      $active={showActiveSection && activeSection === section}
                      $filled={filled}
                      onFocus={() => onSegmentFocus(section)}
                      onBlur={onSegmentBlur}
                      onKeyDown={(event) => onSegmentKeyDown(section, event)}
                      onPaste={onSegmentPaste}
                      data-active={
                        showActiveSection && activeSection === section
                      }
                      data-testid={
                        showActiveSection && activeSection === section
                          ? 'time-input-active-section'
                          : undefined
                      }
                      data-section={section}
                      {...passThemeFlag}
                      aria-label={getSectionName(
                        section,
                        format,
                        formatMessage,
                        messages,
                      )}
                      role="spinbutton"
                      aria-disabled={disabled || undefined}
                      aria-readonly={readOnly || undefined}
                      aria-valuenow={
                        getSectionAriaMeta({ section, format, sections }).now
                      }
                      aria-valuemin={
                        getSectionAriaMeta({ section, format, sections }).min
                      }
                      aria-valuemax={
                        getSectionAriaMeta({ section, format, sections }).max
                      }
                      aria-valuetext={getSectionValueAnnouncement(section)}
                    >
                      {text}
                    </StyledTimeInputSegment>
                  </React.Fragment>
                ))}
              </StyledTimeInputDisplay>
              <StyledTimeInput
                tabIndex={-1}
                {...inputRest}
                id={id}
                ref={inputRef}
                value={inputValue}
                aria-hidden="true"
                disabled={disabled}
                readOnly
                focusIndicator={false}
                plain
              />
            </StyledTimeInputField>
            {name && (
              <input
                aria-hidden="true"
                name={name}
                readOnly
                tabIndex={-1}
                type="hidden"
                value={value || ''}
              />
            )}
            {!readOnly && (
              <Button
                icon={<GrommetClockIcon />}
                plain
                disabled={disabled}
                margin={theme.timeInput?.button?.margin}
                aria-label={formatMessage({
                  id: 'timeInput.chooseTime',
                  messages,
                })}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={id ? `${id}__drop` : undefined}
                onFocus={() => {
                  setIconFocused(true);
                }}
                onBlur={() => {
                  setIconFocused(false);
                }}
                onClick={open ? closePicker : openPicker}
              />
            )}
          </StyledTimeInputContainer>
          {open && (
            <TimeInputPopup
              activeSection={activeSection}
              align={{ top: 'bottom', left: 'left' }}
              dropProps={{ stretch: false }}
              format={format}
              formatMessage={formatMessage}
              hoursOptions={hoursOptions}
              id={id}
              incrementSection={incrementSection}
              label={formatMessage({ id: 'timeInput.chooseTime', messages })}
              messages={messages}
              minuteOptions={minuteOptions}
              moveSection={moveSection}
              sectionOrder={sectionOrder}
              onClose={closePicker}
              onFocusLeave={closePicker}
              secondOptions={secondOptions}
              sections={sections}
              setActiveSection={setActiveSection}
              setSectionValue={setSectionValue}
              target={containerRef.current}
            />
          )}
        </Box>
      </Keyboard>
    );
  },
);

TimeInput.displayName = 'TimeInput';
TimeInput.propTypes = TimeInputPropTypes;

export { TimeInput };
