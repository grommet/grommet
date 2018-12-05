import React, { createRef, Component } from 'react';
import styled from 'styled-components';

import { defaultProps } from '../../default-props';
import { ThemeContext } from '../../contexts';
import { backgroundIsDark } from '../../utils';

import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';

import { StyledLayer, StyledContainer, StyledOverlay } from './StyledLayer';

const HiddenAnchor = styled.a`
  width: 0;
  height: 0;
  overflow: hidden;
  position: absolute;
`;

class LayerContainer extends Component {
  static defaultProps = {
    full: false,
    margin: 'none',
    modal: true,
    position: 'center',
  };

  static contextType = ThemeContext;

  anchorRef = createRef();

  state = {};

  containerRef = React.createRef();

  layerRef = React.createRef();

  componentDidMount() {
    const { position } = this.props;
    if (position !== 'hidden') {
      this.makeLayerVisible();
      // once layer is open we set the focus in the hidden
      // anchor so that you can start tabbing inside the layer
      if (this.anchorRef.current) {
        this.anchorRef.current.focus();
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { position } = this.props;
    if (prevProps.position !== position && position !== 'hidden') {
      this.makeLayerVisible();
    }
  }

  makeLayerVisible = () => {
    const node = this.layerRef.current || this.containerRef.current;
    if (node && node.scrollIntoView) {
      node.scrollIntoView();
    }
  };

  render() {
    const {
      children,
      id,
      modal,
      onClickOutside,
      onEsc,
      plain,
      position,
      responsive,
      theme: defaultTheme,
      ...rest
    } = this.props;
    const theme = this.context || defaultTheme;

    let content = (
      <StyledContainer
        id={id}
        {...rest}
        position={position}
        plain={plain}
        responsive={responsive}
        ref={this.containerRef}
      >
        {/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
        <HiddenAnchor ref={this.anchorRef} tabIndex="-1" aria-hidden="true" />
        {/* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */}
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
          ref={this.layerRef}
        >
          <StyledOverlay
            plain={plain}
            onMouseDown={onClickOutside}
            responsive={responsive}
          />
          {content}
        </StyledLayer>
      );
      /* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */
    }

    if (onEsc) {
      content = <Keyboard onEsc={onEsc}>{content}</Keyboard>;
    }

    if (modal) {
      content = (
        <FocusedContainer hidden={position === 'hidden'} restrictScroll>
          {content}
        </FocusedContainer>
      );
    }

    const dark = backgroundIsDark(theme.layer.background, theme);
    if (dark !== theme.dark) {
      content = (
        <ThemeContext.Provider value={{ ...theme, dark }}>
          {content}
        </ThemeContext.Provider>
      );
    }

    return content;
  }
}

Object.setPrototypeOf(LayerContainer.defaultProps, defaultProps);

export { LayerContainer };
