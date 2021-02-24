import * as React from 'react';
export interface MarkdownProps {
  components?: {};
}

type divProps = JSX.IntrinsicElements['div'];

export interface MarkdownExtendedProps extends MarkdownProps, divProps {}

declare const Markdown: React.ComponentClass<MarkdownExtendedProps>;

export { Markdown };
