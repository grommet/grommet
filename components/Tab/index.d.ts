import * as React from "react";

export interface TabProps {
  plain?: boolean;
  title?: string | React.ReactNode;
}

declare const Tab: React.ComponentType<TabProps>;

export { Tab };
