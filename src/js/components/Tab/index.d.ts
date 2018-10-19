import * as React from "react";

export interface TabProps {
  header?: React.ReactNode;
  title?: string | React.ReactNode;
}

declare const Tab: React.ComponentType<TabProps>;

export { Tab };
