import * as React from "react";
import { BoxProps } from '../Box' 

export interface NavProps {
    items?: { label: string, href: string }[];
}

declare const Nav: React.FC<BoxProps & NavProps>;

export { Nav };
