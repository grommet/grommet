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
    const [disableLeftArrow, setDisableLeftArrow] = useState(false);
    const [disableRightArrow, setDisableRightArrow] = useState(false);
    const [overflow, setOverflow] = useState();
    const [headerWidth, setHeaderWidth] = useState();
    const [previousTabs, setPreviousTabs] = useState([]);
    const [halfStartTab, setHalfStartTab] = useState();
    const [showingTabs, setShowingTabs] = useState([]);
    const [halfEndTab, setHalfEndTab] = useState();
    const [nextTabs, setNextTabs] = useState([]);
    const [focusIndex, setFocusIndex] = useState(-1);
    const headerRef = useRef();

    if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
      setActiveIndex(propsActiveIndex);
    }

    /* eslint-disable no-param-reassign */
    delete rest.activeIndex;
    delete rest.onActive;
    /* eslint-enable no-param-reassign */

    const tabRefs = React.Children.map(children, () => React.createRef());

    const shiftTab = (direction, stepNumber) => {
      let shiftBy = stepNumber;
      const previous = [...previousTabs];
      let halfStart = halfStartTab;
      const showing = [...showingTabs];
      let halfEnd = halfEndTab;
      const next = [...nextTabs];

      const calculateTabsFit = () => {
        showing.forEach((i) => {
          if (tabRefs[i]?.current) {
            tabRefs[i].current.style.display = 'inline';
            document.getElementById(`container${i}`).style.overflow = 'visible';
          }
        });
        let width = 0;
        let i = direction === 'previous' ? 0 : showing.length - 1;
        while (width < headerWidth && i >= 0 && i < showing.length) {
          const tabRect = tabRefs[showing[i]]?.current.getBoundingClientRect();
          if (tabRect) {
            width += tabRect.width;
            if (width > headerWidth) {
              if (direction === 'previous') {
                halfEnd = showing[i];
                if (i !== showing.length - 1) {
                  for (let j = i; j > 0; j -= 1) {
                    next.unshift(showing.pop());
                  }
                }
                halfEnd = showing.pop();
                if (next.includes(halfEnd)) {
                  halfEnd = undefined;
                }
                i = showing.length;
              } else {
                halfStart = showing[i];
                if (i !== 0) {
                  for (let j = i; j > 0; j -= 1) {
                    previous.push(showing.shift());
                  }
                }
                halfStart = showing.shift();
                if (previous.includes(halfStart)) {
                  halfStart = undefined;
                }
                i = 0;
              }
            }
            i = direction === 'previous' ? i + 1 : i - 1;
          }
        }
      };

      while (shiftBy > 0) {
        for (let i = 0; i < tabRefs.length; i += 1) {
          if (tabRefs[i].current) {
            tabRefs[i].current.style.display = 'inline';
            document.getElementById(`container${i}`).style.overflow = 'visible';
          }
        }

        if (direction === 'previous') {
          if (halfStart !== undefined) {
            showing.unshift(halfStart);
            halfStart = undefined;
          } else if (halfEnd !== undefined) {
            next.unshift(halfEnd);
            halfEnd = undefined;
            showing.unshift(previous.pop());
          } else {
            showing.unshift(previous.pop());
          }
        }
        if (direction === 'next') {
          if (halfEnd !== undefined) {
            showing.push(halfEnd);
            halfEnd = undefined;
          } else if (halfStart !== undefined) {
            previous.push(halfStart);
            halfStart = undefined;
            showing.push(next.shift());
          } else {
            showing.push(next.shift());
          }
        }
        calculateTabsFit();
        shiftBy -= 1;
        if (
          (direction === 'previous' && previous.length === 0) ||
          (direction === 'next' && next.length === 0)
        )
          shiftBy = 0;
      }

      setPreviousTabs(previous);
      setHalfStartTab(halfStart);
      setShowingTabs(showing);
      setHalfEndTab(halfEnd);
      setNextTabs(next);
    };

    useLayoutEffect(() => {
      for (let i = 0; i < tabRefs.length; i += 1) {
        document.getElementById(`container${i}`).style.overflow = 'visible';
        if (tabRefs[i].current) tabRefs[i].current.style.display = 'inline';
      }
      headerRef.current.style.overflow = 'visible';

      const previous = [];
      let halfStart;
      const showing = [];
      let halfEnd;
      const next = [];

      const headerRect = headerRef.current?.getBoundingClientRect();

      if (headerRect && tabRefs) {
        let width = 0;
        for (let i = 0; i < tabRefs.length; i += 1) {
          if (tabRefs[i].current) {
            const tabRect = tabRefs[i].current?.getBoundingClientRect();
            width += tabRect.width;
            if (width <= headerWidth) {
              showing.push(i);
            } else if (tabRect) {
              if (tabRect.right <= headerRect.left) previous.push(i);
              else if (tabRect.left >= headerRect.right) next.push(i);
              else if (tabRect.left > headerRect.left) halfEnd = i;
              else if (tabRect.right < headerRect.right) halfStart = i;
            }
          }
        }

        setPreviousTabs(previous);
        setHalfStartTab(halfStart);
        setShowingTabs(showing);
        setHalfEndTab(halfEnd);
        setNextTabs(next);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerWidth]);

    useEffect(() => {
      if (showingTabs.length > 0 && !showingTabs.includes(activeIndex)) {
        if (activeIndex < showingTabs[0]) shiftTab('previous', 1);
        if (activeIndex > showingTabs[showingTabs.length - 1])
          shiftTab('next', 1);
      }
      setFocusIndex(activeIndex);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    useEffect(() => {
      if (focusIndex === halfEndTab) shiftTab('next', 1);
      if (focusIndex === halfStartTab) shiftTab('previous', 1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [focusIndex]);

    useLayoutEffect(() => {
      for (let i = 0; i < tabRefs.length; i += 1) {
        if (tabRefs[i].current) {
          tabRefs[i].current.style.display = 'inline';
          tabRefs[i].current.style.float = 'left';
          document.getElementById(`container${i}`).style.overflow = 'visible';
        }
      }
      previousTabs.forEach((i) => {
        if (tabRefs[i].current) tabRefs[i].current.style.display = 'none';
      });
      nextTabs.forEach((i) => {
        if (tabRefs[i].current) tabRefs[i].current.style.display = 'none';
      });
      showingTabs.forEach((i) => {
        if (tabRefs[i].current) tabRefs[i].current.style.display = 'inline';
      });

      if (halfEndTab !== undefined && tabRefs[halfEndTab].current) {
        tabRefs[halfEndTab].current.style.display = 'inline';
        document.getElementById(`container${halfEndTab}`).style.overflow =
          'hidden';
      }
      if (halfStartTab !== undefined && tabRefs[halfStartTab].current) {
        document.getElementById(`container${halfStartTab}`).style.overflow =
          'hidden';
        tabRefs[halfStartTab].current.style.float = 'right';
        tabRefs[halfStartTab].current.style.display = 'inline';
      }
      setDisableLeftArrow(
        previousTabs.length === 0 && halfStartTab === undefined,
      );
      setDisableRightArrow(nextTabs.length === 0 && halfEndTab === undefined);
    }, [
      previousTabs,
      showingTabs,
      nextTabs,
      halfStartTab,
      halfEndTab,
      tabRefs,
    ]);

    useLayoutEffect(() => {
      const onResize = () => {
        // check if tabs are overflowing
        if (
          headerRef.current.scrollWidth > headerRef.current.offsetWidth ||
          previousTabs.length > 0 ||
          nextTabs.length > 0 ||
          halfStartTab !== undefined ||
          halfEndTab !== undefined
        ) {
          setOverflow(true);
        } else setOverflow(false);

        const headerRect = headerRef.current?.getBoundingClientRect();
        setHeaderWidth(headerRect.width);
      };
      onResize();

      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, [headerRef, previousTabs, nextTabs, halfEndTab, halfStartTab]);

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
          index,
          ref: tabRefs[index],
          onActivate: () => activateTab(index),
          setActiveContent,
          setActiveTitle,
          setFocusIndex,
        };
      },
      [activeIndex, onActive, propsActiveIndex, tabRefs],
    );

    const tabs = React.Children.map(children, (child, index) => (
      <div id={`container${index}`}>
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
      </div>
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
        <Box direction="row" {...tabsHeaderStyles}>
          {overflow && (
            <Button
              a11yTitle="Previous Tab"
              icon={<Previous />}
              disabled={disableLeftArrow}
              onClick={() => {
                if (step > 1) shiftTab('previous', step);
                else shiftTab('previous', 1);
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
            background={theme.tabs.header.background}
            gap={theme.tabs.gap}
            overflow="visible"
          >
            {tabs}
          </StyledTabsHeader>
          {overflow && (
            <Button
              a11yTitle="Next Tab"
              icon={<Next />}
              disabled={disableRightArrow}
              onClick={() => {
                if (step > 1) shiftTab('next', step);
                else shiftTab('next', 1);
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
