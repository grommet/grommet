import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import DropContainer from './DropContainer';

import doc from './doc';

import { getNewContainer } from '../utils';

class Drop extends Component {
  static defaultProps = {
    align: {
      top: 'top',
      left: 'left',
    },
  }

  dropContainer = getNewContainer();

  componentWillUnmount() {
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

export default Drop;
