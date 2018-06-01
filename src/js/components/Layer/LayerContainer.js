import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import FocusedContainer from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { withTheme } from '../hocs';

import StyledLayer, { StyledContainer, StyledOverlay } from './StyledLayer';

class LayerContainer extends Component {
  static defaultProps = {
    full: false,
    margin: 'none',
    modal: true,
    position: 'center',
  }

  containerRef = React.createRef()
  layerRef = React.createRef()

  componentDidMount() {
    const { position } = this.props;
    if (position !== 'hidden') {
      this.makeLayerVisible();
    }
  }

  componentDidUpdate(prevProps) {
    const { position } = this.props;
    if (prevProps.position !== position && position !== 'hidden') {
      this.makeLayerVisible();
    }
  }

  makeLayerVisible = () => {
    const node = findDOMNode(this.layerRef.current || this.containerRef.current);
    if (node && node.scrollIntoView) {
      node.scrollIntoView();
    }
  }

  render() {
    const {
      children,
      id,
      modal,
      onClickOutside,
      onEsc,
      plain,
      position,
      theme,
      ...rest
    } = this.props;

    let content = (
      <StyledContainer
        id={id}
        {...rest}
        theme={theme}
        position={position}
        plain={plain}
        ref={this.containerRef}
      >
        {children}
      </StyledContainer>
    );

    if (modal) {
      content = (
        <StyledLayer
          id={id}
          plain={plain}
          position={position}
          theme={theme}
          tabIndex='-1'
          ref={this.layerRef}
        >
          <StyledOverlay onClick={onClickOutside} theme={theme} />
          {content}
        </StyledLayer>
      );
    }

    if (onEsc) {
      content = (
        <Keyboard onEsc={onEsc}>
          {content}
        </Keyboard>
      );
    }

    if (modal) {
      content = (
        <FocusedContainer hidden={position === 'hidden'} restrictScroll={true}>
          {content}
        </FocusedContainer>
      );
    }

    return content;
  }
}

export default withTheme(LayerContainer);
