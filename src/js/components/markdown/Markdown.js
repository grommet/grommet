import React, { Component } from 'react';
import { compose } from 'recompose';
import Markdown from 'markdown-to-jsx';
import deepAssign from 'deep-assign';

import Heading from '../heading/Heading';
import Paragraph from '../paragraph/Paragraph';

import { withTheme } from '../hocs';

import doc from './doc';

class GrommetMarkdown extends Component {
  render() {
    const { content, components } = this.props;

    const heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      .reduce((obj, tag) => {
        const result = { ...obj };
        result[tag] = {
          component: Heading,
          props: { tag },
        };
        return result;
      }, {});

    const options = deepAssign({
      p: { component: Paragraph },
    }, heading, components);

    return (
      <Markdown options={{ overrides: options }}>
        {content}
      </Markdown>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(GrommetMarkdown);
}

export default compose(
  withTheme,
)(GrommetMarkdown);
