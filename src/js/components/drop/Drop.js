import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import DropContainer from './DropContainer';

import doc from './doc';

function getDropContainer() {
  // setup DOM
  const container = document.createElement('div');
  // prepend in body to avoid browser scroll issues
  document.body.insertBefore(container, document.body.firstChild);
  return container;
}

class Drop extends Component {
  static defaultProps = {
    align: {
      top: 'top',
      left: 'left',
    },
  }

  componentDidMount() {
    this.dropContainer = getDropContainer();
    this.renderDrop();
  }

  componentDidUpdate() {
    this.renderDrop();
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.dropContainer);
    document.body.removeChild(this.dropContainer);
  }

  renderDrop() {
    render(
      <DropContainer {...this.props} />,
      this.dropContainer
    );
  }

  render() {
    return (<span style={{ display: 'none' }} />);
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Drop);
}

export default Drop;
