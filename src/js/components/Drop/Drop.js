import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { getNewContainer, setFocusWithoutScroll } from '../../utils';

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

  constructor(props) {
    super(props);

    this.dropContainer = getNewContainer();

    // prevents mouse events from propagating upward to elements behind the drop.
    // this prevents a nested drop from closing its parent when the user clicks
    // inside it, since a 'nested' drop is technically an unrelated sibling in the
    // DOM due to React portals.
    this.dropContainer.addEventListener('mousedown', ev => {
      ev.stopPropagation();
    });
  }

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
const DropWrapper = DropDoc || Drop;

export { DropWrapper as Drop };
