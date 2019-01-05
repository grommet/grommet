import * as React from "react";

export interface MarkdownProps {
  components?: {};
}

declare const Markdown: React.ComponentType<MarkdownProps & JSX.IntrinsicElements['div']>;

export { Markdown };
