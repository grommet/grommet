import * as React from "react";

export interface TabProps {
  plain?: boolean;
  title?: string | React.ReactNode;
}

declare const Tab: React.ComponentType<TabProps & JSX.IntrinsicElements['button']>;

export { Tab };
