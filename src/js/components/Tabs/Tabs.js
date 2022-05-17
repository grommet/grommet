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
    const targetRef = useRef();

    if (activeIndex !== propsActiveIndex && propsActiveIndex !== undefined) {
      setActiveIndex(propsActiveIndex);
    }

    /* eslint-disable no-param-reassign */
    delete rest.activeIndex;
    delete rest.onActive;
    /* eslint-enable no-param-reassign */

    const tabRefs = React.Children.map(children, () => React.createRef());

    const [containerSize, setContainerSize] = useState([0, 0]);
    const [overflow, setOverflow] = useState();

    useEffect(() => {
      if (targetRef.current) {
        const containerNode = targetRef.current;
        if (containerNode) {
          const { parentNode } = containerNode;
          if (parentNode) {
            const rect = parentNode.getBoundingClientRect();
            if (
              rect.width !== containerSize[0] ||
              rect.height !== containerSize[1]
            ) {
              setContainerSize([rect.width, rect.height]);
            }
          }
        }
      }
    }, [targetRef, containerSize]);

    useEffect(() => {
      // check if tabs are overflowing
      const onResize = () => {
        if (targetRef.current.scrollWidth > targetRef.current.offsetWidth) {
          setOverflow(true);
        } else setOverflow(false);
      };
      window.addEventListener('resize', onResize);
      onResize();
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }, [containerSize]);

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
          <Box direction="row">
            {overflow && (
              <Button
                icon={<Previous />}
                onClick={() => {
                  targetRef.current.scrollLeft -= 80;
                }}
              />
            )}
            <StyledTabsHeader
              ref={targetRef}
              as={Box}
              direction="row"
              justify={justify}
              alignSelf={alignControls}
              flex
              overflow="hidden"
              background={theme.tabs.header.background}
              gap={theme.tabs.gap}
              {...tabsHeaderStyles}
              // style={{ padding: '2px', margin: '-2px' }}
            >
              {tabs}
            </StyledTabsHeader>
            {overflow && (
              <Button
                icon={<Next />}
                onClick={() => {
                  targetRef.current.scrollLeft += 80;
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
