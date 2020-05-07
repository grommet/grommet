import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { normalizeColor, parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';

import { AccordionContext } from '../Accordion/AccordionContext';

const AccordionPanel = forwardRef(
  (
    {
      children,
      header,
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
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { active, animate, onPanelChange } = useContext(AccordionContext);
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

    // accordion.hover.heading.color will trump accordion.hover.color
    // if the user sets a value other than the default value (defaultHoverColor)
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
          role="tab"
          aria-selected={active}
          aria-expanded={active}
          onClick={onPanelChange}
          onMouseOver={event => {
            setHover(headingColor);
            if (onMouseOver) onMouseOver(event);
          }}
          onMouseOut={event => {
            setHover(undefined);
            if (onMouseOut) onMouseOut(event);
          }}
          onFocus={event => {
            setHover(headingColor);
            setFocus(true);
            if (onFocus) onFocus(event);
          }}
          onBlur={event => {
            setHover(undefined);
            setFocus(false);
            if (onBlur) onBlur(event);
          }}
          style={focus ? { zIndex: 1 } : undefined}
        >
          {header || (
            <Box align="center" direction="row" justify="between" {...rest}>
              {typeof label === 'string' ? (
                <Box pad={{ horizontal: 'xsmall' }}>
                  <Heading
                    level={
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
                <Box pad={{ horizontal: 'small' }}>
                  <AccordionIcon color={iconColor} />
                </Box>
              )}
            </Box>
          )}
        </Button>
        <Box border={contentBorder}>
          {animate ? (
            <Collapsible open={active}>{children}</Collapsible>
          ) : (
            active && children
          )}
        </Box>
      </Box>
    );
  },
);

AccordionPanel.displayName = 'AccordionPanel';

let AccordionPanelDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AccordionPanelDoc = require('./doc').doc(AccordionPanel);
}
const AccordionPanelWrapper = AccordionPanelDoc || AccordionPanel;

export { AccordionPanelWrapper as AccordionPanel };
