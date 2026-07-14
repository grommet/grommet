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
import { getActiveSectionAriaMeta } from './timeInputA11y';
import {
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

const buildSectionRanges = (sectionOrder) => {
  let cursor = 0;
  return sectionOrder.map((section, index) => {
    const start = cursor;
    const end = start + 2;

    cursor = end;

    if (index < sectionOrder.length - 1) {
      cursor += 1;
    }

    return [start, end];
  });
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

const TimeInput = forwardRef(
  (
    {
      defaultValue,
      disabled,
      format = '24',
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
    const { useFormInput } = useContext(FormContext);

    const inputRef = useForwardedRef(refArg);
    const containerRef = useRef();
    const internalSelectionRef = useRef(false);
    const displayMouseDownRef = useRef(false);
    const displaySectionRef = useRef();
    const displayMouseDownCleanupRef = useRef();

    const [value, setValue] = useFormInput({
      name,
      value: valueArg,
      initialValue: defaultValue || '',
    });

    const [open, setOpen] = useState(false);
    const [iconFocused, setIconFocused] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

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
        ) {
          return;
        }

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

    const ranges = useMemo(
      () => buildSectionRanges(sectionOrder),
      [sectionOrder],
    );
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

    const activeSectionValueText = useMemo(() => {
      if (activeSection === SECTION_PERIOD) return sections.period || 'AM';

      const sectionName = getSectionName(activeSection, format);
      let sectionValue;
      if (activeSection === SECTION_HOUR) sectionValue = sections.hour;
      else if (activeSection === SECTION_MINUTE) sectionValue = sections.minute;
      else sectionValue = sections.second;

      if (sectionValue === undefined) return sectionName;
      return `${sectionValue} ${sectionName}`;
    }, [activeSection, format, sections]);

    const activeSectionAriaMeta = useMemo(
      () => getActiveSectionAriaMeta({ activeSection, format, sections }),
      [activeSection, format, sections],
    );

    const resolveSectionFromCursor = useCallback(
      (cursor) => {
        if (cursor === null || cursor === undefined) return firstSection;

        for (let i = 0; i < ranges.length; i += 1) {
          const [start, end] = ranges[i];

          if (cursor >= start && cursor < end) {
            return sectionOrder[i] || firstSection;
          }

          // Cursor on a separator should move to the next editable section.
          if (cursor === end) {
            const nextIndex = Math.min(i + 1, ranges.length - 1);
            return sectionOrder[nextIndex] || firstSection;
          }

          if (cursor < start) return sectionOrder[i] || firstSection;
        }

        return sectionOrder[ranges.length - 1] || firstSection;
      },
      [firstSection, ranges, sectionOrder],
    );

    const getSectionRange = useCallback(
      (section) => {
        const sectionIndex = sectionOrder.indexOf(section);
        if (sectionIndex === -1) return ranges[0];
        return ranges[sectionIndex] || ranges[0];
      },
      [ranges, sectionOrder],
    );

    const selectSectionText = useCallback(
      (section) => {
        const range = getSectionRange(section);
        if (!inputRef.current) return;
        internalSelectionRef.current = true;
        requestAnimationFrame(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(range[0], range[1]);
            requestAnimationFrame(() => {
              internalSelectionRef.current = false;
            });
          }
        });
      },
      [getSectionRange, inputRef],
    );

    const clearDisplayMouseDownSession = useCallback(() => {
      displayMouseDownRef.current = false;
      displaySectionRef.current = undefined;
      if (displayMouseDownCleanupRef.current) {
        displayMouseDownCleanupRef.current();
        displayMouseDownCleanupRef.current = undefined;
      }
    }, []);

    const startDisplayMouseDownSession = useCallback(() => {
      clearDisplayMouseDownSession();
      displayMouseDownRef.current = true;

      const onPointerCancel = () => {
        clearDisplayMouseDownSession();
      };

      window.addEventListener('pointercancel', onPointerCancel, true);

      displayMouseDownCleanupRef.current = () => {
        window.removeEventListener('pointercancel', onPointerCancel, true);
      };
    }, [clearDisplayMouseDownSession]);

    const resolveSectionFromSelection = useCallback(
      (selectionStart, selectionEnd) => {
        if (selectionStart === null || selectionStart === undefined) {
          return firstSection;
        }

        if (
          selectionEnd !== null &&
          selectionEnd !== undefined &&
          selectionEnd - selectionStart > 1
        ) {
          const exactSection = ranges.findIndex(
            ([start, end]) => selectionStart === start && selectionEnd === end,
          );
          if (exactSection >= 0)
            return sectionOrder[exactSection] || firstSection;
        }

        if (
          selectionEnd !== null &&
          selectionEnd !== undefined &&
          selectionEnd - selectionStart === 1 &&
          displayValue?.[selectionStart] &&
          /[^\dA-Za-z]/.test(displayValue[selectionStart])
        ) {
          return resolveSectionFromCursor(selectionStart);
        }

        return resolveSectionFromCursor(selectionStart);
      },
      [
        displayValue,
        firstSection,
        ranges,
        resolveSectionFromCursor,
        sectionOrder,
      ],
    );

    const onDisplaySectionMouseDown = useCallback(
      (section, event) => {
        if (readOnly) return;
        if (event.button !== 0) return;
        if (event.defaultPrevented) return;
        event.preventDefault();
        event.stopPropagation();
        startDisplayMouseDownSession();
        displaySectionRef.current = section;
        inputRef.current?.focus();
        setActiveSection(section);
        selectSectionText(section);
      },
      [
        inputRef,
        readOnly,
        selectSectionText,
        setActiveSection,
        startDisplayMouseDownSession,
      ],
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
        inputRef.current?.focus();
        setActiveSection(firstSection);
        selectSectionText(firstSection);
      },
      [
        firstSection,
        inputRef,
        onDisplaySectionMouseDown,
        readOnly,
        selectSectionText,
        setActiveSection,
      ],
    );

    const openPicker = useCallback(() => {
      if (disabled || readOnly) return;
      setActiveSection(firstSection);
      setOpen(true);
      announce(formatMessage({ id: 'timeInput.enterDrop', messages }));
    }, [
      announce,
      disabled,
      firstSection,
      formatMessage,
      messages,
      readOnly,
      setActiveSection,
    ]);

    const closePicker = useCallback(() => {
      setOpen(false);
      requestAnimationFrame(() => inputRef.current?.focus());
      announce(formatMessage({ id: 'timeInput.exitDrop', messages }));
    }, [announce, formatMessage, messages, inputRef]);

    const onInputFocus = (event) => {
      setInputFocused(true);
      if (readOnly) {
        if (inputRest.onFocus) inputRest.onFocus(event);
        return;
      }

      // When focus is triggered from a display-section click, keep that section
      // selection instead of forcing focus back to the first section.
      if (displayMouseDownRef.current) {
        const clickedSection =
          displaySectionRef.current !== undefined
            ? displaySectionRef.current
            : activeSection;
        setActiveSection(clickedSection);
        selectSectionText(clickedSection);
        if (inputRest.onFocus) inputRest.onFocus(event);
        return;
      }

      setActiveSection(firstSection);
      selectSectionText(firstSection);
      announce(formatMessage({ id: 'timeInput.openDrop', messages }));
      if (inputRest.onFocus) inputRest.onFocus(event);
    };

    const onInputBlur = (event) => {
      clearDisplayMouseDownSession();
      setInputFocused(false);
      if (inputRest.onBlur) inputRest.onBlur(event);
    };

    const onInputClick = (event) => {
      if (displayMouseDownRef.current) {
        const clickedSection =
          displaySectionRef.current !== undefined
            ? displaySectionRef.current
            : activeSection;
        setActiveSection(clickedSection);
        selectSectionText(clickedSection);
        clearDisplayMouseDownSession();
        return;
      }
      if (readOnly) return;

      if (
        !displayValue &&
        event.target.selectionStart === inputValue.length &&
        event.target.selectionEnd === inputValue.length
      ) {
        setActiveSection(firstSection);
        selectSectionText(firstSection);
        return;
      }

      const nextSection = resolveSectionFromSelection(
        event.target.selectionStart,
        event.target.selectionEnd,
      );
      setActiveSection(nextSection);
      selectSectionText(nextSection);
    };

    const onInputSelect = (event) => {
      if (readOnly) return;
      if (displayMouseDownRef.current) return;
      if (internalSelectionRef.current) return;

      const nextSection = resolveSectionFromSelection(
        event.target.selectionStart,
        event.target.selectionEnd,
      );
      const [start, end] = getSectionRange(nextSection) || [];

      if (
        event.target.selectionStart === start &&
        event.target.selectionEnd === end &&
        activeSection === nextSection
      ) {
        return;
      }

      setActiveSection(nextSection);
      selectSectionText(nextSection);
    };

    useEffect(() => {
      const onSelectionChange = () => {
        if (readOnly) return;
        if (displayMouseDownRef.current) return;
        const inputElement = inputRef.current;
        if (!inputElement || document.activeElement !== inputElement) return;
        if (internalSelectionRef.current) return;

        const nextSection = resolveSectionFromSelection(
          inputElement.selectionStart,
          inputElement.selectionEnd,
        );
        const [start, end] = getSectionRange(nextSection) || [];

        if (
          inputElement.selectionStart === start &&
          inputElement.selectionEnd === end &&
          activeSection === nextSection
        ) {
          return;
        }

        setActiveSection(nextSection);
        selectSectionText(nextSection);
      };

      document.addEventListener('selectionchange', onSelectionChange);
      return () => {
        document.removeEventListener('selectionchange', onSelectionChange);
      };
    }, [
      activeSection,
      getSectionRange,
      inputRef,
      resolveSectionFromSelection,
      readOnly,
      selectSectionText,
      setActiveSection,
    ]);

    useEffect(
      () => () => {
        clearDisplayMouseDownSession();
      },
      [clearDisplayMouseDownSession],
    );

    const onInputPaste = (event) => {
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
    };

    const onInputKeyDown = (event) => {
      if (readOnly) return;
      const { key } = event;

      if (key === 'ArrowRight') {
        event.preventDefault();
        const next = moveSection(1);
        setActiveSection(next);
        selectSectionText(next);
        return;
      }
      if (key === 'ArrowLeft') {
        event.preventDefault();
        const next = moveSection(-1);
        setActiveSection(next);
        selectSectionText(next);
        return;
      }
      if (key === 'Home') {
        event.preventDefault();
        setActiveSection(firstSection);
        selectSectionText(firstSection);
        return;
      }
      if (key === 'End') {
        event.preventDefault();
        setActiveSection(lastSection);
        selectSectionText(lastSection);
        return;
      }
      if (key === 'ArrowUp') {
        event.preventDefault();
        incrementSection(activeSection, open ? -1 : 1);
        selectSectionText(activeSection);
        return;
      }
      if (key === 'ArrowDown') {
        if (event.altKey) {
          event.preventDefault();
          openPicker();
          return;
        }
        event.preventDefault();
        incrementSection(activeSection, open ? 1 : -1);
        selectSectionText(activeSection);
        return;
      }
      if (key === 'Delete' || key === 'Backspace') {
        event.preventDefault();
        clearActiveSection();
        selectSectionText(activeSection);
        return;
      }
      if (key === 'Enter') {
        event.preventDefault();
        if (open) {
          closePicker();
        }
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

      if (format === '12' && activeSection === SECTION_PERIOD) {
        const lower = key.toLowerCase();
        if (lower === 'a') {
          event.preventDefault();
          setSectionValue(SECTION_PERIOD, 'AM');
          selectSectionText(SECTION_PERIOD);
        } else if (lower === 'p') {
          event.preventDefault();
          setSectionValue(SECTION_PERIOD, 'PM');
          selectSectionText(SECTION_PERIOD);
        }
        return;
      }

      if (/^\d$/.test(key)) {
        event.preventDefault();
        const next = applyDigit(Number(key));
        if (next !== undefined) {
          setActiveSection(next);
          selectSectionText(next);
        }
      }
    };

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

    const showActiveSection = (inputFocused || open) && !readOnly && !disabled;

    return (
      <Keyboard onEsc={open ? closePicker : undefined}>
        <Box>
          <StyledTimeInputContainer
            ref={containerRef}
            direction="row"
            border={!plainProp}
            fill
            round={
              theme.global?.control?.border?.radius ||
              theme.timeInput?.container?.round
            }
            disabled={disabled}
            readOnlyProp={readOnly}
            focusIndicator={(focusIndicatorProp ?? true) && !iconFocused}
            {...passThemeFlag}
          >
            <StyledTimeInputField {...passThemeFlag}>
              <StyledTimeInputDisplay
                aria-hidden="true"
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
                      $active={showActiveSection && activeSection === section}
                      $filled={filled}
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
                    >
                      {text}
                    </StyledTimeInputSegment>
                  </React.Fragment>
                ))}
              </StyledTimeInputDisplay>
              <StyledTimeInput
                {...inputRest}
                id={id}
                ref={inputRef}
                value={inputValue}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onClick={onInputClick}
                onSelect={onInputSelect}
                onKeyDown={onInputKeyDown}
                onPaste={onInputPaste}
                placeholder={placeholder}
                role="spinbutton"
                aria-label={formatMessage({
                  id: 'timeInput.inputLabel',
                  messages,
                })}
                aria-valuenow={activeSectionAriaMeta.now}
                aria-valuemin={activeSectionAriaMeta.min}
                aria-valuemax={activeSectionAriaMeta.max}
                aria-valuetext={
                  activeSectionValueText || displayValue || placeholder
                }
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
                margin={{ right: theme.timeInput?.button?.margin }}
                aria-label={formatMessage({
                  id: 'timeInput.chooseTime',
                  messages,
                })}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={id ? `${id}__drop` : undefined}
                onFocus={() => {
                  setIconFocused(true);
                  setInputFocused(false);
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
              hoursOptions={hoursOptions}
              id={id}
              incrementSection={incrementSection}
              label={formatMessage({ id: 'timeInput.chooseTime', messages })}
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
