import React, {
  forwardRef,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Previous, Next } from 'grommet-icons';
import { ThemeContext } from 'styled-components';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
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
      scroll,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { format } = useContext(MessageContext);
    const { activeIndex: propsActiveIndex, onActive } = rest;
    const [activeIndex, setActiveIndex] = useState(rest.activeIndex || 0);
    const [focusIndex, setFocusIndex] = useState(activeIndex);
    const [activeContent, setActiveContent] = useState();
    const [activeTitle, setActiveTitle] = useState();
    const [disableLeftArrow, setDisableLeftArrow] = useState();
    const [disableRightArrow, setDisableRightArrow] = useState();
    const [overflow, setOverflow] = useState(undefined);
    const targetRef = useRef();

    if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
      setActiveIndex(propsActiveIndex);
    }

    /* eslint-disable no-param-reassign */
    delete rest.activeIndex;
    delete rest.onActive;
    /* eslint-enable no-param-reassign */

    const tabRefs = React.Children.map(children, () => React.createRef());

    // check if tab is in view
    function isVisible(element) {
      const tabRect = element?.getBoundingClientRect();
      const headerRect = targetRef.current?.getBoundingClientRect();
      return (
        tabRect.left >= headerRect.left - 1 &&
        tabRect.right <= headerRect.right + 1
      );
    }

    const updateArrowState = useCallback(() => {
      setDisableLeftArrow(isVisible(tabRefs[0].current));
      setDisableRightArrow(isVisible(tabRefs[tabRefs.length - 1].current));
    }, [tabRefs]);

    useLayoutEffect(() => {
      if (scroll && overflow) {
        if (!isVisible(tabRefs[activeIndex].current)) {
          // if the active tab isn't visible scroll to it
          tabRefs[activeIndex].current.scrollIntoView();
          updateArrowState();
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex, overflow, scroll]);

    useEffect(() => {
      // if the focus index is changing make sure the previous and next arrows
      // are in sync
      if (scroll && overflow && focusIndex) updateArrowState();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusIndex, overflow, scroll]);

    useLayoutEffect(() => {
      if (scroll) {
        const onResize = () => {
          // check if tabs are overflowing
          if (targetRef.current.scrollWidth > targetRef.current.offsetWidth) {
            setOverflow(true);
          } else setOverflow(false);
          updateArrowState();
        };

        if (
          overflow === undefined ||
          disableLeftArrow === undefined ||
          disableRightArrow === undefined
        ) {
          onResize();
        }
        window.addEventListener('resize', onResize);
        return () => {
          window.removeEventListener('resize', onResize);
        };
      }
      return () => {};
    }, [
      scroll,
      tabRefs,
      targetRef,
      disableLeftArrow,
      disableRightArrow,
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

    const onLeft = () => {
      if (focusIndex !== 0) {
        tabRefs[focusIndex - 1].current.focus();
        setFocusIndex(focusIndex - 1);
      }
    };

    const onRight = () => {
      if (focusIndex < tabRefs.length - 1) {
        tabRefs[focusIndex + 1].current.focus();
        setFocusIndex(focusIndex + 1);
      }
    };

    const onHome = () => {
      if (focusIndex !== 0 && tabRefs.length > 0) tabRefs[0].current.focus();
    };

    const onEnd = () => {
      if (focusIndex !== 0 && tabRefs.length > 0)
        tabRefs[tabRefs.length - 1].current.focus();
    };

    return (
      <Keyboard onLeft={onLeft} onRight={onRight} onHome={onHome} onEnd={onEnd}>
        <StyledTabs
          ref={ref}
          as={Box}
          role="tablist"
          flex={flex}
          responsive={responsive}
          {...rest}
          background={theme.tabs.background}
        >
          <Box direction={overflow && scroll ? 'row' : 'column'}>
            {overflow && scroll && (
              <Button
                a11yTitle="Previous Tab"
                icon={<Previous />}
                disabled={disableLeftArrow}
                onClick={() => {
                  let scrolledToIndex;
                  for (let i = 0; i < tabRefs.length - 1; i += 1) {
                    if (
                      !isVisible(tabRefs[i].current) &&
                      isVisible(tabRefs[i + 1].current)
                    ) {
                      if (scroll && scroll.interval) {
                        i =
                          i - (scroll.interval - 1) >= 0
                            ? i - (scroll.interval - 1)
                            : 0;
                      }
                      scrolledToIndex = i;
                      tabRefs[i].current.scrollIntoView({ behavior: 'smooth' });
                      break;
                    }
                  }

                  setDisableRightArrow(false);
                  if (scrolledToIndex === 0) {
                    // wait for scroll animation to finish
                    const timer = setTimeout(() => {
                      setDisableLeftArrow(isVisible(tabRefs[0].current));
                    }, 500);
                    return () => clearTimeout(timer);
                  }
                  return () => {};
                }}
              />
            )}
            <StyledTabsHeader
              ref={targetRef}
              as={Box}
              direction="row"
              justify={justify}
              alignSelf={alignControls}
              flex={!!scroll}
              wrap={!scroll}
              overflow={scroll ? 'hidden' : 'visible'}
              background={theme.tabs.header.background}
              gap={theme.tabs.gap}
              onBlur={() => setFocusIndex(activeIndex)}
              {...tabsHeaderStyles}
            >
              {tabs}
            </StyledTabsHeader>
            {overflow && scroll && (
              <Button
                a11yTitle="Next Tab"
                icon={<Next />}
                disabled={disableRightArrow}
                onClick={() => {
                  let scrolledToIndex = 0;
                  for (let i = tabRefs.length - 1; i > 0; i -= 1) {
                    if (
                      !isVisible(tabRefs[i].current) &&
                      isVisible(tabRefs[i - 1].current)
                    ) {
                      if (scroll && scroll.interval) {
                        i =
                          i + (scroll.interval - 1) < tabRefs.length
                            ? i + (scroll.interval - 1)
                            : tabRefs.length - 1;
                      }
                      scrolledToIndex = i;
                      tabRefs[i].current.scrollIntoView({ behavior: 'smooth' });
                      break;
                    }
                  }

                  setDisableLeftArrow(false);
                  if (scrolledToIndex === tabRefs.length - 1) {
                    // wait for scroll animation to finish
                    const timer = setTimeout(
                      () => {
                        setDisableRightArrow(
                          isVisible(tabRefs[tabRefs.length - 1].current),
                        );
                      },
                      500, // Empirically determined.
                    );
                    return () => clearTimeout(timer);
                  }
                  return () => {};
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
      </Keyboard>
    );
  },
);

Tabs.displayName = 'Tabs';
Tabs.propTypes = TabsPropTypes;

export { Tabs };
