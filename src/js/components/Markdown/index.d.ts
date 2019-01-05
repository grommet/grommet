import * as React from "react";

export interface MarkdownProps {
  components?: { [key: string]: {component?: JSX.Element,props?: {}} };
}

declare const Markdown: React.ComponentType<MarkdownProps & JSX.IntrinsicElements['div']>;

export { Markdown };
