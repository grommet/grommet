import * as React from 'react';
import Grommet from '../index';

export interface MarkdownProps extends Grommet.Props {
  content?: string;
}

export class Markdown extends React.Component<MarkdownProps, undefined> { }

export default Markdown;
