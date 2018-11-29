import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { compose } from 'recompose';

import { getNewContainer, setFocusWithoutScroll } from '../../utils';
import { withTheme } from '../hocs';

import { DropContainer } from './DropContainer';

class Drop extends Component {
  static defaultProps = {
    align: {
      top: 'top',
      left: 'left',
    },
    plain: false,
  };

  originalFocusedElement = document.activeElement;

  dropContainer = getNewContainer();

  componentWillUnmount() {
    const { restrictFocus } = this.props;
    if (restrictFocus && this.originalFocusedElement) {
      if (this.originalFocusedElement.focus) {
        setFocusWithoutScroll(this.originalFocusedElement);
      } else if (
        this.originalFocusedElement.parentNode &&
        this.originalFocusedElement.parentNode.focus
      ) {
        // required for IE11 and Edge
        setFocusWithoutScroll(this.originalFocusedElement.parentNode);
      }
    }
    document.body.removeChild(this.dropContainer);
  }

  render() {
    const {
      target: dropTarget, // avoid DOM leakage
      ...rest
    } = this.props;
    return createPortal(
      <DropContainer dropTarget={dropTarget} {...rest} />,
      this.dropContainer,
    );
  }
}

let DropDoc;
if (process.env.NODE_ENV !== 'production') {
  DropDoc = require('./doc').doc(Drop); // eslint-disable-line global-require
}
const DropWrapper = compose(withTheme)(DropDoc || Drop);

export { DropWrapper as Drop };
