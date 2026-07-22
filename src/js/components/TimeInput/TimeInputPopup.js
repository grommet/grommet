/* eslint-disable max-len */
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { focusStyle, normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

import { Box } from '../Box';
import { Drop } from '../Drop';
import { Text } from '../Text';
import {
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

const PopupOption = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  padding: ${(props) =>
    `${props.theme.global.edgeSize.xxsmall} ${props.theme.global.edgeSize.xsmall}`};
  border-radius: ${(props) => props.theme.global.control?.border?.radius};
  background: ${(props) => {
    if (props.$selected) {
      return normalizeColor(
        props.theme.timeInput?.drop?.option?.selected?.background,
        props.theme,
      );
    }

    if (props.$active) {
      return normalizeColor(
        props.theme.timeInput?.drop?.option?.hover?.background,
        props.theme,
      );
    }

    return normalizeColor(
      props.theme.timeInput?.drop?.option?.background,
      props.theme,
    );
  }};

  &:hover {
    background: ${(props) => {
      if (props.$selected) {
        return normalizeColor(
          props.theme.timeInput?.drop?.option?.selected?.hover?.background ||
            props.theme.timeInput?.drop?.option?.selected?.background,
          props.theme,
        );
      }

      return normalizeColor(
        props.theme.timeInput?.drop?.option?.hover?.background,
        props.theme,
      );
    }};
  }

  /*
   * Keep the focus indicator inset so it doesn't get clipped by the
   * scrollable listbox overflow container.
   */
  &:focus-visible {
    ${focusStyle({ inset: true })}
  }

  ${(props) =>
    props.$selected && props.theme.timeInput?.drop?.option?.selected?.extend}
`;

const optionKey = (label, option) => `${label.toLowerCase()}-${option}`;

const PopupColumn = ({
  activeSection,
  format,
  formatMessage,
  label,
  messages,
  onClickCommitOption,
  onPointerCommitOption,
  onSetSection,
  options,
  section,
  sections,
  theme,
}) => (
  <PopupColumnBox
    role="listbox"
    aria-label={label}
    gap="xxsmall"
    height={{
      max: theme.timeInput?.drop?.column?.maxHeight || theme.global.size.small,
    }}
    overflow="auto"
    flex={{ grow: 0, shrink: 0 }}
  >
    {options.map((option) => {
      const key = optionKey(label, option);
      const selected =
        (section === SECTION_HOUR && sections.hour === option) ||
        (section === SECTION_MINUTE && sections.minute === option) ||
        (section === SECTION_SECOND && sections.second === option) ||
        (section === SECTION_PERIOD && sections.period === option);

      const optionColor = selected
        ? theme.timeInput?.drop?.option?.selected?.color || 'text'
        : 'text';
      const isActive = selected && activeSection === section;

      return (
        <PopupOption
          key={key}
          data-option-key={key}
          role="option"
          aria-selected={selected}
          tabIndex={isActive ? 0 : -1}
          aria-label={`${
            section === SECTION_PERIOD ? option : pad(option)
          } ${getSectionName(section, format, formatMessage, messages)}`}
          $active={isActive}
          $selected={selected}
          onMouseDown={(event) => {
            if (event.button !== 0) return;
            // Commit on pointer press so momentum scroll does not swallow
            // the first click commit on some trackpad/mouse flows.
            event.preventDefault();
            onPointerCommitOption(section, option);
          }}
          onClick={() => onClickCommitOption(section, option)}
          onFocus={() => onSetSection(section)}
        >
          <Text
            size={theme.global.input.font.size || 'small'}
            weight={selected ? 'bold' : 'normal'}
            color={optionColor}
          >
            {section === SECTION_PERIOD ? option : pad(option)}
          </Text>
        </PopupOption>
      );
    })}
  </PopupColumnBox>
);

const TimeInputPopup = ({
  activeSection,
  align,
  format,
  formatMessage,
  hoursOptions,
  id,
  incrementSection,
  messages,
  minuteOptions,
  moveSection,
  onAccept,
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
}) => {
  const { theme } = useThemeValue();
  const dialogRef = useRef();
  const pointerDownInsideRef = useRef(false);
  const pointerSelectionCommittedRef = useRef(false);
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

  const commitPointerOptionSelection = useCallback(
    (section, option) => {
      pointerSelectionCommittedRef.current = true;
      suppressNextAutoScroll();
      commitOptionSelection(section, option);
    },
    [commitOptionSelection, suppressNextAutoScroll],
  );

  const commitClickOptionSelection = useCallback(
    (section, option) => {
      if (pointerSelectionCommittedRef.current) {
        pointerSelectionCommittedRef.current = false;
        return;
      }

      commitOptionSelection(section, option);
    },
    [commitOptionSelection],
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
        sections.hour !== undefined ? sections.hour : hoursOptions[0],
      [SECTION_MINUTE]:
        sections.minute !== undefined ? sections.minute : minuteOptions[0],
      [SECTION_SECOND]:
        sections.second !== undefined ? sections.second : secondOptions[0],
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
        sections.hour !== undefined ? sections.hour : hoursOptions[0],
      ),
      [SECTION_MINUTE]: optionKey(
        'minute',
        sections.minute !== undefined ? sections.minute : minuteOptions[0],
      ),
      [SECTION_SECOND]: optionKey(
        'second',
        sections.second !== undefined ? sections.second : secondOptions[0],
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
  }, [activeSection, hoursOptions, minuteOptions, secondOptions, sections]);

  useLayoutEffect(() => {
    // Avoid stealing pointer interactions: while the user is actively
    // clicking inside the popup, let that click settle before refocusing.
    if (pointerDownInsideRef.current) return undefined;

    const scrollRaf = requestAnimationFrame(() => {
      scrollSelectedOptionsIntoView();
    });

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
  }, [focusCurrentPopupOption, scrollSelectedOptionsIntoView]);

  return (
    <Drop
      id={id ? `${id}__drop` : undefined}
      target={target}
      align={align}
      onEsc={onClose}
      onClickOutside={onClose}
      {...dropProps}
    >
      <Box
        ref={dialogRef}
        role="dialog"
        aria-label={label}
        direction="row"
        width={{ width: theme.timeInput?.drop?.width, max: '100%' }}
        minHeight={theme.timeInput?.drop?.minHeight}
        gap="xsmall"
        pad="small"
        onPointerDownCapture={markInteractionInProgress}
        onPointerUpCapture={releaseInteractionAfterClick}
        onPointerCancelCapture={clearInteractionInProgress}
        onWheelCapture={onPopupWheelCapture}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            onClose();
          } else if (event.key === ' ' || event.key === 'Spacebar') {
            event.preventDefault();
            const focusedOption =
              event.target?.closest?.('[role="option"]') ||
              document.activeElement?.closest?.('[role="option"]');
            focusedOption?.click?.();
          } else if (event.key === 'Tab') {
            event.preventDefault();
            setActiveSection(moveSection(event.shiftKey ? -1 : 1));
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            setActiveSection(moveSection(-1));
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            setActiveSection(moveSection(1));
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            incrementSection(activeSection, -1);
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            incrementSection(activeSection, 1);
          } else if (event.key === 'Enter') {
            event.preventDefault();
            onAccept?.();
            onClose();
          }
        }}
        onBlurCapture={(event) => {
          const nextFocusTarget = event.relatedTarget;
          // Clicking the scrollbar blurs the focused option with
          // relatedTarget = null. Keep the popup open for that interaction.
          if (!nextFocusTarget) return;
          if (!event.currentTarget.contains(nextFocusTarget)) {
            onFocusLeave?.();
          }
        }}
      >
        {visiblePopupSections.map(
          ({ section, label: sectionLabel, options }) => (
            <PopupColumn
              key={sectionLabel}
              activeSection={activeSection}
              format={format}
              formatMessage={formatMessage}
              label={sectionLabel}
              messages={messages}
              onClickCommitOption={commitClickOptionSelection}
              onPointerCommitOption={commitPointerOptionSelection}
              onSetSection={setActiveSection}
              options={options}
              section={section}
              sections={sections}
              theme={theme}
            />
          ),
        )}
      </Box>
    </Drop>
  );
};

export { TimeInputPopup };
