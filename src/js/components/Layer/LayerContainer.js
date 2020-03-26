import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { backgroundIsDark, findVisibleParent } from '../../utils';

import { StyledLayer, StyledContainer, StyledOverlay } from './StyledLayer';

const HiddenAnchor = styled.a`
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
`;

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
        return () => window.removeEventListener('resize', updateBounds);
      }
      setTargetBounds(fullBounds);
      return undefined;
    }, [layerTarget]);

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
            onMouseDown={onClickOutside}
            responsive={responsive}
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

    if (modal) {
      content = (
        <FocusedContainer hidden={position === 'hidden'} restrictScroll>
          {content}
        </FocusedContainer>
      );
    }

    return content;
  },
);

export { LayerContainer };
