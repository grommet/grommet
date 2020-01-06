import React, { Component } from 'react';
import { render } from 'react-dom';

import { mnet, Box, Heading, MnetUIBase, Paragraph } from 'mnet-ui-base';

class App extends Component {
  render() {
    return (
      <MnetUIBase theme={mnet}>
        <Box pad="small">
          <Heading level={3}>
            <strong>Hello World</strong>
          </Heading>
          <Paragraph>Hello from a MnetUIBase page!</Paragraph>
        </Box>
      </MnetUIBase>
    );
  }
}

render(<App />, document.getElementById('root'));
