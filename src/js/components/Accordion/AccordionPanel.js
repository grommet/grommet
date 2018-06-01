import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';

import { withTheme, withForwardRef } from '../hocs';

import { accordionPanel } from './doc';

import { AccordionContext } from './AccordionContext';

class AccordionPanel extends Component {
  state = {
    hover: undefined,
  }

  render() {
    const {
      children,
      title,
      theme,
      onMouseOut,
      onMouseOver,
      ...rest
    } = this.props;
    const { hover } = this.state;

    const dark = theme.dark;

    return (
      <AccordionContext>
        {(panelContext) => {
          const { active, animate, onPanelChange } = panelContext;
          const AccordionIcon = active ? (
            theme.accordion.icons.collapse
          ) : (
            theme.accordion.icons.expand
          );

          return (
            <Fragment>
              <Button
                fill={true}
                role='tab'
                aria-selected={active}
                aria-expanded={active}
                onClick={onPanelChange}
                onMouseOver={(...args) => {
                  this.setState({ hover: dark ? 'light-4' : 'dark-6' });
                  if (onMouseOver) {
                    onMouseOver(args);
                  }
                }}
                onMouseOut={(...args) => {
                  this.setState({ hover: undefined });
                  if (onMouseOut) {
                    onMouseOut(args);
                  }
                }}
              >
                <Box
                  flex={false}
                  align='center'
                  direction='row'
                  justify='between'
                  {...rest}
                >
                  {typeof title === 'string' ? (
                    <Box pad={{ horizontal: 'xsmall' }}>
                      <Heading
                        level={4}
                        color={hover}
                      >
                        {title}
                      </Heading>
                    </Box>
                  ) : title}
                  {AccordionIcon && (
                    <Box pad={{ horizontal: 'small' }}>
                      <AccordionIcon color={dark ? 'light-3' : 'brand'} />
                    </Box>
                  )}
                </Box>
              </Button>
              <Box
                flex={false}
                border={{ side: 'bottom', color: dark ? 'light-5' : 'border' }}
              >
                {animate ? (
                  <Collapsible
                    open={active}
                  >
                    {children}
                  </Collapsible>
                ) : active && children}
              </Box>
            </Fragment>
          );
        }}
      </AccordionContext>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  accordionPanel(AccordionPanel);
}

export default compose(
  withTheme,
  withForwardRef,
)(AccordionPanel);
