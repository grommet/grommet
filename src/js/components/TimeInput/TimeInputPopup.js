/* eslint-disable max-len */
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { focusStyle, normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

import { Box } from '../Box';
import { Drop } from '../Drop';
import { Text } from '../Text';
import {
  pad,
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
    ${focusStyle({ inset: true })}
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
  theme,
}) => (
  <PopupColumnBox
    role="listbox"
    aria-label={label}
    gap="xxsmall"
    width={theme.timeInput?.popup?.columnWidth}
    height={theme.timeInput?.popup?.columnHeight}
    overflow="auto"
    flex="0 0 auto"
  >
    {options.map((option) => {
      const key = optionKey(label, option);
      const selected =
        (section === SECTION_HOUR && sections.hour === option) ||
        (section === SECTION_MINUTE && sections.minute === option) ||
        (section === SECTION_SECOND && sections.second === option) ||
        (section === SECTION_PERIOD && sections.period === option);

      const optionColor = (() => {
        if (!selected) {
          return theme.timeInput?.color || theme.global.colors.text || 'text';
        }
        return (
          theme.timeInput?.popup?.option?.selected?.color ||
          theme.timeInput?.color ||
          theme.global.colors.text ||
          'text'
        );
      })();

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
          <Text
            size={theme.global.input.font.size || 'small'}
            weight={selected ? 'medium' : 'normal'}
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
  const pointerDownInsideRef = useRef(false);

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
        onMouseDownCapture={() => {
          pointerDownInsideRef.current = true;
          const onMouseUp = () => {
            pointerDownInsideRef.current = false;
            window.removeEventListener('mouseup', onMouseUp, true);
          };
          window.addEventListener('mouseup', onMouseUp, true);
        }}
        onBlurCapture={(event) => {
          if (pointerDownInsideRef.current) return;
          const nextFocusTarget = event.relatedTarget;
          // Clicking the scrollbar can blur the focused option with
          // relatedTarget = null. Keep the popup open for that interaction.
          if (!nextFocusTarget) return;
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
              theme={theme}
            />
          ),
        )}
      </Box>
    </Drop>
  );
};

export { TimeInputPopup };
