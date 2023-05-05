import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { OptionsContext } from '../../contexts/OptionsContext';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';
import { useAnalytics } from '../../contexts/AnalyticsContext';

import {
  backgroundIsDark,
  findVisibleParent,
  PortalContext,
} from '../../utils';

import { StyledLayer, StyledContainer, StyledOverlay } from './StyledLayer';

const HiddenAnchor = styled.a`
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
`;

const LayerContainer = forwardRef(
  (
    {
      background,
      children,
      full = false,
      id,
      margin = 'none',
      modal = true,
      onClickOutside,
      onEsc,
      plain,
      position = 'center',
      responsive = true,
      target: layerTarget,
      ...rest
    },
    ref,
  ) => {
    const containerTarget = useContext(ContainerTargetContext);
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const size = useContext(ResponsiveContext);
    // layerOptions was created to preserve backwards compatibility but
    // should not be supported in v3
    const { layer: layerOptions } = useContext(OptionsContext);
    const anchorRef = useRef();
    const containerRef = useRef();
    const layerRef = useRef();
    const portalContext = useContext(PortalContext);
    const portalId = useMemo(() => portalContext.length, [portalContext]);
    const nextPortalContext = useMemo(
      () => [...portalContext, portalId],
      [portalContext, portalId],
    );

    const sendAnalytics = useAnalytics();

    useEffect(() => {
      const start = new Date();
      const element = layerRef.current;
      const isHidden = position === 'hidden';
      if (!isHidden) {
        sendAnalytics({
          type: 'layerOpen',
          element,
        });
      }
      return () => {
        if (!isHidden) {
          sendAnalytics({
            type: 'layerClose',
            element,
            elapsed: new Date().getTime() - start.getTime(),
          });
        }
      };
    }, [sendAnalytics, layerRef, position]);

    useEffect(() => {
      if (position !== 'hidden') {
        const node = layerRef.current || containerRef.current || ref.current;
        if (node && node.scrollIntoView) node.scrollIntoView();
        // Once layer is open we make sure it has focus so that you
        // can start tabbing inside the layer. If the caller put focus
        // on an element already, we honor that. Otherwise, we put
        // the focus in the hidden anchor.
        let element = document.activeElement;
        while (element) {
          if (element === containerRef.current) {
            // already have focus inside the container
            break;
          }
          element = element.parentElement;
        }
        if (modal && !element && anchorRef.current) {
          anchorRef.current.focus();
        }
      }
    }, [modal, position, ref]);

    useEffect(() => {
      if (position !== 'hidden') {
        const node = layerRef.current || containerRef.current || ref.current;
        if (node && node.scrollIntoView) node.scrollIntoView();
      }
    }, [position, ref]);

    useEffect(() => {
      const onClickDocument = (event) => {
        // determine which portal id the target is in, if any
        let clickedPortalId = null;
        let node = (event.composed && event.composedPath()[0]) || event.target;

        while (
          clickedPortalId === null &&
          node &&
          node !== document &&
          !(node instanceof ShadowRoot)
        ) {
          // check if user click occurred within the layer
          const attr = node.getAttribute('data-g-portal-id');
          if (attr !== null && attr !== '')
            clickedPortalId = parseInt(attr, 10);
          // loop upward through parents to see if clicked element is a child
          // of the Layer. if so, click was inside Layer
          else node = node.parentNode;
        }
        if (
          (clickedPortalId === null ||
            portalContext.indexOf(clickedPortalId) !== -1) &&
          node !== null
        ) {
          // if the click occurred outside of the Layer portal, call
          // the user's onClickOutside function
          onClickOutside(event);
        }
      };

      // if user provides an onClickOutside function, listen for mousedown event
      if (onClickOutside) {
        document.addEventListener('mousedown', onClickDocument);
      }

      if (layerTarget) {
        const updateBounds = () => {
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          const target = findVisibleParent(layerTarget);

          // affects StyledLayer
          const layer = layerRef.current;

          if (layer && target) {
            // clear prior styling
            layer.style.left = '';
            layer.style.top = '';
            layer.style.bottom = '';
            layer.style.width = '';

            // get bounds
            const targetRect = target.getBoundingClientRect();
            const layerRect = layer.getBoundingClientRect();

            // ensure that layer moves with the target
            layer.style.left = `${targetRect.left}px`;
            layer.style.right = `${windowWidth - targetRect.right}px`;
            layer.style.top = `${targetRect.top}px`;
            layer.style.bottom = `${windowHeight - targetRect.bottom}px`;
            layer.style.maxHeight = targetRect.height;
            layer.style.maxWidth = Math.min(layerRect.width, windowWidth);
          }
        };

        updateBounds();
        window.addEventListener('resize', updateBounds);
        window.addEventListener('scroll', updateBounds, true);

        return () => {
          window.removeEventListener('resize', updateBounds);
          window.removeEventListener('scroll', updateBounds, true);
          if (onClickOutside) {
            document.removeEventListener('mousedown', onClickDocument);
          }
        };
      }
      return () => {
        if (onClickOutside) {
          document.removeEventListener('mousedown', onClickDocument);
        }
      };
    }, [containerTarget, layerTarget, onClickOutside, portalContext, portalId]);

    let content = (
      <StyledContainer
        ref={ref || containerRef}
        background={background}
        elevation={theme.layer.container.elevation}
        // layerOptions was created to preserve backwards compatibility but
        // should not be supported in v3. In v3, this should always be
        // ${id}__container
        id={layerOptions && layerOptions.singleId ? `${id}__container` : id}
        full={full}
        margin={margin}
        modal={modal}
        {...rest}
        position={position}
        plain={plain}
        responsive={responsive}
        layerTarget={layerTarget}
        dir={theme.dir}
        // portalId is used to determine if click occurred inside
        // or outside of the layer
        data-g-portal-id={portalId}
      >
        {/* eslint-disable max-len */}
        {/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
        <HiddenAnchor ref={anchorRef} tabIndex="-1" aria-hidden="true" />
        {/* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
        {/* eslint-enable max-len */}
        {children}
      </StyledContainer>
    );
    content = (
      <StyledLayer
        ref={layerRef}
        id={id}
        plain={plain}
        position={position}
        responsive={responsive}
        layerTarget={layerTarget}
        tabIndex="-1"
        dir={theme.dir}
      >
        {modal && (
          <StyledOverlay
            plain={plain}
            responsive={responsive}
            onMouseDown={onClickOutside}
          />
        )}
        {content}
      </StyledLayer>
    );

    if (onEsc) {
      content = (
        <Keyboard
          onEsc={
            onEsc
              ? (event) => {
                  // prevent further capturing or bubbling of event to other
                  // child or parent elements
                  event.stopPropagation();
                  onEsc(event);
                }
              : undefined
          }
          target={modal === false ? 'document' : undefined}
        >
          {content}
        </Keyboard>
      );
    }

    const themeContextValue = useMemo(() => {
      const dark = backgroundIsDark(theme.layer.background, theme);
      return { ...theme, dark };
    }, [theme]);

    if (theme.layer.background) {
      const { dark } = themeContextValue;
      if (dark !== undefined && dark !== theme.dark) {
        content = (
          <ThemeContext.Provider value={themeContextValue}>
            {content}
          </ThemeContext.Provider>
        );
      }
    }

    content = (
      <PortalContext.Provider value={nextPortalContext}>
        {content}
      </PortalContext.Provider>
    );

    const hitResponsiveBreakpoint =
      responsive && size === theme.layer.responsiveBreakpoint;
    // if layer is responsive and we've hit the breakpoint,
    // the layer will be filling the viewport, so we want to
    // restrict the scroll to the layer and not allow the
    // body to scroll
    if (modal || hitResponsiveBreakpoint) {
      content = (
        <FocusedContainer
          hidden={position === 'hidden'}
          // if layer has a target, do not restrict scroll.
          // restricting scroll could inhibit the user's
          // ability to scroll the page while the layer is open.
          restrictScroll={
            !layerTarget && hitResponsiveBreakpoint ? true : undefined
          }
          trapFocus
        >
          {content}
        </FocusedContainer>
      );
    }

    return content;
  },
);

export { LayerContainer };
