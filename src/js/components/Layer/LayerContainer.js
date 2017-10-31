import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { restrictFocusTo, withRestrictScroll } from '../hocs';
import { Keyboard } from '../Keyboard';

import StyledLayer, { StyledContainer } from './StyledLayer';

class LayerContainer extends Component {
  componentDidMount() {
    const layerNode = findDOMNode(this.layerNodeRef);
    layerNode.focus();
    if (layerNode.scrollIntoView) {
      layerNode.scrollIntoView();
    }
  }
  render() {
    const {
      children,
      onEsc,
      plain,
      theme,
      ...rest
    } = this.props;

    return (
      <Keyboard onEsc={onEsc}>
        <StyledLayer
          plain={plain}
          theme={theme}
          tabIndex='-1'
          ref={(ref) => { this.layerNodeRef = ref; }}
        >
          <StyledContainer {...rest} theme={theme} plain={plain}>
            {children}
          </StyledContainer>
        </StyledLayer>
      </Keyboard>
    );
  }
}

export default compose(
  withRestrictScroll,
  restrictFocusTo,
)(LayerContainer);
