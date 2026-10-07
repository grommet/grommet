// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable max-len */
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import {
  backgroundStyle,
  borderStyle,
  edgeStyle,
  elevationStyle,
  focusStyle,
  roundStyle,
} from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

import { Box } from '../Box';
import { Drop } from '../Drop';
import { Text } from '../Text';
import {
  defaultHourForFormat,
  pad,
  getSectionName,
  SECTION_HOUR,
  SECTION_MINUTE,
  SECTION_PERIOD,
  SECTION_SECOND,
} from './utils';

const PopupColumnBox = styled(Box)`
  scrollbar-gutter: stable;
  scrollbar-width: thin;
`;

const PopupOption = styled(Box)`
  cursor: pointer;

  &:hover {
    ${(props) => {
      const { theme, $hoverState, $hoverBackground } = props;
      const responsive =
        props.responsive === undefined ? true : props.responsive;
      const styles = [];

      if ($hoverBackground !== undefined)
        styles.push(backgroundStyle($hoverBackground, theme));
      if ($hoverState?.border !== undefined)
        styles.push(borderStyle($hoverState.border, responsive, theme));
      if ($hoverState?.elevation !== undefined)
        styles.push(elevationStyle($hoverState.elevation));
      if ($hoverState?.pad !== undefined)
        styles.push(
          edgeStyle(
            'padding',
            $hoverState.pad,
            responsive,
            theme.box.responsiveBreakpoint,
            theme,
          ),
        );
      if ($hoverState?.round !== undefined)
        styles.push(
          $hoverState.round === false
            ? 'border-radius: 0;'
            : roundStyle($hoverState.round, responsive, theme),
        );

      return styles;
    }}
  }

  /*
   * Keep the focus indicator inset so it doesn't get clipped by the
   * scrollable listbox overflow container.
   */
  &:focus-visible {
    ${focusStyle({ inset: true })}
  }
`;

const optionKey = (label, option) => `${label.toLowerCase()}-${option}`;

const getDefaultPopupOption = ({ section, format, options }) => {
  if (section === SECTION_HOUR) {
    const defaultHour = defaultHourForFormat(format);
    return options.includes(defaultHour) ? defaultHour : options[0];
  }
  if (section === SECTION_PERIOD) return 'AM';
  return options[0];
};

