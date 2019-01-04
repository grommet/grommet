import * as React from "react";

export interface MarkdownProps {
  components?: { [key: string]: JSX.Element };
}

declare const Markdown: React.ComponentType<MarkdownProps>;

export { Markdown };
