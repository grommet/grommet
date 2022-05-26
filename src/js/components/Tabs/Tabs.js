import React, {
  forwardRef,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Previous } from 'grommet-icons/icons/Previous';
import { Next } from 'grommet-icons/icons/Next';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { TabsContext } from './TabsContext';
import { StyledTabPanel, StyledTabs, StyledTabsHeader } from './StyledTabs';
import { normalizeColor } from '../../utils';
import { MessageContext } from '../../contexts/MessageContext';
import { TabsPropTypes } from './propTypes';

const Tabs = forwardRef(
  (
    {
      alignControls,
      children,
      flex,
      justify = 'center',
      messages,
      responsive = true,
      step,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { format } = useContext(MessageContext);
    const { activeIndex: propsActiveIndex, onActive } = rest;
    const [activeIndex, setActiveIndex] = useState(rest.activeIndex || 0);
    const [activeContent, setActiveContent] = useState();
    const [activeTitle, setActiveTitle] = useState();
    const [disableLeftArrow, setDisableLeftArrow] = useState();
    const [disableRightArrow, setDisableRightArrow] = useState();
    const [overflow, setOverflow] = useState();
    const headerRef = useRef();

    if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
      setActiveIndex(propsActiveIndex);
    }

    /* eslint-disable no-param-reassign */
    delete rest.activeIndex;
    delete rest.onActive;
    /* eslint-enable no-param-reassign */

    const tabRefs = React.Children.map(children, () => React.createRef());
    // const [focusIndex, setFocusIndex] = useState();

    // check if tab is in view
    const isVisible = (element) => {
      const tabRect = element?.getBoundingClientRect();
      const headerRect = headerRef.current?.getBoundingClientRect();
      if (tabRect && headerRect)
        // the -1 and +1 allow a little leniency when calculating if a tab is
        // in view. Without the -1 and +1 a tab could be fully in view but
        // isVisible will return false.
        return (
          tabRect.left >= headerRect.left - 1 &&
          tabRect.right <= headerRect.right + 1
        );
      return undefined;
    };

    const updateArrowState = useCallback(() => {
      setDisableLeftArrow(isVisible(tabRefs[0].current));
      setDisableRightArrow(isVisible(tabRefs[tabRefs.length - 1].current));
    }, [tabRefs]);

    useEffect(() => {
      if (overflow) {
        if (!isVisible(tabRefs[activeIndex].current)) {
          // if the active tab isn't visible scroll to it
          tabRefs[activeIndex].current.scrollIntoView();
          updateArrowState();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overflow, activeIndex]);

    // useEffect(() => {
    // // if the focus index is changing make sure the previous and next arrows
    //   // are in sync
    //   if (overflow) {
    //     for (let i = 0; i < tabRefs.length; i += 1) {
    //       if (tabRefs[i].current === document.activeElement) {
    //         console.log('YES');
    //         setFocusIndex(i);
    //         // tabRefs[i].current.scrollIntoView();
    //       }
    //     }
    //   }
    // }, [overflow, tabRefs, document.activeElement, updateArrowState]);

    // useEffect(() => {
    //   if (focusIndex && tabRefs && !isVisible(tabRefs[focusIndex].current)) {
    //     tabRefs[focusIndex].current.scrollIntoView();
    //     updateArrowState();
    //   }
    // }, [focusIndex, tabRefs, updateArrowState]);

    useLayoutEffect(() => {
      const onResize = () => {
        // check if tabs are overflowing
        if (headerRef.current.scrollWidth > headerRef.current.offsetWidth) {
          setOverflow(true);
        } else setOverflow(false);
        updateArrowState();
      };
      onResize();
      // if (
      //   overflow === undefined ||
      //   disableLeftArrow === undefined ||
      //   disableRightArrow === undefined
      // ) {
      //   onResize();
      // // // setTimeout with a delay of 0 ensures call to onResize runs after
      //   //   // currently executing code so we get the correct dimensions
      //   //   if (overflow === undefined) {
      //   //     setTimeout(() => {
      //   //       onResize();
      //   //     }, 0);
      //   //     // console.log(overflow)
      //   //   }
      //   //   if (!isVisible(tabRefs[activeIndex].current)) {
      //   //     // if the active tab isn't visible scroll to it
      //   //     tabRefs[activeIndex].current.scrollIntoView();
      //   //     updateArrowState();
      //   //   }
      // }

      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, [
      tabRefs,
      disableLeftArrow,
      disableRightArrow,
      activeIndex,
      headerRef,
      overflow,
      updateArrowState,
    ]);

    const getTabsContext = useCallback(
      (index) => {
        const activateTab = (nextIndex) => {
          if (propsActiveIndex === undefined) {
            setActiveIndex(nextIndex);
          }
          if (onActive) {
            onActive(nextIndex);
          }
        };

        return {
          activeIndex,
          active: activeIndex === index,
          ref: tabRefs[index],
          onActivate: () => activateTab(index),
          setActiveContent,
          setActiveTitle,
        };
      },
      [activeIndex, onActive, propsActiveIndex, tabRefs],
    );

    const tabs = React.Children.map(children, (child, index) => (
      <TabsContext.Provider value={getTabsContext(index)}>
        {/* possible to have undefined child. in that case, you can't
        do cloneElement */}
        {child
          ? // cloneElement is needed for backward compatibility with custom
            // styled components that rely on props.active. We should reassess
            // if it is still necessary in our next major release.
            React.cloneElement(child, { active: activeIndex === index })
          : child}
      </TabsContext.Provider>
    ));

    const tabsHeaderStyles = {};
    if (theme.tabs.header && theme.tabs.header.border) {
      let borderColor =
        theme.tabs.header.border.color || theme.global.control.border.color;
      borderColor = normalizeColor(borderColor, theme);

      tabsHeaderStyles.border = {
        side: theme.tabs.header.border.side,
        size: theme.tabs.header.border.size,
        style: theme.tabs.header.border.style,
        color: borderColor,
      };
    }

    const tabContentTitle = `${activeTitle || ''} ${format({
      id: 'tabs.tabContents',
      messages,
    })}`;

    return (
      <StyledTabs
        ref={ref}
        as={Box}
        role="tablist"
        flex={flex}
        responsive={responsive}
        {...rest}
        background={theme.tabs.background}
      >
        <Box direction={overflow ? 'row' : 'column'}>
          {overflow && (
            <Button
              a11yTitle="Previous Tab"
              icon={<Previous />}
              disabled={disableLeftArrow}
              // removed from tabIndex, button is redundant for keyboard users
              tabIndex={-1}
              onClick={() => {
                let scrolledToIndex;
                let i = 0;
                while (
                  scrolledToIndex === undefined &&
                  i < tabRefs.length - 1
                ) {
                  if (
                    !isVisible(tabRefs[i].current) &&
                    isVisible(tabRefs[i + 1].current)
                  ) {
                    if (step) i = Math.max(i - (step - 1), 0);
                    scrolledToIndex = i;
                    tabRefs[i].current.scrollIntoView({ behavior: 'smooth' });
                  }
                  i += 1;
                }

                setDisableRightArrow(false);
                if (scrolledToIndex === 0) {
                  // wait for scroll animation to finish
                  const checkVisible = setInterval(() => {
                    if (isVisible(tabRefs[0].current)) {
                      setDisableLeftArrow(true);
                      clearInterval(checkVisible);
                    }
                  }, 100);
                  setTimeout(() => {
                    clearInterval(checkVisible);
                  }, 500);
                }
              }}
            />
          )}
          <StyledTabsHeader
            ref={headerRef}
            as={Box}
            direction="row"
            justify={justify}
            alignSelf={alignControls}
            flex={!!overflow}
            wrap={false}
            overflow={overflow ? 'hidden' : 'visible'}
            background={theme.tabs.header.background}
            gap={theme.tabs.gap}
            {...tabsHeaderStyles}
          >
            {tabs}
          </StyledTabsHeader>
          {overflow && (
            <Button
              a11yTitle="Next Tab"
              icon={<Next />}
              disabled={disableRightArrow}
              // removed from tabIndex, button is redundant for keyboard users
              tabIndex={-1}
              onClick={() => {
                let scrolledToIndex;
                let i = tabRefs.length - 1;

                while (scrolledToIndex === undefined && i > 0) {
                  if (
                    !isVisible(tabRefs[i].current) &&
                    isVisible(tabRefs[i - 1].current)
                  ) {
                    if (step) i = Math.min(i + (step - 1), tabRefs.length - 1);
                    scrolledToIndex = i;
                    tabRefs[i].current.scrollIntoView({ behavior: 'smooth' });
                  }
                  i -= 1;
                }

                setDisableLeftArrow(false);
                if (scrolledToIndex === tabRefs.length - 1) {
                  // wait for scroll animation to finish
                  const checkVisible = setInterval(() => {
                    if (isVisible(tabRefs[tabRefs.length - 1].current)) {
                      setDisableRightArrow(true);
                      clearInterval(checkVisible);
                    }
                  }, 100);
                  setTimeout(() => {
                    clearInterval(checkVisible);
                  }, 500);
                }
              }}
            />
          )}
        </Box>

        <StyledTabPanel
          flex={flex}
          aria-label={tabContentTitle}
          role="tabpanel"
        >
          {activeContent}
        </StyledTabPanel>
      </StyledTabs>
    );
  },
);

Tabs.displayName = 'Tabs';
Tabs.propTypes = TabsPropTypes;

export { Tabs };
