import * as React from "react";

import { ListProps } from "../List";

export interface BreadcrumbProps {
  data?: string[] | {}[];
  icon?: React.ReactNode;
  onValueSelect?: (...args: any[]) => void;
}

declare const Breadcrumb: React.ComponentClass<BreadcrumbProps & ListProps>;

export { Breadcrumb };
