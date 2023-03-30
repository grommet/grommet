import React, {
  forwardRef,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { Previous } from 'grommet-icons/icons/Previous';
import { Next } from 'grommet-icons/icons/Next';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { TabsContext } from './TabsContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { StyledTabPanel, StyledTabs, StyledTabsHeader } from './StyledTabs';
import { normalizeColor } from '../../utils';
import { MessageContext } from '../../contexts/MessageContext';
import { TabsPropTypes } from './propTypes';
import { useAnalytics } from '../../contexts/AnalyticsContext/AnalyticsContext';

const Tabs = forwardRef(
  (
    {
      alignControls,
      children,
      flex,
      justify = 'center',
      messages,
      responsive = true,
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
    const [focusIndex, setFocusIndex] = useState(-1);
    const headerRef = useRef();
    const size = useContext(ResponsiveContext);

    const sendAnalytics = useAnalytics();

    if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
      setActiveIndex(propsActiveIndex);
    }

    // Safari v15.5 has an issue with scrolling when overflow='hidden'
    // and scroll-behavior='smooth'. For now we are detecting if the browser
    // is safari to workaround this issue. The issue should be resolved soon
    // and we can remove this. https://github.com/WebKit/WebKit/pull/1387
    const isSafari =
      typeof window !== 'undefined'
        ? /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
        : true;

    /* eslint-disable no-param-reassign */
    delete rest.activeIndex;
    delete rest.onActive;
    /* eslint-enable no-param-reassign */

    const tabRefs = useMemo(
      () => React.Children.map(children, () => React.createRef()),
      [children],
    );

    // check if tab is in view
    const isVisible = useCallback(
      (index) => {
        if (tabRefs[index].current) {
          const tabRect = tabRefs[index].current.getBoundingClientRect();
          const headerRect = headerRef.current?.getBoundingClientRect();
          if (tabRect && headerRect) {
            // the -1 and +1 allow a little leniency when calculating if a tab
            // is in view. Without the -1 and +1 a tab could be fully in view
            // but isVisible will return false.
            return (
              tabRect.left >= headerRect.left - 1 &&
              tabRect.right <= headerRect.right + 1
            );
          }
        }
        return undefined;
      },
      [headerRef, tabRefs],
    );

    const updateArrowState = useCallback(() => {
      setDisableLeftArrow(isVisible(0));
      setDisableRightArrow(isVisible(tabRefs.length - 1));
    }, [tabRefs, isVisible]);

    const scrollTo = useCallback(
      (index, keyboard) => {
        const tabRect = tabRefs[index].current.getBoundingClientRect();
        const headerRect = headerRef.current.getBoundingClientRect();
        let amountHidden = 0;
        if (
          tabRect.left >= headerRect.left &&
          tabRect.left <= headerRect.right
        ) {
          amountHidden = tabRect.width - (headerRect.right - tabRect.left);
        } else if (
          tabRect.right >= headerRect.left &&
          tabRect.right <= headerRect.right
        ) {
          amountHidden = tabRect.width - (tabRect.right - headerRect.left);
          amountHidden = 0 - amountHidden;
        } else if (tabRect.left >= headerRect.right) {
          amountHidden = tabRect.right - headerRect.right;
        } else if (tabRect.right <= headerRect.left) {
          amountHidden = headerRect.left - tabRect.left;
          amountHidden = 0 - amountHidden;
        }
        // We are adding or subtracting 2 from amountHidden to
        // ensure the focusIndicator is visible when navigating
        // by keyboard
        if (keyboard) {
          if (amountHidden < 0) amountHidden -= 2;
          if (amountHidden > 0) amountHidden += 2;
        }
        if (isSafari) {
          headerRef.current.scrollBy({
            left: amountHidden,
          });
        } else {
          headerRef.current.scrollBy({
            left: amountHidden,
            behavior: 'smooth',
          });
        }

        // wait for scroll animation to finish
        // checks every 50 milliseconds for 1000 milliseconds
        // if the scroll animation has finished. Most scroll
        // animations will finish in 1000 milliseconds unless
        // the tab name is very long.
        if (isSafari) {
          updateArrowState();
        } else {
          const checkVisible = setInterval(() => {
            if (tabRefs[index].current && isVisible(index)) {
              updateArrowState();
              clearInterval(checkVisible);
            }
          }, 50);
          setTimeout(() => {
            updateArrowState();
            clearInterval(checkVisible);
          }, 1000);
        }
      },
      [tabRefs, headerRef, isVisible, updateArrowState, isSafari],
    );

    const moveByArrowKey = (direction) => {
      const previous = direction === 'previous';
      let index = direction === 'previous' ? 0 : tabRefs.length - 1;
      let scrolledToIndex;
      const moveBy = theme.tabs.step[size] - 1 || 0;

      while (
        scrolledToIndex === undefined &&
        ((previous && index < tabRefs.length - 1) || (!previous && index > 0))
      ) {
        if (
          !isVisible(index) &&
          ((previous && isVisible(index + 1)) ||
            (!previous && isVisible(index - 1)))
        ) {
          if (previous) {
            if (index - moveBy >= 0) {
              scrollTo(index - moveBy, false);
              scrolledToIndex = index - moveBy;
            } else {
              scrollTo(0, false);
              scrolledToIndex = 0;
            }
          } else if (index + moveBy < tabRefs.length) {
            scrollTo(index + moveBy, false);
            scrolledToIndex = index + moveBy;
          } else {
            scrollTo(tabRefs.length - 1, false);
            scrolledToIndex = tabRefs.length - 1;
          }
        }
        index = previous ? index + 1 : index - 1;
      }
    };

    useEffect(() => {
      // if the active tab isn't visible scroll to it
      if (
        overflow &&
        tabRefs &&
        tabRefs[activeIndex].current &&
        !isVisible(activeIndex)
      )
        scrollTo(activeIndex, true);
    }, [overflow, activeIndex, tabRefs, isVisible, scrollTo]);

    useEffect(() => {
      // scroll focus item into view if it is not already visible
      if (overflow && focusIndex !== -1 && !isVisible(focusIndex))
        scrollTo(focusIndex, true);
      else if (overflow && focusIndex !== -1) {
        // If the browser scrolled the focused item into view and
        // the focusedTab is on the edge of the header container
        // scroll slightly further to show the focusIndicator
        const tabRect = tabRefs[focusIndex].current.getBoundingClientRect();
        const headerRect = headerRef.current.getBoundingClientRect();
        let amountHidden = 0;
        if (
          tabRect.left >= headerRect.left &&
          tabRect.right <= headerRect.right &&
          tabRect.right + 2 >= headerRect.right
        )
          amountHidden = 2;
        else if (
          tabRect.right <= headerRect.right &&
          tabRect.left >= headerRect.left &&
          tabRect.left - 2 <= headerRect.left
        )
          amountHidden = -2;
        headerRef.current.scrollBy({
          left: amountHidden,
        });
      }
    }, [overflow, tabRefs, focusIndex, isVisible, scrollTo]);

    useLayoutEffect(() => {
      const onResize = () => {
        // check if tabs are overflowing
        if (headerRef.current.scrollWidth > headerRef.current.offsetWidth) {
          setOverflow(true);
        } else setOverflow(false);
        updateArrowState();
      };
      onResize();
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
          sendAnalytics({
            type: 'activateTab',
            element: tabRefs[nextIndex].current,
          });
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
          index,
          ref: tabRefs[index],
          onActivate: () => activateTab(index),
          setActiveContent,
          setActiveTitle,
          setFocusIndex,
        };
      },
      [activeIndex, onActive, propsActiveIndex, sendAnalytics, tabRefs],
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
        flex={flex}
        responsive={responsive}
        {...rest}
        background={theme.tabs.background}
      >
        <Box
          alignSelf={alignControls || theme.tabs.header?.alignSelf}
          role="tablist"
          flex={false}
          direction={overflow ? 'row' : 'column'}
          {...tabsHeaderStyles}
        >
          {overflow && (
            <Button
              a11yTitle="Previous Tab"
              disabled={disableLeftArrow}
              // removed from tabIndex, button is redundant for keyboard users
              tabIndex={-1}
              onClick={() => moveByArrowKey('previous')}
            >
              <Box pad={{ vertical: 'xsmall', horizontal: 'small' }}>
                <Previous
                  color={
                    disableLeftArrow
                      ? theme.button.disabled.color
                      : theme.global.colors.text
                  }
                />
              </Box>
            </Button>
          )}
          <StyledTabsHeader
            ref={headerRef}
            as={Box}
            direction="row"
            justify={overflow ? 'start' : justify}
            flex={!!overflow}
            wrap={false}
            overflow={overflow ? 'hidden' : 'visible'}
            background={theme.tabs.header.background}
            gap={theme.tabs.gap}
            pad={overflow ? '2px' : undefined}
            margin={overflow ? '-2px' : undefined}
          >
            {tabs}
          </StyledTabsHeader>
          {overflow && (
            <Button
              a11yTitle="Next Tab"
              disabled={disableRightArrow}
              // removed from tabIndex, button is redundant for keyboard users
              tabIndex={-1}
              onClick={() => moveByArrowKey('next')}
            >
              <Box pad={{ vertical: 'xsmall', horizontal: 'small' }}>
                <Next
                  color={
                    disableRightArrow
                      ? theme.button.disabled.color
                      : theme.global.colors.text
                  }
                />
              </Box>
            </Button>
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
