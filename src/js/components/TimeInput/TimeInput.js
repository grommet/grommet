import React, {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import { Clock as GrommetClockIcon } from 'grommet-icons/icons/Clock';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { AnnounceContext } from '../../contexts/AnnounceContext';
import { MessageContext } from '../../contexts/MessageContext';
import { useForwardedRef } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormContext } from '../Form';

import {
  StyledTimeInputContainer,
  StyledTimeInputField,
  StyledTimeInputSegment,
  StyledTimeInputSeparator,
} from './StyledTimeInput';
import { TimeInputPopup } from './TimeInputPopup';
import { TimeInputPropTypes } from './propTypes';
import { useSectionedTimeField } from './useSectionedTimeField';
import {
  getActiveSectionAriaMeta,
  getSectionName,
  pad,
  sectionKey,
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

    // fieldRef is the forwarded external ref; points to the sections container.
    const fieldRef = useForwardedRef(refArg);
    const containerRef = useRef();
    // Map of section constant to DOM span element.
    const sectionRefMap = useRef({});
    // Used by the blur-timeout focus tracking (see onFieldFocus/onFieldBlur).
    const blurTimeoutRef = useRef(null);
    // Ref that stays true while the field has (or should have) focus, even
    // during the brief window where React changing tabIndex from 0 to -1 on
    // the active span causes the browser to move focus to <body> before
    // useLayoutEffect can redirect it to the correct span.
    const isFieldFocusedRef = useRef(false);
    // Mirrors activeSection each render so onFieldBlur closure is never stale.
    const activeSectionRef = useRef(null);
    // Set to true immediately before any keystroke that mutates DOM state
    // (digit entry, ArrowUp/Down, Delete/Backspace, a/p for period).
    // Lets onFieldBlur identify spurious blurs (caused by React re-renders)
    // without relying on document.activeElement, which external frames like
    // the Storybook toolbar can steal and thus invalidate.
    const justTypedRef = useRef(false);
    // Set by moveFocusToSection to the section that should receive focus on
    // the *next* commit (i.e. the render that reflects the just-requested
    // activeSection change). Consumed synchronously inside the useLayoutEffect
    // below, which focuses that section span as soon as its updated
    // tabIndex/attributes have been committed to the DOM - before the browser
    // paints and before any native blur/focus events the tabIndex change may
    // trigger. Using useLayoutEffect instead of requestAnimationFrame closes
    // the one-frame window during which the browser could otherwise move
    // focus to <body> on its own (observed in real browsers/Storybook, but
    // not reproducible in jsdom) - this is what caused digit entry (e.g.
    // typing "11" or "12" in the hours section) to sometimes require an
    // extra keystroke. While non-null, onFieldBlur ignores blur events
    // entirely and lets this effect be the single source of truth for where
    // focus ends up.
    const pendingFocusSectionRef = useRef(null);

    const [value, setValue] = useFormInput({
      name,
      value: valueArg,
      initialValue: defaultValue || '',
    });

    const [open, setOpen] = useState(false);
    const [iconFocused, setIconFocused] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);

    const {
      plain: plainProp,
      focusIndicator: focusIndicatorProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...fieldRest
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

    const hasDisplayValue = useMemo(
      () => sectionOrder.some((s) => sections[sectionKey(s)] !== undefined),
      [sectionOrder, sections],
    );

    // Compute per-section display data (text, ARIA metadata) in one pass.
    const displaySections = useMemo(() => {
      const displaySectionsData = { ...sections };
      const pendingSection = Object.keys(pendingDigits)[0];
      if (pendingSection && pendingDigits[pendingSection] !== undefined) {
        displaySectionsData[pendingSection] = pendingDigits[pendingSection];
      }

      return sectionOrder.map((section, index) => {
        const key = getDisplaySectionKey(section);
        const ariaMeta = getActiveSectionAriaMeta({
          activeSection: section,
          format,
          sections,
        });
        const sectionValue = sections[key];
        // aria-valuetext: human-readable value announced by VoiceOver.
        let valueText;
        if (section === SECTION_PERIOD) {
          valueText = sections.period || 'AM';
        } else if (sectionValue === undefined) {
          valueText = getSectionName(section, format);
        } else {
          valueText = `${sectionValue} ${getSectionName(section, format)}`;
        }

        return {
          section,
          prefix: getDisplaySectionPrefix(section, index),
          text: getDisplaySectionText({
            key,
            section,
            sections: displaySectionsData,
          }),
          filled: displaySectionsData[key] !== undefined,
          ariaMeta,
          valueText,
          isFirst: index === 0,
        };
      });
    }, [sectionOrder, sections, pendingDigits, format]);

    // Always keep activeSectionRef in sync (used by onFieldBlur below).
    activeSectionRef.current = activeSection;

    // Focus the DOM span for a given section constant.
    const focusSection = useCallback((section) => {
      sectionRefMap.current[section]?.focus({ preventScroll: true });
    }, []);

    // Centralizes intentional section-to-section focus moves (digit entry
    // advancing a section, Arrow/Home/End navigation). Records the target
    // section in pendingFocusSectionRef so onFieldBlur ignores any interim
    // native blur events caused by the section's tabIndex/text changing.
    //
    // React 19 batches state updates automatically, including updates spread
    // across multiple event handler invocations that happen to run before
    // the browser yields (e.g. fast/rapid typing, or a key that auto-repeats
    // faster than a paint). Without flushSync, the render + DOM commit for
    // one keystroke's section change could still be pending when the *next*
    // keystroke's handler runs, so pendingFocusSectionRef/activeSection get
    // overwritten before the earlier transition's blur/focus events (and the
    // useLayoutEffect focus-commit below) have actually fired - the DOM and
    // our refs disagree about which section should be focused. This is
    // invisible in jsdom/@testing-library tests because userEvent wraps each
    // keystroke in act(), which forces a synchronous flush between
    // keystrokes that real browsers don't guarantee.
    //
    // flushSync forces React to render and commit (including layout
    // effects) synchronously before this function returns, so by the time
    // the keydown handler hands control back to the browser, the DOM,
    // pendingFocusSectionRef, and activeSection are always in agreement -
    // regardless of how fast subsequent keystrokes arrive.
    const moveFocusToSection = useCallback(
      (section) => {
        pendingFocusSectionRef.current = section;
        flushSync(() => {
          setActiveSection(section);
        });
      },
      [setActiveSection],
    );

    // Safety-net: runs after every render to restore focus to the active
    // section span when it escaped to document.body during React
    // reconciliation (e.g. tabIndex or className change on the focused span).
    // We run with no deps so digit-entry renders (which change sections /
    // pendingDigits but not activeSection) are also covered.
    // Guards prevent stealing focus from legitimate external elements.
    useLayoutEffect(() => {
      if (!isFieldFocusedRef.current) return;
      const span = sectionRefMap.current[activeSection];
      if (!span) return;

      // An intentional section-to-section move is in flight (see
      // moveFocusToSection): this render is the one reflecting the new
      // activeSection, so focus it now, synchronously, before the browser
      // paints or has a chance to move focus to <body> on its own.
      if (pendingFocusSectionRef.current === activeSection) {
        // IMPORTANT: keep pendingFocusSectionRef set *through* the focus()
        // call below. Calling span.focus() synchronously dispatches the
        // native blur event on the previously-focused span (e.g. the prior
        // section, whose tabIndex just flipped to -1) before focus() even
        // returns. onFieldBlur relies on pendingFocusSectionRef being
        // non-null to recognize that blur as part of this intentional
        // transition and ignore it. Clearing the ref before calling focus()
        // left a gap where that blur event was treated as "spurious" and
        // triggered a fight over which section should end up focused - this
        // is what caused focus to jump/bounce between sections during
        // multi-digit entry (e.g. typing "04" for hours then moving to
        // minutes).
        if (document.activeElement !== span) {
          span.focus({ preventScroll: true });
        }
        pendingFocusSectionRef.current = null;
        return;
      }

      if (document.activeElement === span) return;
      if (
        document.activeElement === document.body ||
        document.activeElement === document.documentElement
      ) {
        span.focus({ preventScroll: true });
      }
    });

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
      requestAnimationFrame(() => focusSection(activeSection));
      announce(formatMessage({ id: 'timeInput.exitDrop', messages }));
    }, [activeSection, announce, focusSection, formatMessage, messages]);

    // Handle Escape on the outer container so that it fires even when the
    // clock-icon button has focus (its keydown events don't bubble through
    // StyledTimeInputField). Using a direct onKeyDown avoids the cloneElement
    // instability that the Keyboard wrapper introduced.
    const onContainerKeyDown = useCallback(
      (event) => {
        const key = event.keyCode ? event.keyCode : event.which;
        if (key === 27 /* Escape */ && open) {
          closePicker();
        }
      },
      [closePicker, open],
    );

    // Detect focus entering/leaving the field as a whole using the blur
    // timeout pattern. Deferring setInputFocused(false) to a setTimeout
    // means that if focus moves between section spans (or any other element
    // inside the field), the subsequent focus event cancels the timeout
    // before it fires — so inputFocused stays true throughout. This is more
    // robust than checking relatedTarget, which can be null in some browsers
    // when tabIndex changes trigger intermediate blur events.
    const onFieldFocus = useCallback(
      (event) => {
        isFieldFocusedRef.current = true;
        const isInternalTransition = blurTimeoutRef.current !== null;
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
        setInputFocused(true);
        if (!isInternalTransition) {
          announce(formatMessage({ id: 'timeInput.openDrop', messages }));
          onFocusProp?.(event);
        }
      },
      [announce, formatMessage, messages, onFocusProp],
    );

    const onFieldBlur = useCallback(
      (event) => {
        // Ignore blur events that fire as a side effect of a focus move we
        // triggered ourselves via moveFocusToSection. The useLayoutEffect
        // above is the single source of truth for where focus should land
        // once that transition's render commits; reacting here too creates
        // the race that caused digit entry to need an extra keystroke.
        if (pendingFocusSectionRef.current !== null) return;

        const { relatedTarget } = event;

        // Internal focus transition: focus moved within our container
        // (e.g., between section spans or to the clock button).
        // Use the -1 sentinel so onFieldFocus sees isInternalTransition=true
        // and suppresses the re-announcement / onFocusProp call.
        if (relatedTarget && containerRef.current?.contains(relatedTarget)) {
          justTypedRef.current = false;
          clearTimeout(blurTimeoutRef.current);
          blurTimeoutRef.current = -1; // sentinel: suppress re-announcement
          return;
        }

        // Spurious DOM-mutation blur: React changed an attribute or text node
        // on the focused span, causing the browser to drop focus to body/null.
        // We detect this by checking justTypedRef (set on every keystroke that
        // mutates state) rather than document.activeElement, which external
        // frames (e.g. the Storybook toolbar) can steal before our handler
        // runs, making the activeElement check unreliable.
        if (
          isFieldFocusedRef.current &&
          justTypedRef.current &&
          (!relatedTarget ||
            relatedTarget === document.body ||
            relatedTarget === document.documentElement)
        ) {
          justTypedRef.current = false;
          clearTimeout(blurTimeoutRef.current);
          blurTimeoutRef.current = -1; // sentinel for onFieldFocus
          sectionRefMap.current[activeSectionRef.current]?.focus({
            preventScroll: true,
          });
          return;
        }

        // Real blur: focus genuinely left the component.
        justTypedRef.current = false;
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = setTimeout(() => {
          isFieldFocusedRef.current = false;
          blurTimeoutRef.current = null;
          setInputFocused(false);
          onBlurProp?.(event);
        }, 0);
      },
      [onBlurProp],
    );

    const onFieldPaste = useCallback(
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

    const onFieldKeyDown = useCallback(
      (event) => {
        if (readOnly) return;
        const { key } = event;

        // Stop every key we handle from bubbling past this component. This
        // widget fully owns keyboard interaction for its keys (digits,
        // arrows, Home/End, Delete/Backspace, Enter/Escape, Space, a/p), so
        // ancestor listeners should never also react to them. This matters
        // in particular inside Storybook's manager UI: Storybook's preview
        // registers a window-level keydown handler that forwards any
        // keystroke not targeting a native <input>/<textarea>/contentEditable
        // element to the manager, where bare digit keys ("1", "2", "3") are
        // bound to global shortcuts (focusNav/focusIframe/focusPanel).
        // Because our sections are <span role="spinbutton">, Storybook does
        // not recognize them as "typing contexts" and steals real page focus
        // away from the field mid-entry (e.g. typing "12" in hours: the "1"
        // triggers focusNav, moving focus to the sidebar, so the following
        // "2" never reaches this handler at all). Calling stopPropagation
        // here prevents the event from ever reaching that listener.
        const handledKey =
          key === 'ArrowRight' ||
          key === 'ArrowLeft' ||
          key === 'Home' ||
          key === 'End' ||
          key === 'ArrowUp' ||
          key === 'ArrowDown' ||
          key === 'Delete' ||
          key === 'Backspace' ||
          key === 'Enter' ||
          (key === 'Escape' && open) ||
          key === ' ' ||
          key === 'Spacebar' ||
          (format === '12' &&
            activeSection === SECTION_PERIOD &&
            /^[ap]$/i.test(key)) ||
          /^\d$/.test(key);
        if (handledKey) event.stopPropagation();

        if (key === 'ArrowRight') {
          event.preventDefault();
          moveFocusToSection(moveSection(1));
          return;
        }
        if (key === 'ArrowLeft') {
          event.preventDefault();
          moveFocusToSection(moveSection(-1));
          return;
        }
        if (key === 'Home') {
          event.preventDefault();
          moveFocusToSection(firstSection);
          return;
        }
        if (key === 'End') {
          event.preventDefault();
          moveFocusToSection(lastSection);
          return;
        }
        if (key === 'ArrowUp') {
          event.preventDefault();
          justTypedRef.current = true;
          const nextVal = incrementSection(activeSection, open ? -1 : 1);
          if (nextVal !== undefined) {
            const sectionName = getSectionName(activeSection, format);
            const formattedVal =
              activeSection === SECTION_PERIOD ? nextVal : pad(nextVal);
            announce(`${formattedVal} ${sectionName}`, 'polite');
          }
          return;
        }
        if (key === 'ArrowDown') {
          if (event.altKey) {
            event.preventDefault();
            openPicker();
            return;
          }
          event.preventDefault();
          justTypedRef.current = true;
          const nextVal = incrementSection(activeSection, open ? 1 : -1);
          if (nextVal !== undefined) {
            const sectionName = getSectionName(activeSection, format);
            const formattedVal =
              activeSection === SECTION_PERIOD ? nextVal : pad(nextVal);
            announce(`${formattedVal} ${sectionName}`, 'polite');
          }
          return;
        }
        if (key === 'Delete' || key === 'Backspace') {
          event.preventDefault();
          justTypedRef.current = true;
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

        if (format === '12' && activeSection === SECTION_PERIOD) {
          const lower = key.toLowerCase();
          if (lower === 'a') {
            event.preventDefault();
            justTypedRef.current = true;
            setSectionValue(SECTION_PERIOD, 'AM');
          } else if (lower === 'p') {
            event.preventDefault();
            justTypedRef.current = true;
            setSectionValue(SECTION_PERIOD, 'PM');
          }
          return;
        }

        if (/^\d$/.test(key)) {
          event.preventDefault();
          justTypedRef.current = true;
          const next = applyDigit(Number(key));
          if (next !== undefined) {
            moveFocusToSection(next);
          }
        }
      },
      [
        activeSection,
        announce,
        applyDigit,
        clearActiveSection,
        closePicker,
        firstSection,
        format,
        incrementSection,
        lastSection,
        moveFocusToSection,
        moveSection,
        open,
        openPicker,
        readOnly,
        setSectionValue,
      ],
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

    const showActiveSection = (inputFocused || open) && !readOnly && !disabled;

    return (
      <Box onKeyDown={onContainerKeyDown}>
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
          {/*
            Each section is its own role="spinbutton" span.
            VoiceOver reads the span's aria-label + aria-valuetext when
            focus moves between sections (real focus change, not cursor
            selection), and re-announces aria-valuetext when it changes
            in place on ArrowUp/Down. No single hidden input needed.
          */}
          <StyledTimeInputField
            ref={fieldRef}
            role="group"
            aria-label={formatMessage({
              id: 'timeInput.inputLabel',
              messages,
            })}
            onFocus={onFieldFocus}
            onBlur={onFieldBlur}
            onKeyDown={onFieldKeyDown}
            onPaste={onFieldPaste}
            {...fieldRest}
            {...passThemeFlag}
          >
            {displaySections.map(
              ({
                section,
                prefix,
                text,
                filled,
                ariaMeta,
                valueText,
                isFirst,
              }) => (
                <React.Fragment key={section}>
                  {!!prefix && (
                    <StyledTimeInputSeparator
                      aria-hidden="true"
                      $filled={hasDisplayValue}
                      {...passThemeFlag}
                    >
                      {prefix}
                    </StyledTimeInputSeparator>
                  )}
                  <StyledTimeInputSegment
                    id={isFirst ? id : undefined}
                    ref={(el) => {
                      sectionRefMap.current[section] = el;
                    }}
                    role="spinbutton"
                    tabIndex={activeSection === section ? 0 : -1}
                    aria-label={getSectionName(section, format)}
                    aria-valuenow={ariaMeta.now}
                    aria-valuemin={ariaMeta.min}
                    aria-valuemax={ariaMeta.max}
                    aria-valuetext={valueText}
                    $active={showActiveSection && activeSection === section}
                    $filled={filled}
                    data-section={section}
                    onFocus={() => setActiveSection(section)}
                    {...passThemeFlag}
                  >
                    {text}
                  </StyledTimeInputSegment>
                </React.Fragment>
              ),
            )}
          </StyledTimeInputField>
          {name && (
            <input
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
    );
  },
);

TimeInput.displayName = 'TimeInput';
TimeInput.propTypes = TimeInputPropTypes;

export { TimeInput };