const PopupColumn = ({
  activeSection,
  format,
  formatMessage,
  inline,
  label,
  messages,
  onClickCommitOption,
  onSetSection,
  options,
  section,
  sections,
  theme,
}) => {
  const columnTheme = theme.timeInput?.drop?.column || {};

  return (
    <PopupColumnBox
      role="listbox"
      aria-label={label}
      overflow="auto"
      flex={{ grow: 0, shrink: 0 }}
      {...columnTheme}
    >
      {options.map((option) => {
        const key = optionKey(label, option);
        const sectionHasValue =
          (section === SECTION_HOUR && sections.hour !== undefined) ||
          (section === SECTION_MINUTE && sections.minute !== undefined) ||
          (section === SECTION_SECOND && sections.second !== undefined) ||
          (section === SECTION_PERIOD && sections.period !== undefined);

        // In empty state, keep focus defaults but avoid visually selecting
        // options until the user makes an explicit choice.
        const selected =
          (section === SECTION_HOUR && sections.hour === option) ||
          (section === SECTION_MINUTE && sections.minute === option) ||
          (section === SECTION_SECOND && sections.second === option) ||
          (section === SECTION_PERIOD && sections.period === option);

        const optionColor = selected
          ? theme.timeInput?.drop?.option?.text?.selected?.color ||
            theme.timeInput?.drop?.option?.text?.color ||
            'text'
          : theme.timeInput?.drop?.option?.text?.color || 'text';
        const optionContainer = theme.timeInput?.drop?.option?.container || {};
        const {
          hover: optionHover,
          selected: selectedContainer = {},
          ...baseOptionStyles
        } = optionContainer;
        const { hover: selectedHover, ...selectedOptionStyles } =
          selectedContainer;
        const optionStyles = selected
          ? { ...baseOptionStyles, ...selectedOptionStyles }
          : baseOptionStyles;
        const hoverState = selected ? selectedHover : optionHover;
        const hoverBackground = selected
          ? hoverState?.background ??
            selectedContainer.background ??
            baseOptionStyles.background
          : hoverState?.background;
        const isActive = selected && activeSection === section;
        let optionTabIndex = -1;
        if (inline) {
          // In inline mode each column needs exactly one tabbable option so Tab
          // key lands on the option (with Grommet focus style) instead of the
          // listbox container (which has no theme focus style). Use the selected
          // value when set, otherwise fall back to the column's first option.
          const defaultOption = getDefaultPopupOption({
            section,
            format,
            options,
          });
          optionTabIndex =
            selected || (!sectionHasValue && option === defaultOption) ? 0 : -1;
        } else if (isActive) {
          optionTabIndex = 0;
        }

        return (
          <PopupOption
            key={key}
            role="option"
            data-option-key={key}
            aria-selected={selected}
            tabIndex={optionTabIndex}
            aria-label={`${
              section === SECTION_PERIOD ? option : pad(option)
            } ${getSectionName(section, format, formatMessage, messages)}`}
            flex={false}
            $hoverState={hoverState}
            $hoverBackground={hoverBackground}
            justify="center"
            {...optionStyles}
            onClick={() => onClickCommitOption(section, option)}
            onFocus={() => onSetSection(section)}
          >
            <Text
              size={
                selected
                  ? theme.timeInput?.drop?.option?.text?.selected?.size ||
                    theme.timeInput?.drop?.option?.text?.size ||
                    theme.global.input.font.size ||
                    'small'
                  : theme.timeInput?.drop?.option?.text?.size ||
                    theme.global.input.font.size ||
                    'small'
              }
              weight={
                selected
                  ? theme.timeInput?.drop?.option?.text?.selected?.weight ??
                    theme.timeInput?.drop?.option?.text?.weight
                  : theme.timeInput?.drop?.option?.text?.weight
              }
              color={optionColor}
            >
              {section === SECTION_PERIOD ? option : pad(option)}
            </Text>
          </PopupOption>
        );
      })}
    </PopupColumnBox>
  );
};

