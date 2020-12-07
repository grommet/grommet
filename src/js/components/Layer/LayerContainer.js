import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
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

const defaultPortalContext = [];
const fullBounds = { left: 0, right: 0, top: 0, bottom: 0 };

const LayerContainer = forwardRef(
  (
    {
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
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [targetBounds, setTargetBounds] = useState(fullBounds);
    const anchorRef = useRef();
    const containerRef = useRef();
    const layerRef = useRef();
    const portalContext = useContext(PortalContext) || defaultPortalContext;
    const portalId = useMemo(() => portalContext.length, [portalContext]);
    const nextPortalContext = useMemo(() => [...portalContext, portalId], [
      portalContext,
      portalId,
    ]);

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
      const onClickDocument = event => {
        // determine which portal id the target is in, if any
        let clickedPortalId = null;
        let node = event.target;
        while (clickedPortalId === null && node !== document && node !== null) {
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
          const rect = findVisibleParent(layerTarget).getBoundingClientRect();
          setTargetBounds({
            left: rect.left,
            right: window.innerWidth - rect.right,
            top: rect.top,
            bottom: window.innerHeight - rect.bottom,
          });
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
      setTargetBounds(fullBounds);
      return () => {
        if (onClickOutside) {
          document.removeEventListener('mousedown', onClickDocument);
        }
      };
    }, [layerTarget, onClickOutside, portalContext, portalId]);

    let content = (
      <StyledContainer
        ref={ref || containerRef}
        id={id}
        full={full}
        margin={margin}
        modal={modal}
        targetBounds={!modal ? targetBounds : fullBounds}
        {...rest}
        position={position}
        plain={plain}
        responsive={responsive}
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
    if (modal) {
      content = (
        <StyledLayer
          ref={layerRef}
          id={id}
          targetBounds={targetBounds}
          plain={plain}
          position={position}
          responsive={responsive}
          tabIndex="-1"
          dir={theme.dir}
        >
          <StyledOverlay
            plain={plain}
            responsive={responsive}
            onMouseDown={onClickOutside}
          />
          {content}
        </StyledLayer>
      );
    }

    if (onEsc) {
      content = <Keyboard onEsc={onEsc}>{content}</Keyboard>;
    }

    if (theme.layer.background) {
      const dark = backgroundIsDark(theme.layer.background, theme);
      if (dark !== undefined && dark !== theme.dark) {
        content = (
          <ThemeContext.Provider value={{ ...theme, dark }}>
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

    if (modal) {
      content = (
        <FocusedContainer
          hidden={position === 'hidden'}
          // if layer has a target, do not restrict scroll.
          // restricting scroll could inhibit the user's
          // ability to scroll the page while the layer is open.
          restrictScroll={!layerTarget ? true : undefined}
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
