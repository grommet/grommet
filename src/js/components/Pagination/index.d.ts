import * as React from "react";
import {
  PolymorphicType
} from "../../utils";

export interface PaginationProps {
  leftIcon?: PolymorphicType;
  rightIcon?: PolymorphicType;
  pages?: number;
  currentPage?: number;
  onClick?: (value) => void;
}

declare const Pagination: React.FC<PaginationProps>;

export { Pagination };
