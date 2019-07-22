import * as React from "react";

export interface TabProps {
  plain?: boolean;
  title?: string | React.ReactNode | JSX.Element;
}

declare const Tab: React.ComponentClass<TabProps & JSX.IntrinsicElements['button']>;

export { Tab };
