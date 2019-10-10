import React, { useState } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';
import { withForwardRef } from '../hocs';

import { AccordionContext } from '../Accordion/AccordionContext';

const AccordionPanel = ({
  children,
  header,
  label,
  theme,
  onMouseOut,
  onMouseOver,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [hover, setHover] = useState(undefined);

  const iconColor = normalizeColor(
    theme.accordion.icons.color || 'control',
    theme,
  );

  const onHandleMouseOver = () => (...args) => {
    const { dark } = theme;

    setHover(dark ? 'light-4' : 'dark-3');

    if (onMouseOver) onMouseOver(args);
  };

  const onHandleMouseOut = () => (...args) => {
    setHover(undefined);

    if (onMouseOut) onMouseOut(args);
  };

  const onHandleFocus = () => (...args) => {
    const { dark } = theme;

    setHover(dark ? 'light-4' : 'dark-3');

    if (onFocus) onFocus(args);
  };

  const onHandleBlur = () => (...args) => {
    setHover(undefined);

    if (onBlur) onBlur(args);
  };

  return (
    <AccordionContext.Consumer>
      {panelContext => {
        const { active, animate, onPanelChange } = panelContext;
        const AccordionIcon = active
          ? theme.accordion.icons.collapse
          : theme.accordion.icons.expand;

        return (
          <Box flex={false}>
            <Button
              role="tab"
              aria-selected={active}
              aria-expanded={active}
              onClick={onPanelChange}
              onMouseOver={onHandleMouseOver()}
              onMouseOut={onHandleMouseOut()}
              onFocus={onHandleFocus()}
              onBlur={onHandleBlur()}
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
            <Box border={theme.accordion.border}>
              {animate ? (
                <Collapsible open={active}>{children}</Collapsible>
              ) : (
                active && children
              )}
            </Box>
          </Box>
        );
      }}
    </AccordionContext.Consumer>
  );
};

AccordionPanel.defaultProps = {};
Object.setPrototypeOf(AccordionPanel.defaultProps, defaultProps);

let AccordionPanelDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AccordionPanelDoc = require('./doc').doc(AccordionPanel);
}
const AccordionPanelWrapper = compose(
  withTheme,
  withForwardRef,
)(AccordionPanelDoc || AccordionPanel);

export { AccordionPanelWrapper as AccordionPanel };
