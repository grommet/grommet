import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import PropTypes from 'prop-types';
import deepAssign from 'deep-assign';

import StyledLayer, { StyledContainer } from './StyledLayer';

import { Keyboard } from '../Keyboard';

import baseTheme from '../../themes/vanilla';

import { filterByFocusable, getBodyChildElements } from '../utils/DOM';

class LayerContainer extends Component {
  static childContextTypes = {
    theme: PropTypes.object,
  }
  static defaultProps = {
    theme: undefined,
  }

  getChildContext() {
    const { theme } = this.props;

    const globalTheme = JSON.parse(JSON.stringify(baseTheme));
    return {
      theme: deepAssign(globalTheme, theme),
    };
  }

  componentDidMount() {
    const layerNode = findDOMNode(this.layerRef);
    // go over all the body children to remove focus when layer is opened
    getBodyChildElements().forEach((node) => {
      if (!node.contains(layerNode)) {
        node.setAttribute('aria-hidden', true);
        // prevent children to receive focus
        filterByFocusable(node.getElementsByTagName('*')).forEach(
          (element) => {
            const originalTabIndex = element.getAttribute('tabindex');
            if (originalTabIndex) {
              element.setAttribute('data-tabindex', originalTabIndex);
            }
            element.setAttribute('tabindex', -1);
          }
        );
      }
    });
    document.body.style.overflow = 'hidden';
    if (layerNode.scrollIntoView) {
      layerNode.scrollIntoView();
    }
    layerNode.focus();
  }

  componentWillUnmount() {
    // go over all the body children to reset focus when layer is closed
    getBodyChildElements().forEach((node) => {
      if (!node.contains(findDOMNode(this.layerRef))) {
        node.setAttribute('aria-hidden', false);

        // reset node focus
        filterByFocusable(node.getElementsByTagName('*')).forEach(
          (element) => {
            const originalTabIndex = element.getAttribute('data-tabindex');
            if (originalTabIndex) {
              element.setAttribute('tabindex', originalTabIndex);
              element.removeAttribute('data-tabindex');
            } else {
              element.removeAttribute('tabindex', -1);
            }
          }
        );
      }
    });
    document.body.style.overflow = 'scroll';
  }

  render() {
    const {
      children,
      onEsc,
      theme,
      ...rest
    } = this.props;

    const globalTheme = JSON.parse(JSON.stringify(baseTheme));
    const localTheme = deepAssign(globalTheme, theme);

    return (
      <Keyboard onEsc={onEsc}>
        <StyledLayer
          tabIndex='-1'
          ref={(ref) => {
            this.layerRef = ref;
          }}
          theme={localTheme}
        >
          <StyledContainer
            {...rest}
            theme={localTheme}
            tabIndex='-1'
          >
            {children}
          </StyledContainer>
        </StyledLayer>
      </Keyboard>
    );
  }
}

export default LayerContainer;
