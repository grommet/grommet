import * as React from "react";

export interface TabProps {
  title?: string | React.ReactNode;
}

declare const Tab: React.ComponentType<TabProps>;

export { Tab };
