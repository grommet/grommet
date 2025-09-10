import React, { forwardRef, useContext, useMemo, useState } from 'react';

import styled from 'styled-components';
import { normalizeColor, parseMetricToNum, useId } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';

import { AccordionContext } from '../Accordion/AccordionContext';
import { AccordionPanelPropTypes } from './propTypes';
import { useThemeValue } from '../../utils/useThemeValue';

const HiddenBox = styled(Box)`
  max-height: ${({ hide }) => (hide ? '0px' : 'initial')};
  overflow: ${({ hide }) => (hide ? 'hidden' : 'visible')};
`;

const AccordionPanel = forwardRef(
  (
    {
      children,
      header,
      id,
      label,
      onClick,
      onMouseOut,
      onMouseOver,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const panelButtonId = useId();
    const { theme } = useThemeValue();
    const { active, animate, level, onPanelChange, unmount } =
      useContext(AccordionContext);
    const [hover, setHover] = useState(undefined);
    const [focus, setFocus] = useState();

    const iconColor = useMemo(
      () => normalizeColor(theme.accordion.icons.color || 'control', theme),
      [theme],
    );

    const AccordionIcon = useMemo(
      () =>
        active ? theme.accordion.icons.collapse : theme.accordion.icons.expand,
      [active, theme.accordion.icons],
    );

    const defaultHoverColor = JSON.stringify({
      dark: 'light-4',
      light: 'dark-3',
    });

    // accordion.hover.color will be deprecated in v3.
    if (JSON.stringify(theme.accordion.hover.color) !== defaultHoverColor)
      console.warn(
        `The theme style for accordion.hover.color is deprecated,
        use accordion.hover.heading.color instead.`,
      );

    // accordion.hover.heading.color will trump accordion.hover.color in case
    // the user sets its value to be any other value than the
    // default value (defaultHoverColor).
    // accordion.hover.color will be deprecated in v3.
    const headingColor =
      theme.accordion.hover &&
      JSON.stringify(theme.accordion.hover.heading.color) !== defaultHoverColor
        ? theme.accordion.hover.heading.color
        : theme.accordion.hover.color;

    const { border: contentBorder } = theme.accordion;
    const { border: panelBorder } = theme.accordion.panel;

    let abutMargin;
    if (panelBorder)
      // abutMargin 'bottom' is set to overlap adjacent border panels
      abutMargin = {
        bottom: `-${parseMetricToNum(
          // in case border.size defined as a t-shirt size
          // or in case border size is a custom size i.e. '5px'
          theme.global.borderSize[panelBorder.size] ||
            panelBorder.size ||
            theme.global.borderSize.xsmall, // '-1px'
        )}px`,
      };

    return (
      <Box
        ref={ref}
        flex={false}
        onClick={onClick}
        border={panelBorder}
        margin={abutMargin}
      >
        <Button
          id={panelButtonId}
          aria-expanded={active}
          plain={theme.button.default ? true : undefined}
          onClick={onPanelChange}
          hoverIndicator={theme.accordion.hover.background}
          onMouseOver={(event) => {
            setHover(headingColor);
            if (onMouseOver) onMouseOver(event);
          }}
          onMouseOut={(event) => {
            setHover(undefined);
            if (onMouseOut) onMouseOut(event);
          }}
          onFocus={(event) => {
            setHover(headingColor);
            setFocus(true);
            if (onFocus) onFocus(event);
          }}
          onBlur={(event) => {
            setHover(undefined);
            setFocus(false);
            if (onBlur) onBlur(event);
          }}
          style={focus ? { zIndex: 1 } : undefined}
        >
          {header || (
            <Box
              align="center"
              direction="row"
              justify="between"
              id={id}
              {...rest}
            >
              {typeof label === 'string' ? (
                <Box pad={theme.accordion.label?.container?.pad}>
                  <Heading
                    level={
                      level ||
                      (theme.accordion.heading &&
                        theme.accordion.heading.level) ||
                      4
                    }
                    margin={
                      (theme.accordion.heading &&
                        theme.accordion.heading.margin) ||
                      undefined
                    }
                    color={hover}
                  >
                    {label}
                  </Heading>
                </Box>
              ) : (
                label
              )}
              {AccordionIcon && (
                <Box
                  pad={theme.accordion.icon?.container?.pad}
                  width={{ min: 'fit-content' }}
                >
                  <AccordionIcon color={iconColor} />
                </Box>
              )}
            </Box>
          )}
        </Button>
        <Box
          role="region"
          border={contentBorder}
          aria-labelledby={panelButtonId}
        >
          {animate && !unmount && (
            <Collapsible open={active} unmount={unmount}>
              {children}
            </Collapsible>
          )}
          {animate && unmount && (
            <Collapsible open={active}>{children}</Collapsible>
          )}
          {!animate && !unmount && (
            <HiddenBox hide={!active}>{children}</HiddenBox>
          )}
          {!animate && unmount && active && children}
        </Box>
      </Box>
    );
  },
);

AccordionPanel.displayName = 'AccordionPanel';

AccordionPanel.propTypes = AccordionPanelPropTypes;
export { AccordionPanel };
