import React, { forwardRef, Fragment } from 'react';
import Markdown from 'markdown-to-jsx';

import { deepMerge } from '../../utils';

import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Anchor } from '../Anchor';
import { Image } from '../Image';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableFooter } from '../TableFooter';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';
import { MarkdownPropTypes } from './propTypes';

const GrommetMarkdown = forwardRef(
  ({ children, components, options, theme, ...rest }, ref) => {
    const heading = [1, 2, 3, 4].reduce((obj, level) => {
      const result = { ...obj };
      result[`h${level}`] = {
        component: Heading,
        props: { level },
      };
      return result;
    }, {});

    const overrides = deepMerge(
      {
        a: { component: Anchor },
        img: { component: Image },
        p: { component: Paragraph },
        table: { component: Table },
        td: { component: TableCell, props: { plain: true } },
        tbody: { component: TableBody },
        tfoot: { component: TableFooter },
        th: { component: TableCell },
        thead: { component: TableHeader },
        tr: { component: TableRow },
      },
      heading,
      components,
      options && options.overrides,
    );

    // we use Fragment as the wrapper so we can assign the ref with the div
    // wrapper can still be overridden with the options.
    return (
      <div ref={ref} {...rest}>
        <Markdown
          {...{ children }}
          options={{ wrapper: Fragment, ...options, overrides }}
        />
      </div>
    );
  },
);

GrommetMarkdown.propTypes = MarkdownPropTypes;

export { GrommetMarkdown as Markdown };
