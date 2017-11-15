import React, { Component } from 'react';
import { compose } from 'recompose';
import Markdown from 'markdown-to-jsx';

import { deepMerge } from '../../utils';

import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { withTheme } from '../hocs';

import doc from './doc';

class GrommetMarkdown extends Component {
  render() {
    const { content, components } = this.props;

    const heading = [1, 2, 3, 4]
      .reduce((obj, level) => {
        const result = { ...obj };
        result[`h${level}`] = {
          component: Heading,
          props: { level },
        };
        return result;
      }, {});

    const overrides = deepMerge({
      p: { component: Paragraph },
    }, heading, components);

    return (
      <Markdown options={{ overrides }}>
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