const TimeInputPopup = ({
  activeSection,
  align,
  format,
  formatMessage,
  hoursOptions,
  focusOnOpen = true,
  id,
  incrementSection,
  messages,
  minuteOptions,
  onClose,
  onFocusLeave,
  secondOptions,
  sectionOrder,
  sections,
  setActiveSection,
  setSectionValue,
  target,
  dropProps,
  label,
  inline = false,
  onKeyDown: onKeyDownProp,
  ...rest
}) => {
  const { theme } = useThemeValue();
  const dialogRef = useRef();
  const pointerDownInsideRef = useRef(false);
  const suppressNextAutoScrollRef = useRef(false);
  const wheelInteractionTimeoutRef = useRef();
  const pointerReleaseTimeoutRef = useRef();

  const clearPointerReleaseTimeout = useCallback(() => {
    if (pointerReleaseTimeoutRef.current) {
      window.clearTimeout(pointerReleaseTimeoutRef.current);
      pointerReleaseTimeoutRef.current = undefined;
    }
  }, []);

  const clearInteractionInProgress = useCallback(() => {
    clearPointerReleaseTimeout();
    pointerDownInsideRef.current = false;
    if (wheelInteractionTimeoutRef.current) {
      window.clearTimeout(wheelInteractionTimeoutRef.current);
      wheelInteractionTimeoutRef.current = undefined;
    }
  }, [clearPointerReleaseTimeout]);

  const releaseInteractionAfterClick = useCallback(() => {
    clearPointerReleaseTimeout();
    // Keep lock through click handler + resulting render/effect cycle.
    pointerReleaseTimeoutRef.current = window.setTimeout(() => {
      pointerDownInsideRef.current = false;
      pointerReleaseTimeoutRef.current = undefined;
    }, 0);
  }, [clearPointerReleaseTimeout]);

  const markInteractionInProgress = useCallback(() => {
    pointerDownInsideRef.current = true;
  }, []);

  const suppressNextAutoScroll = useCallback(() => {
    suppressNextAutoScrollRef.current = true;
  }, []);

  const commitOptionSelection = useCallback(
    (section, option) => {
      setActiveSection(section);
      setSectionValue(section, option);
    },
    [setActiveSection, setSectionValue],
  );

  // Commit on the up-event (click), not mousedown - see WCAG 2.5.2 (Pointer
  // Cancellation). Committing on press would leave no way to abort by
  // moving the pointer off-target before releasing.
  const commitClickOptionSelection = useCallback(
    (section, option) => {
      suppressNextAutoScroll();
      commitOptionSelection(section, option);
    },
    [commitOptionSelection, suppressNextAutoScroll],
  );

  const onPopupWheelCapture = useCallback(() => {
    pointerDownInsideRef.current = true;
    if (wheelInteractionTimeoutRef.current) {
      window.clearTimeout(wheelInteractionTimeoutRef.current);
    }

    // Trackpad and wheel events can continue after the pointer sequence.
    // Keep interaction lock briefly so refocus does not steal first selection.
    wheelInteractionTimeoutRef.current = window.setTimeout(() => {
      pointerDownInsideRef.current = false;
      wheelInteractionTimeoutRef.current = undefined;
    }, 120);
  }, []);

  useEffect(
    () => () => {
      clearPointerReleaseTimeout();
      if (wheelInteractionTimeoutRef.current) {
        window.clearTimeout(wheelInteractionTimeoutRef.current);
      }
    },
    [clearPointerReleaseTimeout],
  );

  const popupSections = [
    {
      section: SECTION_HOUR,
      label: 'hour',
      options: hoursOptions,
    },
    {
      section: SECTION_MINUTE,
      label: 'minute',
      options: minuteOptions,
    },
    {
      section: SECTION_SECOND,
      label: 'second',
      options: secondOptions,
    },
    {
      section: SECTION_PERIOD,
      label: 'period',
      options: ['AM', 'PM'],
    },
  ];

  const visiblePopupSections = popupSections.filter(({ section }) =>
    sectionOrder.includes(section),
  );

  const getSectionFromLabel = useCallback((listboxLabel) => {
    if (listboxLabel === 'hour') return SECTION_HOUR;
    if (listboxLabel === 'minute') return SECTION_MINUTE;
    if (listboxLabel === 'second') return SECTION_SECOND;
    if (listboxLabel === 'period') return SECTION_PERIOD;
    return undefined;
  }, []);

  const getSectionFromEventTarget = useCallback(
    (eventTarget) => {
      const listboxNode = eventTarget?.closest?.('[role="listbox"]');
      const ariaLabel = listboxNode?.getAttribute?.('aria-label');
      return getSectionFromLabel(ariaLabel);
    },
    [getSectionFromLabel],
  );

  const getAdjacentSection = useCallback(
    (section, delta) => {
      const currentIndex = sectionOrder.indexOf(section);
      if (currentIndex === -1) return sectionOrder[0] ?? section;

      const nextIndex =
        (currentIndex + delta + sectionOrder.length) % sectionOrder.length;
      return sectionOrder[nextIndex] ?? section;
    },
    [sectionOrder],
  );

  const scrollSelectedOptionsIntoView = useCallback(() => {
    if (pointerDownInsideRef.current) return;
    if (suppressNextAutoScrollRef.current) {
      suppressNextAutoScrollRef.current = false;
      return;
    }

    const popupNode = dialogRef.current;
    if (!popupNode) return;

    const sectionLabel = {
      [SECTION_HOUR]: 'hour',
      [SECTION_MINUTE]: 'minute',
      [SECTION_SECOND]: 'second',
      [SECTION_PERIOD]: 'period',
    };

    const sectionValue = {
      [SECTION_HOUR]:
        sections.hour !== undefined
          ? sections.hour
          : getDefaultPopupOption({
              section: SECTION_HOUR,
              format,
              options: hoursOptions,
            }),
      [SECTION_MINUTE]:
        sections.minute !== undefined
          ? sections.minute
          : getDefaultPopupOption({
              section: SECTION_MINUTE,
              format,
              options: minuteOptions,
            }),
      [SECTION_SECOND]:
        sections.second !== undefined
          ? sections.second
          : getDefaultPopupOption({
              section: SECTION_SECOND,
              format,
              options: secondOptions,
            }),
      [SECTION_PERIOD]: sections.period || 'AM',
    };

    visiblePopupSections.forEach(({ section }) => {
      const labelValue = sectionLabel[section];
      if (!labelValue) return;

      const listboxNode = popupNode.querySelector(
        `[role="listbox"][aria-label="${labelValue}"]`,
      );
      if (!listboxNode) return;

      const selectedNode =
        popupNode.querySelector(
          `[data-option-key="${optionKey(labelValue, sectionValue[section])}"]`,
        ) || listboxNode.querySelector('[role="option"][aria-selected="true"]');

      if (selectedNode) {
        if (selectedNode.scrollIntoView) {
          selectedNode.scrollIntoView({ block: 'nearest' });
        }

        // Center selected value in each listbox so all sections (hh/mm/ss)
        // are consistently aligned on open, not just the focused section.
        const selectedOffsetTop = selectedNode.offsetTop;
        const selectedHeight = selectedNode.offsetHeight;
        const targetScrollTop =
          selectedOffsetTop -
          (listboxNode.clientHeight / 2 - selectedHeight / 2);

        listboxNode.scrollTop = Math.max(0, targetScrollTop);
      }
    });
  }, [
    format,
    hoursOptions,
    minuteOptions,
    secondOptions,
    sections,
    visiblePopupSections,
  ]);

  const focusCurrentPopupOption = useCallback(() => {
    const labelMap = {
      [SECTION_HOUR]: 'hour',
      [SECTION_MINUTE]: 'minute',
      [SECTION_SECOND]: 'second',
      [SECTION_PERIOD]: 'period',
    };

    const keyMap = {
      [SECTION_HOUR]: optionKey(
        'hour',
        sections.hour !== undefined
          ? sections.hour
          : getDefaultPopupOption({
              section: SECTION_HOUR,
              format,
              options: hoursOptions,
            }),
      ),
      [SECTION_MINUTE]: optionKey(
        'minute',
        sections.minute !== undefined
          ? sections.minute
          : getDefaultPopupOption({
              section: SECTION_MINUTE,
              format,
              options: minuteOptions,
            }),
      ),
      [SECTION_SECOND]: optionKey(
        'second',
        sections.second !== undefined
          ? sections.second
          : getDefaultPopupOption({
              section: SECTION_SECOND,
              format,
              options: secondOptions,
            }),
      ),
      [SECTION_PERIOD]: optionKey('period', sections.period || 'AM'),
    };

    const selector = `[data-option-key="${keyMap[activeSection]}"]`;
    const node = dialogRef.current?.querySelector(selector);
    if (node) {
      node.focus();
      return true;
    }

    // Fallback: if current section value has no matching option
    // (e.g., minute=31 with minuteStep=15), focus first option in section.
    const sectionLabel = labelMap[activeSection];
    if (!sectionLabel) return false;

    const fallbackNode = dialogRef.current?.querySelector(
      `[role="listbox"][aria-label="${sectionLabel}"] [role="option"]`,
    );
    if (fallbackNode) {
      fallbackNode.focus();
      return true;
    }

    return false;
  }, [
    activeSection,
    format,
    hoursOptions,
    minuteOptions,
    secondOptions,
    sections,
  ]);

  useLayoutEffect(() => {
    // Avoid stealing pointer interactions: while the user is actively
    // clicking inside the popup, let that click settle before refocusing.
    if (pointerDownInsideRef.current) return undefined;

    const scrollRaf = requestAnimationFrame(() => {
      scrollSelectedOptionsIntoView();
    });

    // DateTimeInput disables this so its Calendar can receive initial focus.
    if (!focusOnOpen) return () => window.cancelAnimationFrame(scrollRaf);

    let rafB;
    const rafA = requestAnimationFrame(() => {
      scrollSelectedOptionsIntoView();
      const focused = focusCurrentPopupOption();
      // Retry one more frame to handle occasional mount timing races.
      if (!focused) {
        rafB = requestAnimationFrame(() => {
          scrollSelectedOptionsIntoView();
          focusCurrentPopupOption();
        });
      }
    });

    return () => {
      window.cancelAnimationFrame(scrollRaf);
      window.cancelAnimationFrame(rafA);
      if (rafB) window.cancelAnimationFrame(rafB);
    };
  }, [focusCurrentPopupOption, focusOnOpen, scrollSelectedOptionsIntoView]);

  const dropTheme = theme.timeInput?.drop;
  const dropWidth = dropTheme.width;
  const popupWidth =
    typeof dropWidth === 'object'
      ? { ...dropWidth, max: dropWidth.max ?? '100%' }
      : { width: dropWidth, max: '100%' };

  const popupContent = (
    <Box
      ref={dialogRef}
      role={inline ? undefined : 'dialog'}
      aria-label={inline ? undefined : label}
      direction="row"
      width={popupWidth}
      {...dropTheme}
      pad={inline ? 'none' : dropTheme.pad}
      onPointerDownCapture={markInteractionInProgress}
      onPointerUpCapture={releaseInteractionAfterClick}
      onPointerCancelCapture={clearInteractionInProgress}
      onWheelCapture={onPopupWheelCapture}
      onKeyDown={(event) => {
        const eventSectionFromTarget = getSectionFromEventTarget(event.target);
        const eventSectionFromActiveElement = getSectionFromEventTarget(
          document.activeElement,
        );
        const eventSection =
          eventSectionFromTarget ??
          eventSectionFromActiveElement ??
          activeSection;

        if (event.key === 'Escape') {
          if (onClose) {
            event.preventDefault();
            onClose();
          }
        } else if (event.key === 'Enter') {
          event.preventDefault();
          const focusedOption =
            event.target?.closest?.('[role="option"]') ||
            document.activeElement?.closest?.('[role="option"]');
          focusedOption?.click?.();
        } else if (event.key === ' ' || event.key === 'Spacebar') {
          event.preventDefault();
          const focusedOption =
            event.target?.closest?.('[role="option"]') ||
            document.activeElement?.closest?.('[role="option"]');
          focusedOption?.click?.();
        } else if (event.key === 'Tab') {
          if (!inline) {
            event.preventDefault();
            setActiveSection(
              getAdjacentSection(eventSection, event.shiftKey ? -1 : 1),
            );
          }
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          setActiveSection(getAdjacentSection(eventSection, -1));
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          setActiveSection(getAdjacentSection(eventSection, 1));
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          incrementSection(eventSection, -1, true);
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          incrementSection(eventSection, 1, true);
        }

        onKeyDownProp?.(event);
      }}
      onBlurCapture={(event) => {
        const nextFocusTarget = event.relatedTarget;
        // Clicking the scrollbar blurs the focused option with
        // relatedTarget = null. Keep the popup open for that interaction.
        if (!nextFocusTarget) return;
        // If the user is currently interacting with the popup (pointer
        // down inside), don't close on blur. This prevents the popup
        // from closing when clicking on a non-focusable area within
        // the popup (e.g., the gap between columns or padding), which
        // would otherwise move focus to the document body and trigger
        // a false onFocusLeave.
        if (pointerDownInsideRef.current) return;
        if (!event.currentTarget.contains(nextFocusTarget)) {
          onFocusLeave?.();
        }
      }}
      {...rest}
    >
      {visiblePopupSections.map(({ section, label: sectionLabel, options }) => (
        <PopupColumn
          key={sectionLabel}
          activeSection={activeSection}
          format={format}
          formatMessage={formatMessage}
          inline={inline}
          label={sectionLabel}
          messages={messages}
          onClickCommitOption={commitClickOptionSelection}
          onSetSection={setActiveSection}
          options={options}
          section={section}
          sections={sections}
          theme={theme}
        />
      ))}
    </Box>
  );

  if (inline) return popupContent;

  return (
    <Drop
      id={id ? `${id}__drop` : undefined}
      target={target}
      align={align}
      onEsc={onClose}
      onClickOutside={onClose}
      {...dropProps}
    >
      {popupContent}
    </Drop>
  );
};

export { TimeInputPopup };
