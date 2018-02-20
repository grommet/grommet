import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import FocusedContainer from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { withTheme } from '../hocs';

import StyledLayer, { StyledContainer } from './StyledLayer';

class LayerContainer extends Component {
  componentDidMount() {
    const { position } = this.props;
    if (position !== 'hidden') {
      this.makeLayerVisible();
    }
  }

  componentWillReceiveProps({ position }) {
    if (this.props.position !== position && position !== 'hidden') {
      this.makeLayerVisible();
    }
  }

  makeLayerVisible = () => {
    const layerNode = findDOMNode(this.layerNodeRef);
    if (layerNode.scrollIntoView) {
      layerNode.scrollIntoView();
    }
  }

  render() {
    const {
      children,
      id,
      onClickOutside,
      onEsc,
      plain,
      position,
      theme,
      ...rest
    } = this.props;

    return (
      <FocusedContainer hidden={position === 'hidden'} restrictScroll={true}>
        <Keyboard onEsc={onEsc}>
          <StyledLayer
            id={id}
            onClick={onClickOutside}
            plain={plain}
            position={position}
            theme={theme}
            tabIndex='-1'
            ref={(ref) => { this.layerNodeRef = ref; }}
          >
            <StyledContainer {...rest} theme={theme} position={position} plain={plain}>
              {children}
            </StyledContainer>
          </StyledLayer>
        </Keyboard>
      </FocusedContainer>
    );
  }
}

export default withTheme(LayerContainer);
