import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer } from '../../utils';

import { withTheme } from '../hocs';

import DropContainer from './DropContainer';
import doc from './doc';

class Drop extends Component {
  static defaultProps = {
    align: {
      top: 'top',
      left: 'left',
    },
  }

  originalFocusedElement = document.activeElement;
  dropContainer = getNewContainer();

  componentWillUnmount() {
    const { restrictFocus } = this.props;
    if (restrictFocus && this.originalFocusedElement) {
      if (this.originalFocusedElement.focus) {
        // wait for the fixed positioning to come back to normal
        // see layer styling for reference
        setTimeout(() => {
          this.originalFocusedElement.focus();
        }, 0);
      } else if (this.originalFocusedElement.parentNode &&
        this.originalFocusedElement.parentNode.focus) {
        // required for IE11 and Edge
        this.originalFocusedElement.parentNode.focus();
      }
    }
    document.body.removeChild(this.dropContainer);
  }

  render() {
    return createPortal(
      <DropContainer {...this.props} />,
      this.dropContainer
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Drop);
}

export default withTheme(Drop);
