import * as React from 'react';

type divProps = JSX.IntrinsicElements['div'];
export interface MarkdownProps {
  components?: {};
}

export interface MarkdownExtendedProps extends MarkdownProps, divProps {}

declare const Markdown: React.ComponentClass<MarkdownExtendedProps>;

export { Markdown };
