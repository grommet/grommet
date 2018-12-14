import * as React from "react";

export interface MarkdownProps {
  components?: { [key: string]: element };
}

declare const Markdown: React.ComponentType<MarkdownProps>;

export { Markdown };
