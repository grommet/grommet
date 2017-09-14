import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import DropContainer from './DropContainer';

import doc from './doc';

import { createContextProvider } from '../hocs';
import { getNewContainer } from '../utils';

class Drop extends Component {
  static defaultProps = {
    align: {
      top: 'top',
      left: 'left',
    },
  }

  componentDidMount() {
    this.dropContainer = getNewContainer();
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
    const ContextProvider = createContextProvider(this.props.context);
    render(
      <ContextProvider>
        <DropContainer {...this.props} />
      </ContextProvider>,
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
