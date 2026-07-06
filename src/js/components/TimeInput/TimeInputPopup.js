/* eslint-disable max-len */
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

import { Box } from '../Box';
import { Drop } from '../Drop';
import {
  pad,
  SECTION_HOUR,
  SECTION_MINUTE,
  SECTION_PERIOD,
  SECTION_SECOND,
} from './utils';

const PopupColumnBox = styled(Box)`
  width: ${(props) => props.theme.timeInput?.popup?.columnWidth};
  max-height: ${(props) => props.theme.timeInput?.popup?.columnHeight};
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: ${(props) =>
    props.theme.timeInput?.popup?.scrollbar?.gutter};
  scrollbar-width: ${(props) => props.theme.timeInput?.popup?.scrollbar?.width};
  scrollbar-color: ${(props) =>
    `${props.theme.timeInput?.popup?.scrollbar?.thumbColor} ${props.theme.timeInput?.popup?.scrollbar?.trackColor}`};
  flex: 0 0 ${(props) => props.theme.timeInput?.popup?.columnWidth};

  &::-webkit-scrollbar {
    width: ${(props) => props.theme.timeInput?.popup?.scrollbar?.webkitSize};
    height: ${(props) => props.theme.timeInput?.popup?.scrollbar?.webkitSize};
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.theme.timeInput?.popup?.scrollbar?.trackColor};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.theme.timeInput?.popup?.scrollbar?.thumbColor};
    border: ${(props) => props.theme.timeInput?.popup?.scrollbar?.thumbBorder};
    border-radius: ${(props) =>
      props.theme.timeInput?.popup?.scrollbar?.thumbRadius};
    background-clip: content-box;
  }
`;

const PopupOption = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => {
    if (props.$disabled) {
      return normalizeColor(
        props.theme.timeInput?.popup?.option?.disabled?.color || 'text',
        props.theme,
      );
    }

    if (props.$selected) {
      return normalizeColor(
        props.theme.timeInput?.popup?.option?.selected?.color ||
          props.theme.timeInput?.color ||
          'text',
        props.theme,
      );
    }

    return normalizeColor(props.theme.timeInput?.color || 'text', props.theme);
  }};
  font-size: ${(props) => props.theme.timeInput?.fontSize};
  line-height: ${(props) => props.theme.timeInput?.lineHeight};
  font-weight: ${(props) =>
    props.$selected
      ? props.theme.global.font?.weight?.medium
      : props.theme.global.font?.weight?.normal};
  width: ${(props) => props.theme.timeInput?.popup?.optionWidth};
  min-height: ${(props) => props.theme.timeInput?.popup?.optionMinHeight};
  padding: ${(props) =>
    `${props.theme.global.edgeSize.xxsmall} ${props.theme.global.edgeSize.xsmall}`};
  border-radius: ${(props) => props.theme.global.control?.border?.radius};
  background: ${(props) => {
    if (props.$disabled) {
      return normalizeColor(
        props.theme.timeInput?.popup?.option?.disabled?.background ||
          'transparent',
        props.theme,
      );
    }

    if (props.$selected) {
      return normalizeColor(
        props.theme.timeInput?.popup?.option?.selected?.background ||
          'transparent',
        props.theme,
      );
    }

    if (props.$active) {
      return normalizeColor(
        props.theme.timeInput?.popup?.option?.focus?.background ||
          props.theme.timeInput?.popup?.option?.hover?.background ||
          'transparent',
        props.theme,
      );
    }

    return normalizeColor(
      props.theme.timeInput?.popup?.option?.background || 'transparent',
      props.theme,
    );
  }};

  &:hover {
    background: ${(props) => {
      if (props.$disabled) {
        return normalizeColor(
          props.theme.timeInput?.popup?.option?.disabled?.background ||
            'transparent',
          props.theme,
        );
      }

      if (props.$selected) {
        return normalizeColor(
          props.theme.timeInput?.popup?.option?.selected?.hover?.background ||
            props.theme.timeInput?.popup?.option?.selected?.background ||
            'transparent',
          props.theme,
        );
      }

      return normalizeColor(
        props.theme.timeInput?.popup?.option?.hover?.background ||
          'transparent',
        props.theme,
      );
    }};
  }

  /*
   * Keep the focus indicator inset so it doesn't get clipped by the
   * scrollable listbox overflow container.
   */
  &:focus-visible,
  &[data-active='true'] {
    box-shadow: ${(props) =>
      `inset 0 0 0 ${
        props.theme.timeInput?.popup?.option?.focus?.outerSize || '2px'
      } ${normalizeColor(
        props.theme.timeInput?.popup?.option?.focus?.outerColor || 'focus',
        props.theme,
      )}`};
    border-radius: ${(props) =>
      props.theme.timeInput?.popup?.option?.focus?.radius ||
      props.theme.global.control?.border?.radius};
    outline: none;
  }
`;

const optionKey = (label, option) => `${label.toLowerCase()}-${option}`;

const PopupColumn = ({
  activeSection,
  label,
  onSetSection,
  options,
  section,
  sections,
  setSectionValue,
}) => (
  <PopupColumnBox role="listbox" aria-label={label} gap="xxsmall">
    {options.map((option) => {
      const key = optionKey(label, option);
      const selected =
        (section === SECTION_HOUR && sections.hour === option) ||
        (section === SECTION_MINUTE && sections.minute === option) ||
        (section === SECTION_SECOND && sections.second === option) ||
        (section === SECTION_PERIOD && sections.period === option);

      return (
        <PopupOption
          key={key}
          data-option-key={key}
          data-active={selected && activeSection === section}
          role="option"
          aria-selected={selected}
          tabIndex={selected && activeSection === section ? 0 : -1}
          $active={selected && activeSection === section}
          $selected={selected}
          $disabled={false}
          onClick={() => {
            onSetSection(section);
            setSectionValue(section, option);
          }}
          onFocus={() => onSetSection(section)}
        >
          {section === SECTION_PERIOD ? option : pad(option)}
        </PopupOption>
      );
    })}
  </PopupColumnBox>
);

const TimeInputPopup = ({
  activeSection,
  align,
  hoursOptions,
  id,
  incrementSection,
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
    let rafB;
    const rafA = requestAnimationFrame(() => {
      const focused = focusCurrentPopupOption();
      // Retry one more frame to handle occasional mount timing races.
      if (!focused) {
        rafB = requestAnimationFrame(() => {
          focusCurrentPopupOption();
        });
      }
    });

    return () => {
      window.cancelAnimationFrame(rafA);
      if (rafB) window.cancelAnimationFrame(rafB);
    };
  }, [focusCurrentPopupOption]);

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
        width={{ width: theme.timeInput?.popup?.width, max: '100%' }}
        minHeight={theme.timeInput?.popup?.minHeight}
        gap="xsmall"
        pad="small"
        onBlurCapture={(event) => {
          const nextFocusTarget = event.relatedTarget;
          if (!event.currentTarget.contains(nextFocusTarget)) {
            onFocusLeave?.();
          }
        }}
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
      >
        {visiblePopupSections.map(
          ({ section, label: sectionLabel, options }) => (
            <PopupColumn
              key={sectionLabel}
              activeSection={activeSection}
              label={sectionLabel}
              onSetSection={setActiveSection}
              options={options}
              section={section}
              sections={sections}
              setSectionValue={setSectionValue}
            />
          ),
        )}
      </Box>
    </Drop>
  );
};

export { TimeInputPopup };
