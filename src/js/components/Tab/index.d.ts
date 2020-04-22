import * as React from "react";
import { Omit } from "../../utils";

export interface TabProps {
  disabled?: boolean;
  icon?: JSX.Element;
  plain?: boolean;
  reverse?: boolean;
  title?: React.ReactNode;
}

declare const Tab: React.ComponentClass<TabProps & Omit<JSX.IntrinsicElements['button'], 'title'>>;

export { Tab };
