import * as React from 'react';
export interface MarkdownProps {
  components?: {};
  options?: {};
}

type divProps = JSX.IntrinsicElements['div'];

export interface MarkdownExtendedProps extends MarkdownProps, divProps {}

declare const Markdown: React.FC<MarkdownExtendedProps>;

export { Markdown };
