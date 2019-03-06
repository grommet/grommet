import * as React from "react";

export interface TabProps {
  plain?: boolean;
  title?: string | React.ReactNode;
}

declare const Tab: React.ComponentClass<TabProps & JSX.IntrinsicElements['button']>;

export { Tab };
