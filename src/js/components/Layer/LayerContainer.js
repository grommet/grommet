import React, { useRef, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { defaultProps } from '../../default-props';
import { ThemeContext } from '../../contexts';

import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { backgroundIsDark } from '../../utils';

import { StyledLayer, StyledContainer, StyledOverlay } from './StyledLayer';

const HiddenAnchor = styled.a`
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
`;

const LayerContainer = ({
  children,
  full = false,
  id,
  margin = 'none',
  modal = true,
  onClickOutside,
  onEsc,
  plain,
  position = 'center',
  responsive,
  theme: propsTheme,
  ...rest
}) => {
  const themeContext = useContext(ThemeContext);
  const [prevPosition, setPrevPosition] = useState();
  const anchorRef = useRef();
  const containerRef = useRef();
  const layerRef = useRef();

  const makeLayerVisible = () => {
    const node = layerRef.current || containerRef.current;
    if (node && node.scrollIntoView) {
      node.scrollIntoView();
    }
  };

  useEffect(() => {
    if (prevPosition !== position && position !== 'hidden') {
      makeLayerVisible();
      setPrevPosition(position);
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
      if (!element && anchorRef.current) {
        anchorRef.current.focus();
      }
    }
  }, [position]);

  const theme = themeContext || propsTheme;

  let content = (
    <StyledContainer
      id={id}
      {...rest}
      full={full}
      margin={margin}
      position={position}
      plain={plain}
      responsive={responsive}
      ref={containerRef}
    >
      <HiddenAnchor ref={anchorRef} tabIndex="-1" aria-hidden="true" />
      {children}
    </StyledContainer>
  );

  if (modal) {
    content = (
      <StyledLayer
        id={id}
        plain={plain}
        position={position}
        responsive={responsive}
        tabIndex="-1"
        ref={layerRef}
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
    if (dark !== theme.dark) {
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
};

LayerContainer.defaultProps = {};
Object.setPrototypeOf(LayerContainer.defaultProps, defaultProps);

Object.setPrototypeOf(LayerContainer.defaultProps, defaultProps);

export { LayerContainer };
