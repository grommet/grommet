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

  dropContainer = getNewContainer()

  // getSnapshotBeforeUpdate() {
  //   if (!this.originalFocusedElement) {
  //     this.originalFocusedElement = document.activeElement;
  //   }
  //   return null;
  // }

  // componentWillUnmount() {
  //   const { restrictFocus } = this.props;
  //   if (restrictFocus && this.originalFocusedElement) {
  //     if (this.originalFocusedElement.focus) {
  //       this.originalFocusedElement.focus();
  //     } else if (this.originalFocusedElement.parentNode &&
  //       this.originalFocusedElement.parentNode.focus) {
  //       // required for IE11 and Edge
  //       this.originalFocusedElement.parentNode.focus();
  //     }
  //   }
  //   document.body.removeChild(this.dropContainer);
  // }

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
